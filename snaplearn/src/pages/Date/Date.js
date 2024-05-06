import React, { useState, useEffect } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import { API_URL } from "../../utils/utils";
import axios from "axios";
import CssBaseline from "@mui/joy/CssBaseline";
import framesxTheme from "../../theme";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import "./Date.scss";


export default function QuiltedImageList() {

  const [imgbyDate, setImgbyDate] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  const fetchImageByDate = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/images/bydate`);
      console.log("imgbyDate first", response.data);

      setImgbyDate(response.data);
      setIsFetching(false);
    } catch (error) {
      console.error("Error fetching images ordered by date:", error);
    }
  };

  useEffect(() => {
    fetchImageByDate();
  }, []);

  if (isFetching) {
    return <p>Loading images data ordered by date...</p>;
  }


  return (
    <CssVarsProvider disableTransitionOnChange theme={framesxTheme}>
      <CssBaseline />
      <div className="date">
        <div className="date__Wrapper">
          {imgbyDate.map((items, index) => (
            <div key={index} className="date__item">
              <h3>{items.date}</h3>
              <ImageList
                className="date__imageList"
                variant="quilted"
                cols={4}
                rowHeight={121}
              >
                {items.images.map((img) => (
                  <ImageListItem
                    key={img.id}
                  >
                    <img
                      src={`${API_URL}/uploads/image_${img.id}.jpg`}
                      // srcSet={`${API_URL}/uploads/image_${img.id}.jpg 1x, ${API_URL}/uploads/image_${img.id}@2x.jpg 2x`}
                      alt={img.id}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </div>
          ))}
        </div>
      </div>
    </CssVarsProvider>
  );
}

