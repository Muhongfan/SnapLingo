import React, { useRef, useState } from "react";
import axios from "axios";
import { API_URL } from "../../utils/utils";
import { nanoid } from "nanoid";
import "./ImageCapture.scss";
const ImageCapture = ({ onImgIdChange }) => {
  const imgRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [captureVideoFrame, setCaptureVideoFrame] = useState(false);
  const [imgId, setImgId] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraActive(true);
      setCapturedImage(null);
      if (imgRef.current) {
        imgRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopCamera = () => {
    const stream = imgRef.current.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
    imgRef.current.srcObject = null;
  };

  const captureImage = () => {
    const video = imgRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    

    const imgId = nanoid();
    setImgId(imgId);

    if (captureVideoFrame) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
    } else {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);
    }
    const imageDataURL = canvas.toDataURL(`image/jpeg`);
    setCapturedImage(imageDataURL);
  };

  const sendImageToBackend = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post(`${API_URL}/api/images/upload`, {
        id: imgId,
        image: capturedImage,
      });

      onImgIdChange(imgId, response.data);
      console.log("Image uploaded successfully");
      setTimeout(() => {
        setIsLoading(false);
      }, 0);
      
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleImageSendToBackend = async () => {
    try {
      captureImage();
      setCameraActive(false);
      stopCamera();
    } catch (error) {
      console.error("Error sending image to backend:", error);
    }
  };

  return (
    <div className="imgCamera">

      <div className="imgCamera__placeholder">
        <video className="imgCamera__camera" ref={imgRef} autoPlay={cameraActive}  style={{ display: !capturedImage ? "block" : "none" }}/>
        <canvas
        className="imgCamera__camera"
          ref={canvasRef}
          style={{ display: capturedImage ? "block" : "none" }}
        />
      </div>

      <div className="imgCamera__buttons">
        <button className="button-19" onClick={startCamera}>Enable Camera</button>
        <button className="button-19" onClick={handleImageSendToBackend}>Capture Photo</button>
        {/* <button className="button-19" onClick={sendImageToBackend}>Learn</button> */}
        {isLoading ? (
        <button className="button-19" disabled>Loading...</button>
      ) : (
        <button className="button-19" onClick={sendImageToBackend}>Learn</button>
      )}
      </div>

    </div>
  );
};

export default ImageCapture;
