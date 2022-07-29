import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import main_page_photo from "../../public/images/main_page_photo.svg";
import LoginBtnsModal from "../components/main-page/LoginBtnsModal";

const Home: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();
  return (
    <Flex
      minH='100vh'
      w='full'
      justifyContent='center'
      alignItems='center'
      bgColor='gray.50'
      direction='column'
    >
      <Stack
        direction={{ base: "column", md: "column", lg: "row-reverse" }}
        justifyContent='center'
        alignItems='center'
        spacing={5}
      >
        <Box
          width={{ base: "320px", md: "400px", lg: "450px", xl: "600px" }}
          height={{ base: "320px", md: "400px", lg: "450px", xl: "600px" }}
          pos='relative'
        >
          <Image
            src={main_page_photo}
            alt='Person reading book'
            layout='fill'
            priority
          />
        </Box>
        <VStack maxW={{ base: "90%", md: "500px", lg: "600px" }}>
          <Heading
            color='gray.700'
            fontSize={{ base: "5xl", md: "7xl" }}
            textAlign={{ base: "center", md: "center", lg: "right" }}
            w='full'
          >
            ToRead
          </Heading>
          <Text
            color='blue.500'
            fontSize={{ base: "lg", md: "xl" }}
            textAlign={{ base: "center", md: "center", lg: "right" }}
            w='full'
          >
            The best place to store all your books-related data.
          </Text>
          <HStack
            pt={6}
            spacing={7}
            w={{ base: "auto", md: "auto", lg: "full" }}
            justifyContent={{ base: "center", md: "center", lg: "flex-end" }}
          >
            <Button colorScheme='blue' minW='80px' onClick={onOpen}>
              Login
            </Button>
            <LoginBtnsModal isOpen={isOpen} onClose={onClose} />
            <Button
              colorScheme='blackAlpha'
              minW='80px'
              onClick={() => router.push("/about")}
            >
              About
            </Button>
          </HStack>
        </VStack>
      </Stack>
    </Flex>
  );
};

export default Home;
