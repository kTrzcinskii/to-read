import {
  ChevronUpIcon,
  ChevronLeftIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import {
  chakra,
  Divider,
  Flex,
  HStack,
  Text,
  Tooltip,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import { BookStatus, SimpleBook } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/router";
import getShortedText from "../../utils/helpers/getShortedText";
import TooltipForAuthors from "../utils/TooltipForAuthors";
import DeleteBookBtn from "./DeleteBookBtn";
import MoveToBtn from "./MoveToBtn";

interface SingleBookRowProps {
  bookData: SimpleBook;
  heading: "Want To Read" | "In Progress" | "Completed";
}

const SingleBookRow: React.FC<SingleBookRowProps> = ({ bookData, heading }) => {
  const isMoreThan1Author = bookData.authors.length > 1;

  const router = useRouter();
  const goToBookPage = () => {
    router.push(`/book/${bookData.googleId}`);
  };

  const maxCharTitle = useBreakpointValue({ base: 23, md: 30, lg: 23, xl: 30 });

  let moveToLeft: BookStatus, moveToRight: BookStatus;
  switch (heading) {
    case "Want To Read":
      moveToLeft = "WANT_TO_READ";
      moveToRight = "IN_PROGRESS";
      break;
    case "In Progress":
      moveToLeft = "WANT_TO_READ";
      moveToRight = "COMPLETED";
      break;
    case "Completed":
      moveToLeft = "IN_PROGRESS";
      moveToRight = "COMPLETED";
      break;
  }

  return (
    <HStack
      w='calc(100% - 20px)'
      bgColor='gray.100'
      rounded='lg'
      alignItems='center'
      pos='relative'
      spacing={1}
      h='117px'
      _hover={{ bgColor: "gray.200" }}
      transition='ease-in-out'
      transitionDuration='200ms'
    >
      <Flex
        px={3}
        py={3}
        h='full'
        justifyContent='center'
        alignItems='center'
        cursor='pointer'
        onClick={goToBookPage}
      >
        <Image
          src={bookData.imgLink}
          width='64px'
          height='93px'
          alt='Book image'
        />
      </Flex>
      <Divider orientation='vertical' w='2px' h='100px' bgColor='blue.500' />
      <VStack
        h='full'
        pt='8px'
        pl={2}
        alignItems='flex-start'
        w='calc(100% - 118px)'
      >
        <Tooltip label={bookData.title}>
          <Text
            fontSize='lg'
            fontWeight='semibold'
            color='blue.500'
            cursor='pointer'
            onClick={goToBookPage}
          >
            {getShortedText(bookData.title, maxCharTitle!)}
          </Text>
        </Tooltip>
        <Text fontSize='sm' color='gray.700'>
          {bookData.authors[0]}
          {isMoreThan1Author && (
            <Tooltip
              label={<TooltipForAuthors authors={bookData.authors.slice(1)} />}
            >
              <chakra.span>
                {" "}
                and{" "}
                <chakra.span fontWeight='semibold'>
                  {bookData.authors.length - 1} more...
                </chakra.span>
              </chakra.span>
            </Tooltip>
          )}
        </Text>
        <HStack w='full' justifyContent='space-between'>
          <HStack spacing={3}>
            <MoveToBtn
              isDisabled={heading === "Want To Read"}
              moveTo={moveToLeft}
              aria-label='disabled'
              icon={useBreakpointValue({
                base: <ChevronUpIcon />,
                md: <ChevronUpIcon />,
                lg: <ChevronLeftIcon />,
              })}
              bookId={bookData.id}
            />
            <MoveToBtn
              isDisabled={heading === "Completed"}
              moveTo={moveToRight}
              aria-label='Move to in progress'
              icon={useBreakpointValue({
                base: <ChevronDownIcon />,
                md: <ChevronDownIcon />,
                lg: <ChevronRightIcon />,
              })}
              bookId={bookData.id}
            />
          </HStack>
          <DeleteBookBtn bookId={bookData.id} bookTitle={bookData.title} />
        </HStack>
      </VStack>
    </HStack>
  );
};

export default SingleBookRow;
