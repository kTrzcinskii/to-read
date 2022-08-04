import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Button, HStack, IconButton } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { flushSync } from "react-dom";

interface BookNavigationBtnsProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  numOfItems: number;
  handleSearchClick: (x: number) => void;
}

const BookNavigationBtns: React.FC<BookNavigationBtnsProps> = ({
  page,
  setPage,
  handleSearchClick,
  numOfItems,
}) => {
  return (
    <HStack py={4} px={4} bgColor='white' rounded='lg'>
      <IconButton
        aria-label='go to previous page'
        disabled={page === 0}
        icon={<ChevronLeftIcon fontSize='2xl' />}
        onClick={() => {
          setPage((prev) => prev - 1);
          handleSearchClick(-1);
        }}
        bgColor='white'
        color='blue.500'
        _hover={{ bgColor: "blue.500", color: "white" }}
        _active={{}}
      />
      <IconButton
        aria-label='go to next page'
        disabled={numOfItems < 16}
        icon={<ChevronRightIcon fontSize='2xl' />}
        onClick={() => {
          setPage((prev) => prev + 1);
          handleSearchClick(1);
        }}
        bgColor='white'
        color='blue.500'
        _hover={{ bgColor: "blue.500", color: "white" }}
        _active={{}}
      />
    </HStack>
  );
};

export default BookNavigationBtns;
