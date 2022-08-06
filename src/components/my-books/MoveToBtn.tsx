import {
  IconButtonProps,
  Tooltip,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { BookStatus } from "@prisma/client";
import toastOptions from "../../utils/helpers/toastOptions";
import transformFromStatusToHeading from "../../utils/helpers/transformFromStatusToHeading";
import { trpc } from "../../utils/trpc";

type MoveToBtnProps = IconButtonProps & {
  moveTo: BookStatus;
  bookId: string;
  googleId: string;
  isDisabled?: boolean;
};

const MoveToBtn: React.FC<MoveToBtnProps> = ({
  isDisabled = false,
  bookId,
  moveTo,
  googleId,
  ...rest
}) => {
  const { mutate } = trpc.useMutation(["users.move-book"]);
  const utils = trpc.useContext();
  const toast = useToast();

  const handleOnClick = () => {
    mutate(
      { bookId, moveTo },
      {
        onSuccess: () => {
          utils.invalidateQueries("users.get-my-books");
          utils.invalidateQueries([
            "users.is-book-in-my-collection",
            { googleId },
          ]);
        },
        onError: (e) => {
          toast(toastOptions("Error", e.message, "error"));
        },
      }
    );
  };

  return (
    <Tooltip
      display={isDisabled ? "none" : "auto"}
      label={`Move to "${transformFromStatusToHeading(moveTo)}"`}
    >
      <IconButton
        disabled={isDisabled}
        color='blue.500'
        fontSize='2xl'
        bgColor='white'
        _hover={{ bgColor: "blue.500", color: "white" }}
        onClick={handleOnClick}
        {...rest}
      />
    </Tooltip>
  );
};

export default MoveToBtn;
