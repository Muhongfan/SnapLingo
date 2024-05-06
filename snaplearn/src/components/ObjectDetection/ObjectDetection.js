import { useEffect, useRef, useState } from "react";
import "./ObjectDetection.scss";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";
const ObjectDetection = ({ onPredictionsUpdate }) => {
    const videoRef = useRef(null);
    const [isWebcamStarted, setIsWebcamStarted] = useState(false);
    const [allPredictions, setAllPredictions] = useState({});
    const [detectionInterval, setDetectionInterval] = useState();
  
    useEffect(() => {
      if (isWebcamStarted) {
        setDetectionInterval(setInterval(predictObject, 500));
      } else {
        if (detectionInterval) {
          clearInterval(detectionInterval);
          setDetectionInterval(null);
        }
      }
  
      return () => {
        clearInterval(detectionInterval);
      };
    }, [isWebcamStarted]);
  
    const predictObject = async () => {
      try {
        const model = await cocoSsd.load();
        const predictions = await model.detect(videoRef.current);
    
        // Combine existing predictions with new predictions
        const updatedPredictions = allPredictions ;

        predictions.forEach((prediction) => {
          // Generate a unique key for each prediction based on its properties
          const predictionKey = `${prediction.class}`;
          setAllPredictions("with allPredictions",updatedPredictions);
          // Check if the prediction already exists in updatedPredictions
          if (!updatedPredictions[predictionKey]) {
            // If the prediction is not found, add it to updatedPredictions
            updatedPredictions[predictionKey] = prediction;
          }
        });
        console.log("updatedPredictions",updatedPredictions)
        // Update state with all predictions
        setAllPredictions(updatedPredictions);
    
        // Pass updated predictions to parent component
        onPredictionsUpdate(updatedPredictions);
      } catch (error) {
        console.error('Error predicting objects:', error);
      }
    };
    
    
  
    const startWebcam = async () => {
      try {
        setIsWebcamStarted(true);
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        setIsWebcamStarted(false);
        console.error('Error accessing webcam:', error);
      }
    };
  
    const stopWebcam = () => {
      const video = videoRef.current;
  
      if (video) {
        const stream = video.srcObject;
        const tracks = stream.getTracks();
  
        tracks.forEach((track) => {
          track.stop();
        });
  
        video.srcObject = null;
        setAllPredictions({});
        setIsWebcamStarted(false);
      }
    };

  
    return (
      <div className="object-detection">
        <div className="object-detection__buttons">
          <button onClick={isWebcamStarted ? stopWebcam : startWebcam}>{isWebcamStarted ? "Stop" : "Start"} Webcam</button>
        </div>
        <div className="object-detection__feed" >
          {isWebcamStarted ? <video ref={videoRef} autoPlay muted style={{ maxWidth: '100%', maxHeight: '100%' }} /> : <div />}
          {Object.values(allPredictions).map((prediction, index) => {
            const markerLeft = Math.max(prediction.bbox[0] - 75, 0); // Ensure marker doesn't go outside left boundary
            const markerTop = Math.max(prediction.bbox[1] - 30, 0); // Ensure marker doesn't go outside top boundary
            const markerWidth = Math.min(prediction.bbox[2], videoRef.current.clientWidth - markerLeft); // Limit marker width to stay within right boundary
            const markerHeight = Math.min(prediction.bbox[3], videoRef.current.clientHeight - markerTop); // Limit marker height to stay within bottom boundary
  
            return (
              <div key={index}>
                <p style={{
                  position: 'absolute',
                  left: `${markerLeft}px`,
                  top: `${markerTop}px`,
                  width: `${markerWidth}px`
                }}>{prediction.class} - with {Math.round(parseFloat(prediction.score) * 100)}% confidence.</p>
                <div className="marker" style={{
                  position: 'absolute',
                  left: `${markerLeft}px`,
                  top: `${markerTop}px`,
                  width: `${markerWidth}px`,
                  height: `${markerHeight}px`
                }} />
              </div>
              
            );
          })}
        </div>
      </div>
    );
  };
  
  export default ObjectDetection;
  