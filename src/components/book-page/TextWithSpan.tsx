import { Text, chakra } from "@chakra-ui/react";

interface TextWithSpanProps {
  title: string;
  value: string | number;
}

const TextWithSpan: React.FC<TextWithSpanProps> = ({ title, value }) => {
  return (
    <Text fontSize='md' color='gray.700' w='full'>
      {title}:{" "}
      <chakra.span fontWeight='semibold' color='blue.500'>
        {value}
      </chakra.span>
    </Text>
  );
};

export default TextWithSpan;
