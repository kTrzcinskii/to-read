import { Box, Heading, Text, VStack } from "@chakra-ui/react";

interface ErrorMessageProps {
  customMessage?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  customMessage = "Something went wrong. Please try again later.",
}) => {
  return (
    <Box w='full'>
      <VStack
        pt={{ base: 10, md: 12, lg: 20 }}
        w='full'
        justifyContent={"center"}
        alignItems='center'
      >
        <Heading fontSize='3xl' w='full' textAlign='center' color='blue.500'>
          Error
        </Heading>
        <Text fontSize='lg' color='gray.700' w={{ base: "95%", md: "auto" }}>
          {customMessage}
        </Text>
      </VStack>
    </Box>
  );
};

export default ErrorMessage;
