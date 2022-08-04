import { UseToastOptions } from "@chakra-ui/react";

export default function toastOptions(
  heading: string,
  message: string,
  status: "success" | "info" | "warning" | "error" | "loading" | undefined,
  duration: number = 3000
): UseToastOptions {
  return {
    position: "top",
    title: heading,
    description: message,
    isClosable: true,
    duration,
    status,
  };
}
