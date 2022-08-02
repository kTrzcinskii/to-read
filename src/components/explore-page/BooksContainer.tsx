import { Grid, GridItem, Text, VStack } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { IReturnManyBooks } from "../../server/schema/book.schema";
import BookCard from "./BookCard";
import BookNavigationBtns from "./BookNavigationBtns";

interface BooksContainerProps {
  data: IReturnManyBooks;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  handleSearchClick: () => void;
}

const BooksContainer: React.FC<BooksContainerProps> = ({
  data,
  page,
  setPage,
  handleSearchClick,
}) => {
  return (
    <VStack w='full' spacing={6} pb={10}>
      <Text
        textAlign='left'
        fontSize='lg'
        color='blue.500'
        fontWeight='semibold'
        w={{ base: "250px", md: "250px", lg: "540px", xl: "1120px" }}
      >
        Found Results:
      </Text>
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "repeat(2, 1fr)",
          xl: "repeat(4, 1fr)",
        }}
        templateRows={{
          base: "16fr",
          lg: "repeat(8, 1fr)",
          xl: "repeat(4, 1fr)",
        }}
        gap={10}
        mt={5}
        pb={10}
      >
        {data.items.map((item) => {
          return (
            <GridItem key={item.id}>
              <BookCard bookInfo={item} />
            </GridItem>
          );
        })}
      </Grid>
      <BookNavigationBtns
        page={page}
        setPage={setPage}
        handleSearchClick={handleSearchClick}
        numOfItems={data.items.length}
      />
    </VStack>
  );
};

export default BooksContainer;
