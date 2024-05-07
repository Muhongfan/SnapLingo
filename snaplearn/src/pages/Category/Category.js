import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../utils/utils";
import {
  ChakraProvider,
  SimpleGrid,
  Heading,
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  Text,
} from "@chakra-ui/react";
import CustomMenu from "../../components/Menu/Menu";

import { FaSearch } from "react-icons/fa";
import Card from "./Card";
import "./Category.scss";

const menuItems = [
  {
    id: "filteredMoods",
    title: "mood",
    url: "assets/images/mood.png",
  },

  {
    id: "filteredSettings",
    title: "setting",
    url: "assets/images/setting.png",
  },
];

const Category = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(null);
  const [moodData, setMoodData] = useState(null);
  const [settingData, setSettingData] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    // getCategoryfromBackend();
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    handleResize(); // Initial call to set screen size on component mount

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const getCategoryfromBackend = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/vocabs/category`);
      setIsFetching(false)

      // console.log("response.data", response.data);
      setCategoryData(response.data);
      setMoodData(categoryData.uniqueMoods );
      setSettingData(categoryData.uniqueSettings );
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  getCategoryfromBackend();
  if (isFetching) {
    return <p>Loading Category data...</p>;
  }
  console.log("moodData", moodData);

  return (
    <div>
      <ChakraProvider>
        <div className="category">
          {/* Category menu on the right */}
          {isMobile ? (
            <div className="category-menu__mobile">
              <CustomMenu buttonText="Category" menuItems={[menuItems]} />
            </div>
          ) : (
            <div className="category-menu">
              <h2 className="category-menu__title">Category</h2>
              <ul>
                {menuItems.map((item, index) => (
                  <li className="category-menu__item">
                    <Text key={index} fontSize="l">
                      {item.title}
                    </Text>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Box w="100%">
            <Box
              p={isMobile ? "4" : "2.5rem"}
              pt="1rem"
              pb="1rem"
              bg="#f5f5f5"
              mt="1rem"
            >
              <Heading as="h1" mb="6" marginBottom="10px">
                Speak Every Category
              </Heading>
              <Text color="gray.600" fontFamily="Helvetica" marginBottom="10px">
                Learn the vocabs within your familiar occasions
              </Text>

              {/* Search bar */}
              <InputGroup mb="4" w="30%">
                <InputLeftElement
                  pointerEvents="none"
                  children={<Icon as={FaSearch} color="gray.500" />}
                />
                <Input
                  borderRadius="20px"
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </InputGroup>
              <Text color="gray.600" fontFamily="Jersey 10" marginBottom="10px">
                Love the learning right now!{" "}
              </Text>
            </Box>
            <div className="category__wrapper">
              <Text
                p="4"
                fontSize="lg"
                fontWeight="bold"
                mt="2"
                textAlign="left"
              >
                Category
              </Text>
              <Box p="4" w="80%">
                <SimpleGrid columns={[1, 2, 3]} spacing="6">
                  {moodData && moodData.map((mood, index) => (
                      <Card
                        key={index}
                        imageUrl={`${API_URL}/uploads/mood.png`}
                        title="Mood"
                        description={mood}
                      />
                    ))}
                  {/* {categoryData &&
                    categoryData.Settings &&
                    categoryData.Settings.map((setting, index) => (
                      <Card
                        key={index}
                        imageUrl={`${API_URL}/uploads/setting.png`}
                        title="Setting"
                        description={setting}
                      />
                    ))} */}
                </SimpleGrid>
              </Box>
            </div>
          </Box>
        </div>
      </ChakraProvider>
    </div>
  );
};

export default Category;
