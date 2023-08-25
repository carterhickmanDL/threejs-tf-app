

import React, { useRef, useState, useEffect } from 'react';
import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
import Webcam from "react-webcam";
import { fingerJoints } from './Utilities';
import { style } from './Utilities';
import '@tensorflow/tfjs-backend-webgl';
import * as fp from "fingerpose";
//import { squishGesture } from "./gestureSrc/gestures/Squish.js";
import victory from "./victory.png";
import thumbs_up from "./thumbs_up.png";
import GestureEstimator from './gestureSrc/GestureEstimator';
import { closedFist } from './gestureSrc/gestures/ClosedFist';
import { openPalm } from './gestureSrc/gestures/OpenPalm';
import { fingerUp } from './gestureSrc/gestures/fingerUp';
import { updateCameraValues } from './CameraMovement';
import { thumbOut } from './gestureSrc/gestures/thumbOut';

function HandGestureRecognitionComponent() {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const [model, setModel] = useState(null);
    const [modelLoaded, setModelLoaded] = useState(false);
    //const [leftHand, setLeftHand] = useState(null);
    let leftHand = null;
    let rightHand = null;
   // const [rightHand, setRightHand] = useState(null);

    const loadModel = async () => {  
        try {
            const loadedModel = await handPoseDetection.createDetector(
                handPoseDetection.SupportedModels.MediaPipeHands, {
                    runtime: 'mediapipe',
                    solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/hands',
                    maxHands: 2
                }
            ); 
            console.log("Handpose model loaded.");
            setModel(loadedModel);
            setModelLoaded(true);
        } catch (error) {
            console.error("Error loading or initializing handpose model:", error);
        } 
  };


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

          const estimationConfig = { flipHorizontal: true};
          const hands = await model.estimateHands(video, estimationConfig);
          const ctx = canvasRef.current.getContext("2d");
          
          drawHands(hands, ctx);
          hands.forEach((hand) => {
            detectGesture(hand);
          });
      }
    };
    
    
     const drawHands = (hands, ctx, emoji) => {
        hands.forEach((hand) => {
            
            const landmarks = hand.keypoints;
    
            if ((landmarks !== undefined) && landmarks.length > 0) {
                // Iterate through finger joints
                for (let j = 0; j < Object.keys(fingerJoints).length; j++) {
                    let finger = Object.keys(fingerJoints)[j];
                    for (let k = 0; k < fingerJoints[finger].length - 1; k++) {
                        const firstJointIndex = fingerJoints[finger][k];
                        const secondJointIndex = fingerJoints[finger][k + 1];
     
                        const firstJoint = landmarks[firstJointIndex];
                        const secondJoint = landmarks[secondJointIndex];
    
                        ctx.beginPath();
                        ctx.moveTo(firstJoint.x, firstJoint.y);
                        ctx.lineTo(secondJoint.x, secondJoint.y);
                        ctx.strokeStyle = "plum";
                        ctx.lineWidth = 4;
                        ctx.stroke();
                    }
                }
    
                // Draw keypoints
                for (let i = 0; i < landmarks.length; i++) {
                    const keypoint = landmarks[i];
                    const x = keypoint.x;
                    const y = keypoint.y;                    
    
                    ctx.beginPath();
                    ctx.arc(x, y, style[i]["size"], 0, 3 * Math.PI);
                    ctx.fillStyle = style[i]["color"];
                    ctx.fill();
                }
                
            }
        });
    };

    const updateHand = (hand, value) => {
        
        if (hand === 'Left'){
            leftHand = value;
        }
        else if (hand === 'Right'){
            rightHand = value;
        }
      };

    async function detectGesture(hand) {

        const knownGestures = [
            //fp.Gestures.VictoryGesture,
            //fp.Gestures.ThumbsUpGesture, 
            //squishGesture, 
            closedFist,
            openPalm,
            fingerUp, 
            //thumbOut
        ]
        
        const GE = new GestureEstimator(knownGestures);
      
        const gesture =  GE.estimate(hand.keypoints3D, 3);
        //console.log('gestures: ', gesture.gestures)
        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
            
            const score = gesture.gestures.map((prediction) => prediction.score);
            console.log('scores: ',score);
            const maxConfidence = score.indexOf(Math.max.apply(null, score));
    
            if (maxConfidence !== -1) { // Check if a valid index is found
                const predictedGesture = gesture.gestures[maxConfidence];
                if (predictedGesture.name !== undefined) { // Check if 'name' property is defined
                   //console.log("Predicted Gesture:");
                    //console.log(hand.handedness, ": ", predictedGesture.name);
                    updateHand(hand.handedness, predictedGesture.name)
                    checkControls();
                } else {
                    console.log("Predicted gesture has no 'name' property.");
                    updateHand(hand.handedness, null)
                }
            } else {
                console.log("No valid gestures found.");
                updateHand(hand.handedness, null)
            }
        } else {
            console.log('No gestures detected.');
            updateHand(hand.handedness, null)
        }
    }



    function checkControls() {
        let xMod = 0;
        let yMod = 0;
        let zMod = 0;
        console.log('Left: ', leftHand);
        console.log('Right: ', rightHand);

        // Combine the two values into a single identifier
        const combinedValue = leftHand + "-" + rightHand;

        switch (combinedValue) {
            //left hand open, right hand closed
        case "openPalm-closedFist":
            // When you have new values for x, y, and z
            zMod = 0.03;
            break;
            //right hand open, left hand closed
        case "closedFist-openPalm":
            zMod = -0.03
            break;
        case "fingerUp-closedFist":
            yMod = 0.03;
            break;
        case "closedFist-fingerUp":
            yMod = -0.03
            break;
        case "thumbOut-closedFist":
            xMod = 0.03;
            break;
        case "closedFist-thumbOut":
            xMod = -0.03;
            break;
        default:
            console.log("No matching combination found.");
        }
        updateCameraValues(xMod, yMod, zMod);
    }

 
    //This callback function will happen every time model changes. This is just to load the model
    useEffect(() => {
        const interval = setInterval(detect, 10);
        console.log("Attempting to load hand model again..");
        return () => clearInterval(interval);
    }, [model]);

    
    useEffect(() => {
    //   console.log("hi");
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

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Webcam ref={webcamRef} style={{ position: 'absolute', top: '10px', left: '10px' }} />
            <canvas ref={canvasRef} style={{ position: 'absolute', top: '500px', left: '750px' }} />
        </div>
    );    
}  
 
export default HandGestureRecognitionComponent;
 

