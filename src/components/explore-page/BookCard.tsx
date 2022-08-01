import { VStack, Text, Box, Tooltip, Divider } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReturnManyBooksSingleEleemt } from "../../server/schema/book.schema";
import getShortedText from "../../utils/helpers/getShortedText";

interface TooltipForAuthorsProps {
  authors: string[];
}

const TooltipForAuthors: React.FC<TooltipForAuthorsProps> = ({ authors }) => {
  return (
    <div>
      {authors.map((author, index) => {
        return <p key={index}>{author}</p>;
      })}
    </div>
  );
};

interface BookCardProps {
  bookInfo: ReturnManyBooksSingleEleemt;
}

const BookCard: React.FC<BookCardProps> = ({ bookInfo }) => {
  const imgSrc =
    bookInfo.volumeInfo.imageLinks?.thumbnail ||
    "https://books.google.com/googlebooks/images/no_cover_thumb.gif";

  const max2Authors = bookInfo.volumeInfo.authors
    ? bookInfo.volumeInfo.authors.slice(0, 2)
    : [];
  const howMuchMoreThan2Authors = bookInfo.volumeInfo.authors
    ? bookInfo.volumeInfo.authors.length - 2
    : 0;

  const router = useRouter();

  return (
    <VStack
      w='280px'
      bgColor='white'
      spacing={4}
      rounded='lg'
      shadow='xl'
      minH='429px'
      cursor='pointer'
      _hover={{
        transform: "scale(105%)",
      }}
      transition='ease-in-out'
      transitionDuration='200ms'
      onClick={() => router.push(`/book/${bookInfo.id}`)}
    >
      <Box pt={8}>
        <Image src={imgSrc} width='128px' height='186px' alt='Book image' />
      </Box>
      <Divider w='240px' h='2px' bgColor='blue.500' />
      <Tooltip label={bookInfo.volumeInfo.title}>
        <Text fontSize='lg' color='blue.500' fontWeight='semibold' maxW='240px'>
          {getShortedText(bookInfo.volumeInfo.title, 48)}
        </Text>
      </Tooltip>
      <VStack pb={5} spacing={1}>
        {max2Authors &&
          max2Authors.map((author, index) => {
            return (
              <Tooltip key={index} label={author}>
                <Text fontSize='md' color='blue.700' maxW='240px'>
                  {getShortedText(author, 30)}
                  {(index !== max2Authors.length - 1 ||
                    howMuchMoreThan2Authors > 0) &&
                    ","}
                </Text>
              </Tooltip>
            );
          })}
        {howMuchMoreThan2Authors > 0 && (
          <Tooltip
            label={
              <TooltipForAuthors
                authors={bookInfo.volumeInfo.authors.slice(2)}
              />
            }
          >
            <Text fontSize='md' color='blue.700'>
              and {howMuchMoreThan2Authors} more...
            </Text>
          </Tooltip>
        )}
      </VStack>
    </VStack>
  );
};

export default BookCard;
