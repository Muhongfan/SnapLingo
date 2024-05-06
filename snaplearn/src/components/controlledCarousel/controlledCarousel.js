import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import CardItem from "../../components/CardItem/CardItem";
import { API_URL } from "../../utils/utils";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import './controlledCarousel.scss'
const Carousel = ({ images }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const imgItem = Object.values(images);
  // console.log("images", imgItem);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % imgItem.length);
  };

  const handleBack = () => {
    setActiveStep(
      (prevActiveStep) => (prevActiveStep - 1 + imgItem.length) % imgItem.length
    );
  };

  return (
    <div className="carousel">
      {/* Button to go back */}
      <button onClick={handleBack} className="carousel__btns">
        <ArrowBackIosIcon />
      </button>
      <div className="carousel__wrapper">
        <SwipeableViews index={activeStep} onChangeIndex={handleStepChange}>
          {imgItem.map((image, index) => (
            <div key={index} className="carousel__content">
              <div>
              <img
                src={`${API_URL}/uploads/image_${image.id}.jpg`}
                alt={image.alt}
              />
              </div>
              <div className="carousel__vocablist">
              <ul >
                {image.labels && image.labels.map((label) => (
                  <li key={label.id} className="carousel__vocabs">
                    <CardItem post={label} />
                  </li>
                ))}
              </ul>
              </div>
            </div>
          ))}
        </SwipeableViews>
      </div>

      {/* Button to go next */}
      <button onClick={handleNext} className="carousel__btns">
        <ArrowForwardIosIcon />{" "}
      </button>
    </div>
  );
};

export default Carousel;
