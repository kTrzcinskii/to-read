import { Search2Icon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { ISearchTerm } from "../../server/schema/book.schema";
import Select, { StylesConfig } from "react-select";
import { ILanguage, languagesList } from "../../utils/constants";

interface SearchbarProps {
  searchTerm: ISearchTerm;
  setSearchTerm: Dispatch<SetStateAction<ISearchTerm>>;
  handleSearchClick: () => void;
  isError: boolean;
  setIsError: Dispatch<SetStateAction<boolean>>;
}

const selectStyles: StylesConfig<ILanguage, false> = {
  control: (styles: any, { isFocused }) => ({
    ...styles,
    border: isFocused ? "2px solid #2B6CB0" : "2px solid #63B3ED",
    borderRadius: "0.375rem",

    ":hover": {
      border: isFocused ? "2px solid #2B6CB0" : "2px solid #4299E1",
    },
  }),
  option: (styles: any) => {
    return { ...styles };
  },
  dropdownIndicator: (base: any, { isFocused }: any) => ({
    ...base,
    color: isFocused ? "#2B6CB0" : "#A0AEC0",

    ":hover": {
      color: isFocused ? "#2B6CB0" : "#4299E1",
    },
  }),
};

const Searchbar: React.FC<SearchbarProps> = ({
  searchTerm,
  setSearchTerm,
  handleSearchClick,
  isError,
  setIsError,
}) => {
  const { mainQuery, author, category, publisher, title, langCode } =
    searchTerm;

  const label =
    languagesList.filter((language) => language.value === langCode)[0]?.label ||
    "Select book language...";

  return (
    <VStack
      w={{ base: "350px", md: "440px", lg: "600px", xl: "700px" }}
      spacing={3}
    >
      <HStack w='full' spacing={2}>
        <Input
          value={mainQuery}
          onChange={(e) =>
            setSearchTerm((prev) => ({ ...prev, mainQuery: e.target.value }))
          }
          bgColor='white'
          borderColor={isError ? "red.400" : "blue.500"}
          focusBorderColor='blue.500'
          borderWidth={2}
          placeholder='Enter title, author or any keyword...'
          _hover={{
            borderColor: "blue.400",
          }}
          onFocus={() => setIsError(false)}
        />
        <IconButton
          aria-label='Search'
          icon={<Search2Icon />}
          colorScheme='blue'
          onClick={handleSearchClick}
        />
      </HStack>
      {isError && (
        <Text color='red.400' fontSize='sm'>
          You cannot search books wihout filling this input.
        </Text>
      )}
      <Accordion
        w={{ base: "full", md: "400px", lg: "450px" }}
        border='none'
        allowToggle
      >
        <AccordionItem border='none'>
          <h2>
            <AccordionButton
              color='blue.500'
              _hover={{ bgColor: "inherit" }}
              role='group'
            >
              <Flex
                mx='auto'
                direction='row'
                justifyContent='center'
                alignItems='center'
              >
                <Box
                  pr={2}
                  _groupHover={{ pr: 4 }}
                  transition='ease-in-out'
                  transitionDuration='200ms'
                >
                  Show Advanced Options
                </Box>
                <AccordionIcon />
              </Flex>
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <VStack w='full' justifyContent='center' alignItems='center'>
              <Input
                w='full'
                bgColor='white'
                borderColor='blue.300'
                focusBorderColor='blue.500'
                borderWidth={2}
                placeholder='Enter title...'
                _hover={{
                  borderColor: "blue.400",
                }}
                onChange={(e) =>
                  setSearchTerm((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                value={title}
              />
              <Input
                w='full'
                bgColor='white'
                borderColor='blue.300'
                focusBorderColor='blue.500'
                borderWidth={2}
                placeholder='Enter author...'
                _hover={{
                  borderColor: "blue.400",
                }}
                onChange={(e) =>
                  setSearchTerm((prev) => ({
                    ...prev,
                    author: e.target.value,
                  }))
                }
                value={author}
              />
              <Input
                w='full'
                bgColor='white'
                borderColor='blue.300'
                focusBorderColor='blue.500'
                borderWidth={2}
                placeholder='Enter category...'
                _hover={{
                  borderColor: "blue.400",
                }}
                onChange={(e) =>
                  setSearchTerm((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
                value={category}
              />
              <Input
                w='full'
                bgColor='white'
                borderColor='blue.300'
                focusBorderColor='blue.500'
                borderWidth={2}
                placeholder='Enter publisher...'
                _hover={{
                  borderColor: "blue.400",
                }}
                onChange={(e) =>
                  setSearchTerm((prev) => ({
                    ...prev,
                    publisher: e.target.value,
                  }))
                }
                value={publisher}
              />
              <Box w='full'>
                <Select
                  placeholder='Select book language...'
                  //@ts-ignore
                  styles={selectStyles}
                  options={languagesList}
                  menuPosition='fixed'
                  onChange={(e) =>
                    setSearchTerm((prev) => ({ ...prev, langCode: e?.value }))
                  }
                  value={
                    langCode !== "" && langCode !== undefined
                      ? { value: searchTerm.langCode, label: label }
                      : null
                  }
                />
              </Box>
              <Box py={4}>
                <Button colorScheme='blue' onClick={handleSearchClick}>
                  <HStack spacing={2}>
                    <Text>Search</Text>
                    <Search2Icon />
                  </HStack>
                </Button>
              </Box>
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </VStack>
  );
};

export default Searchbar;
