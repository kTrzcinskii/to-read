import { Box, Flex, chakra, HStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const loadingCircleVariants = {
  start: {
    y: "0%",
  },
  end: {
    y: "80%",
    transition: {
      duration: 0.5,
      reverse: Infinity,
      ease: "easeInOut",
    },
  },
};

const LoadingAni: React.FC = () => {
  return (
    <Box w='full'>
      <Flex
        pt={{ base: 10, md: 12, lg: 20 }}
        w='full'
        justifyContent={"center"}
        alignItems='center'
      >
        <HStack
          justifyContent='space-around'
          width='8rem'
          height='6rem'
          as={motion.div}
          variants={loadingContainerVariants}
          initial='start'
          animate='end'
        >
          <chakra.span
            as={motion.span}
            width='2rem'
            height='2rem'
            bgColor='blue.500'
            borderRadius='full'
            variants={loadingCircleVariants}
          />
          <chakra.span
            as={motion.span}
            width='2rem'
            height='2rem'
            bgColor='blue.500'
            borderRadius='full'
            variants={loadingCircleVariants}
          />
          <chakra.span
            as={motion.span}
            width='2rem'
            height='2rem'
            bgColor='blue.500'
            borderRadius='full'
            variants={loadingCircleVariants}
          />
        </HStack>
      </Flex>
    </Box>
  );
};

export default LoadingAni;
