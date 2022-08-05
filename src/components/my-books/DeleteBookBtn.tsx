import { DeleteIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Text,
  Tooltip,
  useDisclosure,
  chakra,
  HStack,
  Button,
  useToast,
} from "@chakra-ui/react";
import toastOptions from "../../utils/helpers/toastOptions";
import { trpc } from "../../utils/trpc";
import ModalContainer from "../utils/ModalContainer";

interface DeleteBodyProps {
  title: string;
}

const DeleteBody: React.FC<DeleteBodyProps> = ({ title }) => {
  return (
    <Text>
      Are you sure you want to remove &quot;{title}&quot; from{" "}
      <chakra.span color='blue.500'>your books</chakra.span>?
    </Text>
  );
};

interface DeleteFooterProps {
  bookId: string;
  bookTitle: string;
  onClose: () => void;
}

const DeleteFooter: React.FC<DeleteFooterProps> = ({
  bookId,
  onClose,
  bookTitle,
}) => {
  const { mutate } = trpc.useMutation(["users.delete-book"]);
  const utils = trpc.useContext();
  const toast = useToast();

  const handleClick = () => {
    mutate(
      { bookId },
      {
        onSuccess: () => {
          utils.invalidateQueries(["users.get-my-books"]);
          onClose();
          toast(
            toastOptions(
              "Success",
              `"${bookTitle}" has been successfully removed from your books.`,
              "success"
            )
          );
        },
        onError: (e) => {
          toast(toastOptions("Error", e.message, "error"));
        },
      }
    );
  };

  return (
    <HStack w='full' justifyContent='space-around'>
      <Button colorScheme='blue' onClick={handleClick}>
        Remove
      </Button>
      <Button onClick={onClose}>Cancel</Button>
    </HStack>
  );
};

interface DeleteBookBtnProps {
  bookId: string;
  bookTitle: string;
}

const DeleteBookBtn: React.FC<DeleteBookBtnProps> = ({ bookId, bookTitle }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <>
      <Tooltip label='Remove from my books'>
        <IconButton
          onClick={onOpen}
          aria-label='Delete Book'
          icon={<DeleteIcon />}
          color='red.500'
          bgColor='white'
          _hover={{
            color: "white",
            bgColor: "red.500",
          }}
          fontSize='2xl'
        />
      </Tooltip>
      <ModalContainer
        header='Remove book'
        isOpen={isOpen}
        onClose={onClose}
        body={<DeleteBody title={bookTitle} />}
        footer={
          <DeleteFooter
            bookTitle={bookTitle}
            bookId={bookId}
            onClose={onClose}
          />
        }
      />
    </>
  );
};

export default DeleteBookBtn;
