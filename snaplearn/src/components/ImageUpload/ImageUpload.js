import React, { useState } from "react";
import './ImageUpload.scss'
const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  return (
    <div className="selectedImage">
      {selectedImage && (
        <div className="selectedImage__container">
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Uploaded"
            className="selectedImage__img"
          />
          <p>Filename: {selectedImage.name}</p>
        </div>
      )}
      <input type="file" accept="image/*" onChange={handleImageChange} className="selectedImage__input"/>
    </div>
  );
};

export default ImageUploader;
