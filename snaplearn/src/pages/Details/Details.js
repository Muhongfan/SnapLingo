import React, { useState, useEffect } from "react";
import "./Details.scss";
import {
  ChakraProvider,
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import CardItem from "../../components/CardItem/CardItem";
import ImageCapture from "../../components/ImageCapture/ImageCapture";

const Detail = () => {
  const [imgId, setImgId] = useState(null);
  const [vocabData, setVocabData] = useState(null);

  const handleImgIdChange = (imgid, vocabs) => {
    setImgId(imgid);
    setVocabData(vocabs);
    // console.log("vocabs:",vocabs);
  };

  return (
    <ChakraProvider centerContent >
      {/* <Container centerContent h="auto" className="details__container"> */}
      <div className="details"> 
      <div className="details__wrapper">
        <div className="details__box-container"
        >
          <Heading as="h1" mt="8" mb="4" textAlign="left" marginTop="0">
            Let's take a picture and learn from the surrounding world!
          </Heading>
          <Text textAlign="left">
            Ready to learn new vocabulary from the things in your current
            surrounding environment?! Do it with SnapLearn!
          </Text>
          {/* <Image src={imageUrl} alt={vocab} /> */}

          <div className="details__content">
            <div className="details__camera">
              {/* <ImageUpload /> */}
              <ImageCapture onImgIdChange={handleImgIdChange} />
            </div>
            <div className="details__vocabs">
              <ul>
                {vocabData && vocabData.length > 0 ? (
                  vocabData.map((item) => (
                    <li key={item.id}>
                      <CardItem post={item} />
                    </li>
                  ))
                ) : (
                  <div className="details__warning">
                    <p >No object detected</p>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
        </div>
      </div>
    </ChakraProvider>
  );
};

export default Detail;
