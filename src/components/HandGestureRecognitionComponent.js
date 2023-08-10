// HandGestureRecognitionComponent.js
import React, { useRef, useState, useEffect } from 'react';
import * as handpose from '@tensorflow-models/handpose';
import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
import * as tf from '@tensorflow/tfjs';
import Webcam from "react-webcam";
import { drawHands } from './Utilities';
import '@tensorflow/tfjs-core';
// Register WebGL backend.
import '@tensorflow/tfjs-backend-webgl';
import '@mediapipe/hands';

//tf.setBackend('cpu');
function HandGestureRecognitionComponent() {
    
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    const runHandpose = async () => {
    const model = handPoseDetection.SupportedModels.MediaPipeHands;
    const detectorConfig = {
    runtime: 'mediapipe', // or 'tfjs',
    solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/hands',
    modelType: 'full'
    }
    const detector = await handPoseDetection.createDetector(model, detectorConfig);
    //console.log(detector);  
    //const net = await handpose.load();
    //net.maxHandsNumber = 2;
    console.log("Handpose model loaded.");
    //  Loop and detect hands
    setInterval(() => {
        detect(detector);
    }, 10);
    };

      const detect = async (net) => {
        if (
            typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null &&
            webcamRef.current.video.readyState === 4
          ) {
            // Get Video Properties
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;
      
            // Set video width
            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;
      
            // Set canvas height and width
            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;
      
            // Make Detections
    
           const estimationConfig = {flipHorizontal: false};
           const hands = await net.estimateHands(video, estimationConfig);
           const ctx = canvasRef.current.getContext("2d");
            
            drawHands(hands, ctx); // Draw all detected hands

          }
      };

      useEffect(()=>{runHandpose()},[]);
    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Webcam ref={webcamRef} style={{ position: 'absolute', top: '10px', left: '10px' }} />
            <canvas ref={canvasRef} style={{ position: 'absolute', top: '1500px', left: '1500px'}} />
        </div> 
    );
}

export default HandGestureRecognitionComponent;

