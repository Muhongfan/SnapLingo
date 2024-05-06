import React, { useState } from "react";
import './RealtimeDetection.scss'
import {
  ChakraProvider,
  Box,
  Container,
  Heading,
  Text,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";
import CardItem from "../../components/CardItem/CardItem";
import ObjectDetection from "../../components/ObjectDetection/ObjectDetection";
import axios from 'axios';

const vocabs=  [
    {
      vocab: "be•nev•o•lent",
      use: "adj",
      pronunciation: "/bəˈnevəl(ə)nt/",
      explanation: "well meaning and kindly. a benevolent smile",
    },
    {
      vocab: "vo·cab·u·lar·y",
      use: "noun",
      pronunciation: "/ˌekspləˈnāSHən/",
      explanation: "the body of words used in a particular language.",
    }
  ]

const Detail = ({ vocabData }) => {
    const [allPredictions, setAllPredictions] = useState({});

    // const handlePredictionsUpdate = (allPredictions) => {
    //   setAllPredictions(allPredictions);
    // };
    // console.log("allPredictions",allPredictions)


    const handlePredictionsUpdate = async (allPredictions) => {
        setAllPredictions(allPredictions);

      try {
        const response = await axios.post('/predictions', {
          predictions: allPredictions
        });
        // Handle response from the server
      } catch (error) {
        console.error('Error sending predictions to server:', error);
      }
    };


  const {
    vocab = "",
    pronunciation = "",
    explanation = "",
    imageUrl = "",
  } = vocabData || {};

  return (
    <ChakraProvider>
      <Container  centerContent h="auto">
        <SimpleGrid
          columns={{ base: 1 }}
          spacing="8"
          w="100%"
          paddingTop="20px"
        >
          <Box
            borderWidth="1px"
            borderColor="black"
            border="2px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="lg"
            p="6"
          >
            <Heading as="h1" mt="8" mb="4" textAlign="left" marginTop="0">
              Let's take a picture and learn from the surrunding world!
            </Heading>
            <Text textAlign="left">
              Are you feeling chilly in your home or library and can't wait to
              learn the new vocabularies now! Let's unlocked away with
              SnapLearn!
            </Text>
            <Image src={imageUrl} alt={vocab} />

            <div className="realtime__content">
              <div className="realtime__video" >
              <ObjectDetection onPredictionsUpdate={handlePredictionsUpdate} />
              </div>
              <div className="realtime__vocabs">
                <ul>
                  <li>
                    <CardItem post={vocabs[0]}/>

                  </li>
                </ul>
              </div>
            </div>
          </Box>

          <Box></Box>
        </SimpleGrid>
      </Container>
    </ChakraProvider>
  );
};

export default Detail;
