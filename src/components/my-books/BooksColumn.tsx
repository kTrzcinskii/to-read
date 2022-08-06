import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { SimpleBook } from "@prisma/client";
import { useState } from "react";
import SingleBookRow from "./SingleBookRow";

interface BooksColumnProps {
  books: SimpleBook[];
  heading: "Want To Read" | "In Progress" | "Completed";
}

const BooksColumn: React.FC<BooksColumnProps> = ({ books, heading }) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <VStack
      w={{ base: "330px", md: "400px", lg: "320px", xl: "400px" }}
      bgColor='white'
      py={4}
      rounded='lg'
      shadow='xl'
      spacing={3}
    >
      <Heading color='blue.500' fontSize='3xl' w='full' textAlign='center'>
        {heading}
      </Heading>
      {books.length === 0 && (
        <Text w='full' textAlign='center' fontSize='lg' color='red.400'>
          There isn&apos;t any book with this status.
        </Text>
      )}
      {(showAll || books.length <= 5) &&
        books.map((book) => {
          return (
            <SingleBookRow key={book.id} bookData={book} heading={heading} />
          );
        })}
      {!showAll && books.length > 5 && (
        <>
          {books.slice(0, 5).map((book) => {
            return (
              <SingleBookRow key={book.id} bookData={book} heading={heading} />
            );
          })}
          <Button colorScheme='blue' onClick={() => setShowAll(true)}>
            Load more
          </Button>
        </>
      )}
    </VStack>
  );
};

export default BooksColumn;
