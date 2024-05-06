import React, { useState, useEffect } from "react";

import {
  ChakraProvider,
  SimpleGrid,
  Container,
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

const dataList = [
  {
    id: "1",
    imageUrl: "image1.jpg",
    title: "category1",
    description: "Vocab 1",
  },
  {
    id: "2",
    imageUrl: "image2.jpg",
    title: "category1",
    description: "Vocab 2",
  },
  {
    id: "1",
    imageUrl: "image1.jpg",
    title: "category1",
    description: "Vocab 1",
  },
  {
    id: "2",
    imageUrl: "image2.jpg",
    title: "category1",
    description: "Vocab 2",
  },
  {
    id: "1",
    imageUrl: "image1.jpg",
    title: "category1",
    description: "Vocab 1",
  },
  {
    id: "2",
    imageUrl: "image2.jpg",
    title: "category1",
    description: "Vocab 2",
  },
  {
    id: "1",
    imageUrl: "image1.jpg",
    title: "category1",
    description: "Vocab 1",
  },
  {
    id: "2",
    imageUrl: "image2.jpg",
    title: "category1",
    description: "Vocab 2",
  },
  // Add more data objects as needed
];
const menuItems = [
  {
    title: "Category 1",
  },
  {
    title: "Category 2",
  },
  {
    title: "Category 1",
  },
  {
    title: "Category 2",
  },  {
    title: "Category 1",
  },
  {
    title: "Category 2",
  },  {
    title: "Category 1",
  },
  {
    title: "Category 2",
  },  {
    title: "Category 1",
  },
  {
    title: "Category 2",
  },  {
    title: "Category 1",
  },
  {
    title: "Category 2",
  },  {
    title: "Category 1",
  },
  {
    title: "Category 2",
  },
];

const Category = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(null);
  useEffect(() => {
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

  const filteredData = dataList.filter((data) =>
    data.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div >
      <ChakraProvider>
        <div className="category">

          {/* Category menu on the right */}
          {isMobile ? (
            <div className="category-menu__mobile">
              <CustomMenu buttonText="Category" menuItems={menuItems} />
            </div>
          ) : (
            <div className="category-menu">
              <h2 className="category-menu__title">Category</h2>
              <ul>
              {menuItems.map((item, index) => (
                <li className="category-menu__item">
                <Text key={index} fontSize="l">
                  {item.title} {/* Access the title property of each item */}
                </Text>
                </li>
              ))}
              </ul>
            </div>
          )}

          {/* Main content */}

          <Box w="100%">
            {/* Adjust the left margin to make space for the menu */}
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

            <Text p="4" fontSize="lg" fontWeight="bold" mt="2" textAlign="left">
              Subheading
            </Text>
            <Box p="4" w="80%">
              <SimpleGrid columns={[1, 2, 3]} spacing="6">
                {filteredData.map((data, index) => (
                  <Card
                    key={index}
                    imageUrl={data.imageUrl}
                    title={data.title}
                    description={data.description}
                  />
                ))}
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
