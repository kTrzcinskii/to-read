import { Heading, VStack, chakra, Stack } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import BooksColumn from "../components/my-books/BooksColumn";
import ErrorMessage from "../components/utils/ErrorMessage";
import LoadingAni from "../components/utils/LoadingAni";
import Navbar from "../components/utils/Navbar";
import { trpc } from "../utils/trpc";

const MyBooksPage: NextPage = () => {
  const {
    data: allBooks,
    isLoading,
    isError,
    error,
  } = trpc.useQuery(["users.get-my-books"]);

  const { status: sessionStatus } = useSession();

  if (sessionStatus === "loading" || isLoading) {
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

  if (!allBooks || isError) {
    const message =
      error?.message ||
      "There was a problem with loading the book data, try again later.";

    return (
      <VStack bgColor='gray.100' minH='100vh' justifyContent='center'>
        <ErrorMessage customMessage={message} />
      </VStack>
    );
  }

  return (
    <VStack bgColor='gray.100' minH='100vh'>
      <Navbar />
      <Heading
        w={{ base: "340px", md: "400px", lg: "full" }}
        textAlign='center'
        fontSize={{ base: "3xl", md: "5xl" }}
        pt={{ base: 5, md: 6, lg: 8 }}
        color='gray.700'
      >
        Browse <chakra.span color='blue.500'>your</chakra.span> books
      </Heading>
      <Stack
        w='full'
        justifyContent='space-evenly'
        alignItems={{ base: "center", md: "center", lg: "flex-start" }}
        direction={{ base: "column", md: "column", lg: "row" }}
        py={{ base: 7, md: 10, lg: 12 }}
      >
        <BooksColumn heading='Want To Read' books={allBooks.toRead} />
        <BooksColumn heading='In Progress' books={allBooks.inProgress} />
        <BooksColumn heading='Completed' books={allBooks.completed} />
      </Stack>
    </VStack>
  );
};

export default MyBooksPage;
