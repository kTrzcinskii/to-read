import { Link, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import getShortedText from "../../utils/helpers/getShortedText";

interface SeeMoreBtnProps {
  text?: string;
  setShowFull: Dispatch<SetStateAction<boolean>>;
}

const SeeMoreBtn: React.FC<SeeMoreBtnProps> = ({
  text = "Show More",
  setShowFull,
}) => {
  return (
    <Link color='blue.500' onClick={() => setShowFull((prev) => !prev)}>
      {text}
    </Link>
  );
};

interface SeeMoreProps {
  text: string;
  maxLength: number;
  fontSize: string;
  color: string;
}

const SeeMore: React.FC<SeeMoreProps> = ({
  text,
  maxLength,
  fontSize,
  color,
}) => {
  const [showFull, setShowFull] = useState(false);

  if (!showFull) {
    return (
      <Text fontSize={fontSize} color={color}>
        {getShortedText(text, maxLength)}{" "}
        <SeeMoreBtn setShowFull={setShowFull} />
      </Text>
    );
  }

  return (
    <Text fontSize={fontSize} color={color}>
      {text} <SeeMoreBtn text='Show Less' setShowFull={setShowFull} />
    </Text>
  );
};

export default SeeMore;
