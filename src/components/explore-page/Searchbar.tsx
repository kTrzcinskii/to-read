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

interface SearchbarProps {
  searchTerm: ISearchTerm;
  setSearchTerm: Dispatch<SetStateAction<ISearchTerm>>;
  handleSearchClick: () => void;
  isError: boolean;
  setIsError: Dispatch<SetStateAction<boolean>>;
}

const Searchbar: React.FC<SearchbarProps> = ({
  searchTerm,
  setSearchTerm,
  handleSearchClick,
  isError,
  setIsError,
}) => {
  const { mainQuery, author, category, publisher, title } = searchTerm;

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
