import {
  Box,
  Heading,
  Stack,
  Text,
  VStack,
  chakra,
  Button,
  Flex,
  useToast,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import SeeMore from "../../components/book-page/SeeMore";
import TextWithSpan from "../../components/book-page/TextWithSpan";
import UserActions from "../../components/book-page/UserActions";
import ErrorMessage from "../../components/utils/ErrorMessage";
import LoadingAni from "../../components/utils/LoadingAni";
import Navbar from "../../components/utils/Navbar";
import codeToLang from "../../utils/helpers/codeToLang";
import toastOptions from "../../utils/helpers/toastOptions";
import transformCategories from "../../utils/helpers/transformCategories";
import transformDescription from "../../utils/helpers/transformDescription";
import { trpc } from "../../utils/trpc";

const BookPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const bookId = String(id);

  const {
    data: bookData,
    isLoading,
    isError,
    error,
  } = trpc.useQuery(["books.get-single-book", { bookId }]);

  const { mutate } = trpc.useMutation(["users.add-book-to-account"]);
  const toast = useToast();

  const {
    data: userBookData,
    isLoading: isLoadingBook,
    isError: isErrorBook,
    error: bookError,
  } = trpc.useQuery(["users.is-book-in-my-collection", { googleId: bookId }]);

  const { status: sessionStatus } = useSession();

  const utils = trpc.useContext();

  if (sessionStatus === "loading" || isLoading || isLoadingBook) {
    return (
      <VStack bgColor='gray.100' minH='100vh' justifyContent='center'>
        <LoadingAni />
      </VStack>
    );
  }

  if (sessionStatus === "unauthenticated") {
    return (
      <VStack bgColor='gray.100' minH='100vh' justifyContent='center'>
        <ErrorMessage customMessage='This page is available only for authenticated users' />
      </VStack>
    );
  }

  if (!bookData || isError) {
    const message =
      error?.message ||
      "There was a problem with loading the book data, try again later.";

    return (
      <VStack bgColor='gray.100' minH='100vh' justifyContent='center'>
        <ErrorMessage customMessage={message} />
      </VStack>
    );
  }

  if (userBookData === undefined || isErrorBook) {
    const message =
      bookError?.message ||
      "There was a problem with loading the book data, try again later.";

    return (
      <VStack bgColor='gray.100' minH='100vh' justifyContent='center'>
        <ErrorMessage customMessage={message} />
      </VStack>
    );
  }

  const imgSrc =
    bookData.volumeInfo.imageLinks?.large ||
    bookData.volumeInfo.imageLinks?.thumbnail ||
    "https://books.google.com/googlebooks/images/no_cover_thumb.gif";

  const handleAddToMyBooks = () => {
    mutate(
      {
        googleId: bookData.id,
        title: bookData.volumeInfo.title,
        authors: bookData.volumeInfo.authors,
        imgLink:
          bookData.volumeInfo.imageLinks?.thumbnail ||
          "https://books.google.com/googlebooks/images/no_cover_thumb.gif",
        pages: bookData.volumeInfo.pageCount,
      },
      {
        onSuccess: () => {
          const options = toastOptions(
            "Success",
            `${bookData.volumeInfo.title} has been successfully added to your books.`,
            "success"
          );
          toast(options);
          utils.invalidateQueries([
            "users.is-book-in-my-collection",
            { googleId: bookId },
          ]);
        },
        onError: (e) => {
          const options = toastOptions("Error", e.message, "error");
          toast(options);
        },
      }
    );
  };

  return (
    <VStack bgColor='gray.100' minH='100vh' pos='relative'>
      <Navbar />
      <Stack
        direction={{ base: "column", md: "column", lg: "row" }}
        w={{ base: "320px", md: "450px", lg: "700px", xl: "850px" }}
        py={{ base: 6, md: 8, lg: 12 }}
        spacing={{ base: 8, md: 8, lg: 10 }}
      >
        <Box
          pos='relative'
          width='256px'
          height='376px'
          mx='auto'
          shadow='xl'
          mt={5}
        >
          <Image src={imgSrc} layout='fill' alt='Book Image' />
        </Box>
        <VStack
          maxW={{ base: "320px", md: "450px", lg: "430px", xl: "478px" }}
          spacing={2}
        >
          <Heading fontSize='3xl' color='blue.500' w='full'>
            {bookData.volumeInfo.title}
          </Heading>
          {bookData.volumeInfo.authors && (
            <Text fontSize='lg' color='gray.700' w='full' fontWeight='semibold'>
              {bookData.volumeInfo.authors.map((author, index) => {
                return (
                  <chakra.span key={index}>
                    {author}
                    {index !== bookData.volumeInfo.authors.length - 1
                      ? ", "
                      : ""}
                  </chakra.span>
                );
              })}
            </Text>
          )}
          {bookData.volumeInfo.categories && (
            <Box fontSize='sm'>
              {transformCategories(bookData.volumeInfo.categories).map(
                (category, index) => {
                  return (
                    <Text
                      color='white'
                      bgColor='blue.500'
                      key={index}
                      py={2}
                      px={3}
                      mb={3}
                      mr={3}
                      display='inline-block'
                      rounded='lg'
                    >
                      {category}
                    </Text>
                  );
                }
              )}
            </Box>
          )}
          <TextWithSpan
            title='Publisher'
            value={bookData.volumeInfo.publisher}
          />
          <TextWithSpan
            title='Publish Date'
            value={bookData.volumeInfo.publishedDate}
          />
          <TextWithSpan title='Pages' value={bookData.volumeInfo.pageCount} />
          <TextWithSpan
            title='Language'
            value={codeToLang(bookData.volumeInfo.language)}
          />
          {bookData.volumeInfo.description && (
            <SeeMore
              maxLength={200}
              fontSize='md'
              color='blue.700'
              text={transformDescription(bookData.volumeInfo.description)}
            />
          )}
        </VStack>
      </Stack>
      {!userBookData ? (
        <Flex
          justifyContent='center'
          alignItems='center'
          w='full'
          mx='auto'
          pb={10}
        >
          <Button colorScheme='blue' onClick={handleAddToMyBooks}>
            ADD TO MY BOOKS
          </Button>
        </Flex>
      ) : (
        <UserActions bookData={userBookData.book} />
      )}
    </VStack>
  );
};

export default BookPage;
