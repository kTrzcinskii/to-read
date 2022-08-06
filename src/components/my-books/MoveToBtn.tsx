import {
  IconButtonProps,
  Tooltip,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { BookStatus } from "@prisma/client";
import toastOptions from "../../utils/helpers/toastOptions";
import { trpc } from "../../utils/trpc";

type MoveToBtnProps = IconButtonProps & {
  moveTo: BookStatus;
  bookId: string;
  isDisabled?: boolean;
};

const transformFromStatusToHeading = (
  s: BookStatus
): "Want To Read" | "In Progress" | "Completed" => {
  switch (s) {
    case "COMPLETED":
      return "Completed";
    case "IN_PROGRESS":
      return "In Progress";
    case "WANT_TO_READ":
      return "Want To Read";
  }
};

const MoveToBtn: React.FC<MoveToBtnProps> = ({
  isDisabled = false,
  bookId,
  moveTo,
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
