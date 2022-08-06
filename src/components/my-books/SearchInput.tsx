import { Search2Icon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SimpleBook } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

interface SearchInputProps {
  setBooks: Dispatch<SetStateAction<SimpleBook[]>>;
  books: SimpleBook[];
}

const SearchInput: React.FC<SearchInputProps> = ({ setBooks, books }) => {
  return (
    <InputGroup mx='auto' w='280px'>
      <InputLeftElement>
        <Search2Icon color='blue.500' />
      </InputLeftElement>
      <Input
        placeholder='Enter book title...'
        onChange={(e) => {
          setBooks(books.filter((book) => book.title.includes(e.target.value)));
        }}
      />
    </InputGroup>
  );
};

export default SearchInput;
