import { Heading, VStack, Box, Text, Button } from "@chakra-ui/react";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import image_src from "../../public/images/404_image.svg";

const NotFoundPage: NextPage = () => {
  const router = useRouter();

  return (
    <VStack
      minH='100vh'
      minW='100vw'
      justifyContent='center'
      spacing={6}
      bgColor='gray.100'
    >
      <Box
        w={{ base: "300px", md: "400px", lg: "600px" }}
        h={{ base: "250px", md: "300px", lg: "400px" }}
        pos='relative'
      >
        <Image src={image_src} alt='404' layout='fill' />
      </Box>
      <Box>
        <Heading textAlign='center' fontSize='5xl' color='blue.500'>
          Oops...
        </Heading>
        <Text fontSize='2xl' mt={4} color='blue.700' textAlign='center'>
          Page not found.
        </Text>
      </Box>
      <Button colorScheme='blue' onClick={() => router.push("/")}>
        Go to Home Page
      </Button>
    </VStack>
  );
};

export default NotFoundPage;
