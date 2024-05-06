import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";

const Card = ({ imageUrl, title, description }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      borderColor="black"
      boxShadow="lg"
      p="4"
    >
      <Image src={imageUrl} alt={title} />
      <Text mt="2" color="gray.600" fontFamily="Helvetica">
        {title}
      </Text>
      <Text mt="2" fontWeight="semibold" fontSize="lg">
        {description}
      </Text>

    </Box>
  );
};

export default Card;

