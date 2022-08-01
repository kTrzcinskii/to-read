import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { IReturnManyBooks, ISearchTerm } from "../../server/schema/book.schema";

interface NoBooksFoundProps {
  setSearchTerm: Dispatch<SetStateAction<ISearchTerm>>;
  setFinalData: Dispatch<SetStateAction<IReturnManyBooks | undefined>>;
}

const NoBooksFound: React.FC<NoBooksFoundProps> = ({
  setFinalData,
  setSearchTerm,
}) => {
  const handleClick = () => {
    setSearchTerm({
      mainQuery: "",
      author: "",
      category: "",
      publisher: "",
      title: "",
    });
    setFinalData(undefined);
  };

  return (
    <VStack w='full' pt={{ base: 10, md: 12, lg: 20 }} pb={5}>
      <Heading
        fontSize='3xl'
        w='full'
        textAlign='center'
        color='blue.500'
        pb={4}
      >
        No books found...
      </Heading>
      <Text fontSize='lg' color='gray.700' w={{ base: "95%", md: "auto" }}>
        It looks like there isn&apos;t any book that match your filters.
      </Text>
      <Button
        variant='ghost'
        _active={{}}
        _hover={{ textDecoration: "underline" }}
        color='red.400'
        onClick={handleClick}
      >
        Reset Filters
      </Button>
    </VStack>
  );
};

export default NoBooksFound;
