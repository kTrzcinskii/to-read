import { Search2Icon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SimpleBook } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

interface SearchInputProps {
  setInput: Dispatch<SetStateAction<string>>;
}

const SearchInput: React.FC<SearchInputProps> = ({ setInput }) => {
  return (
    <InputGroup mx='auto' w='280px'>
      <InputLeftElement>
        <Search2Icon color='blue.500' />
      </InputLeftElement>
      <Input
        placeholder='Enter book title...'
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
    </InputGroup>
  );
};

export default SearchInput;
