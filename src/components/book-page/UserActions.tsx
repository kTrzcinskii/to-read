import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Stack, Text, chakra, VStack, HStack, Box } from "@chakra-ui/react";
import { BookStatus, SimpleBook } from "@prisma/client";
import transformFromStatusToHeading from "../../utils/helpers/transformFromStatusToHeading";
import DeleteBookBtn from "../my-books/DeleteBookBtn";
import MoveToBtn from "../my-books/MoveToBtn";

interface UserActionsProps {
  bookData: SimpleBook;
}

const UserActions: React.FC<UserActionsProps> = ({ bookData }) => {
  let moveToLeft: BookStatus, moveToRight: BookStatus;
  switch (bookData.status) {
    case "WANT_TO_READ":
      moveToLeft = "WANT_TO_READ";
      moveToRight = "IN_PROGRESS";
      break;
    case "IN_PROGRESS":
      moveToLeft = "WANT_TO_READ";
      moveToRight = "COMPLETED";
      break;
    case "COMPLETED":
      moveToLeft = "IN_PROGRESS";
      moveToRight = "COMPLETED";
      break;
  }

  return (
    <VStack w={{ base: "320px", md: "450px", lg: "600px" }} pb={10} spacing={8}>
      <Text
        fontSize='2xl'
        color='blue.700'
        fontWeight='semibold'
        w='full'
        textAlign='center'
      >
        User Data
      </Text>
      <Stack
        direction={{ base: "column", md: "column", lg: "row" }}
        w='full'
        justifyContent='space-between'
        alignItems='center'
      >
        <Text fontSize='lg' color='gray.700'>
          Current Status:{" "}
          <chakra.span color='blue.500' fontWeight='semibold'>
            {transformFromStatusToHeading(bookData.status)}
          </chakra.span>
        </Text>
        <HStack spacing={6} mx='auto'>
          <HStack spacing={2}>
            <MoveToBtn
              aria-label='Move to left'
              moveTo={moveToLeft}
              bookId={bookData.id}
              icon={<ChevronLeftIcon />}
              googleId={bookData.googleId}
              disabled={bookData.status === "WANT_TO_READ"}
            />
            <MoveToBtn
              aria-label='Move to right'
              moveTo={moveToRight}
              bookId={bookData.id}
              icon={<ChevronRightIcon />}
              googleId={bookData.googleId}
              disabled={bookData.status === "COMPLETED"}
            />
          </HStack>
          <Box>
            <DeleteBookBtn
              bookId={bookData.id}
              bookTitle={bookData.title}
              googleId={bookData.googleId}
            />
          </Box>
        </HStack>
      </Stack>
    </VStack>
  );
};

export default UserActions;
