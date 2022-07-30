import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Drawer,
  DrawerContent,
  Heading,
  HStack,
  IconButton,
  Text,
  useDisclosure,
  VStack,
  Link,
  Divider,
  Button,
  Box,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import book_icon from "../../../public/images/book_icon.svg";
import NextLink from "next/link";
import { signOut } from "next-auth/react";

interface NavbarLink {
  title: string;
  link: string;
}

const navbarLinks: NavbarLink[] = [
  { title: "Explore", link: "/explore" },
  { title: "My Books", link: "/my-books" },
  { title: "About", link: "/about" },
];

type NavbarLinkProps = NavbarLink & {
  showDivider?: boolean;
};

const NavbarLinkMobile: React.FC<NavbarLinkProps> = ({
  title,
  link,
  showDivider,
}) => {
  return (
    <>
      <NextLink passHref href={link}>
        <Link style={{ textDecoration: "none" }} cursor='pointer'>
          <Text fontSize='2xl' color='blue.500'>
            {title}
          </Text>
        </Link>
      </NextLink>
      {showDivider && <Divider w='250px' bgColor='blue.500' h='1px' />}
    </>
  );
};

const NavbarLinkDesktop: React.FC<NavbarLink> = ({ link, title }) => {
  return (
    <NextLink passHref href={link}>
      <Link
        style={{ textDecoration: "none" }}
        as={Button}
        h='70px'
        rounded='none'
        minW='110px'
        bgColor='inherit'
        color='gray.100'
        fontSize='lg'
        _hover={{
          color: "blue.500",
          bgColor: "gray.100",
        }}
      >
        {title}
      </Link>
    </NextLink>
  );
};

const NavDrawerContent: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <VStack w='full' pos='relative' minH='100vh'>
      <HStack w='full' justifyContent='flex-end' pr={4} pt={4}>
        <IconButton
          onClick={onClose}
          variant='ghost'
          aria-label='Close nav'
          color='red.400'
          _hover={{}}
          _active={{}}
          icon={<CloseIcon fontSize='2xl' />}
        />
      </HStack>
      <VStack h='full' w='full' justifyContent='center' spacing={8}>
        {navbarLinks.map((link, index) => {
          return (
            <NavbarLinkMobile
              key={index}
              {...link}
              showDivider={index !== navbarLinks.length - 1}
            />
          );
        })}
      </VStack>
      <Box pb={12}>
        <Button
          colorScheme='blue'
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Logout
        </Button>
      </Box>
    </VStack>
  );
};

const NavbarMenuMobile: React.FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <IconButton
        aria-label='Hamburger Button'
        display={{ base: "block", md: "block", lg: "none" }}
        icon={<HamburgerIcon fontSize='4xl' />}
        variant='ghost'
        color='gray.100'
        _hover={{}}
        _active={{}}
        onClick={onOpen}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement='top'
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size='full'
      >
        <DrawerContent>
          <NavDrawerContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
    </>
  );
};

const NavbarMenuDesktop: React.FC = () => {
  return (
    <HStack spacing={8} display={{ base: "none", md: "none", lg: "flex" }}>
      <HStack spacing={0}>
        {navbarLinks.map((link, index) => {
          return <NavbarLinkDesktop {...link} key={index} />;
        })}
      </HStack>
      <Button
        onClick={() => signOut({ callbackUrl: "/" })}
        bgColor='gray.50'
        color='blue.500'
        _hover={{ bgColor: "gray.100" }}
        _active={{ bgColor: "gray.200" }}
      >
        Logout
      </Button>
    </HStack>
  );
};

const Navbar: React.FC = () => {
  const router = useRouter();
  return (
    <HStack
      w='full'
      bgColor='blue.500'
      px={{ base: 3, md: 4, lg: 10 }}
      justifyContent='space-between'
    >
      <HStack onClick={() => router.push("/explore")} cursor='pointer'>
        <Image src={book_icon} alt='Book Icon' width='70px' height='70px' />
        <Heading fontSize='4xl' color='gray.100'>
          ToRead
        </Heading>
      </HStack>
      <NavbarMenuMobile />
      <NavbarMenuDesktop />
    </HStack>
  );
};

export default Navbar;
