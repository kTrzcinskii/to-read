import { Button, HStack, VStack } from "@chakra-ui/react";
import ModalContainer from "../utils/ModalContainer";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { FaDiscord } from "react-icons/fa";
import { Text } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

interface LoginBtnsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Body: React.FC = () => {
  return (
    <VStack w='full'>
      <Button
        minW='196px'
        color='white'
        bgColor='gray.900'
        _hover={{ bgColor: "gray.600" }}
        _active={{ bgColor: "gray.700" }}
        onClick={() => {
          signIn("github", { callbackUrl: "/explore" });
        }}
      >
        <HStack>
          <BsGithub size={22} />
          <Text>Login with Github</Text>
        </HStack>
      </Button>
      <Button
        minW='196px'
        colorScheme='blue'
        onClick={() => {
          signIn("google", { callbackUrl: "/explore" });
        }}
      >
        <HStack>
          <BsGoogle size={20} />
          <Text>Login with Google</Text>
        </HStack>
      </Button>
      <Button
        minW='196px'
        colorScheme='blackAlpha'
        onClick={() => {
          signIn("discord", { callbackUrl: "/explore" });
        }}
      >
        <HStack>
          <FaDiscord size={20} />
          <Text>Login with Discord</Text>
        </HStack>
      </Button>
    </VStack>
  );
};

const LoginBtnsModal: React.FC<LoginBtnsModalProps> = ({ isOpen, onClose }) => {
  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={onClose}
      header='Login'
      footer={<></>}
      body={<Body />}
      w='300px'
    />
  );
};

export default LoginBtnsModal;
