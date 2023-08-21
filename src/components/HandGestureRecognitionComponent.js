

import React, { useRef, useState, useEffect } from 'react';
import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
import Webcam from "react-webcam";
import { drawHands } from './Utilities';
import '@tensorflow/tfjs-backend-webgl';
import '@mediapipe/hands';

function HandGestureRecognitionComponent() {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const [model, setModel] = useState(null);
    const [modelLoaded, setModelLoaded] = useState(false);

    const loadModel = async () => {  
        try {
            const loadedModel = await handPoseDetection.createDetector(
                handPoseDetection.SupportedModels.MediaPipeHands, {
                    runtime: 'mediapipe',
                    solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/hands',
                    modelType: 'full'
                }
            ); 
            console.log("Handpose model loaded.");
            setModel(loadedModel);
            setModelLoaded(true);
        } catch (error) {
            console.error("Error loading or initializing handpose model:", error);
        } 
  };

    useEffect(() => {
      const retryInterval = setInterval(() => {
          if (!modelLoaded) {
              loadModel();
          } else {
              clearInterval(retryInterval); // Clear the interval once the model is loaded
          }
      }, 1000); // Retry every  second
  
      return () => {
          clearInterval(retryInterval); // Clear the interval when the component unmounts
      };
  }, [modelLoaded]);


    const detect = async () => {
      if (
          model &&
          typeof webcamRef.current !== "undefined" &&
          webcamRef.current !== null &&
          webcamRef.current.video.readyState === 4
      ) {
          const video = webcamRef.current.video;
          const videoWidth = video.videoWidth;
          const videoHeight = video.videoHeight;

          webcamRef.current.video.width = videoWidth-200;
          webcamRef.current.video.height = videoHeight-200;

          canvasRef.current.width = videoWidth;
          canvasRef.current.height = videoHeight;

          const estimationConfig = { flipHorizontal: false };
          const hands = await model.estimateHands(video, estimationConfig);
          const ctx = canvasRef.current.getContext("2d");

          drawHands(hands, ctx);
      }
    };
 
    useEffect(() => {
        const interval = setInterval(detect, 10);
        return () => clearInterval(interval);
        console.log("howdy");
    }, [model]);
  
    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Webcam ref={webcamRef} style={{ position: 'absolute', top: '10px', left: '10px' }} />
            <canvas ref={canvasRef} style={{ position: 'absolute', top: '500px', left: '750px' }} />
        </div>
    ); 
}  
 
export default HandGestureRecognitionComponent;
 

