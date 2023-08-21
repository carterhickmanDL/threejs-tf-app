import React, { useRef, useState, useEffect } from "react";
import * as fp from "fingerpose";
import { squishGesture } from "./Squish";
import victory from "./victory.png";
import thumbs_up from "./thumbs_up.png";



// Points for fingers
const fingerJoints = {
    thumb: [0, 1, 2, 3, 4],
    indexFinger: [0, 5, 6, 7, 8],
    middleFinger: [0, 9, 10, 11, 12],
    ringFinger: [0, 13, 14, 15, 16],
    pinky: [0, 17, 18, 19, 20],
  };
  
  // Infinity Gauntlet Style
  const style = {
    0: { color: "white", size: 1},
    1: { color: "white", size: 1 },
    2: { color: "white", size: 1 },
    3: { color: "white", size: 1 },
    4: { color: "white", size: 1 },
    5: { color: "white", size: 1 },
    6: { color: "white", size: 1 },
    7: { color: "white", size: 1 },
    8: { color: "white", size: 1 },
    9: { color: "white", size: 1 },
    10: { color: "white", size: 1 },
    11: { color: "white", size: 1 },
    12: { color: "white", size: 1 },
    13: { color: "white", size: 1 },
    14: { color: "white", size: 1 },
    15: { color: "white", size: 1 },
    16: { color: "white", size: 1 },
    17: { color: "white", size: 1 },
    18: { color: "white", size: 1 },
    19: { color: "white", size: 1 },
    20: { color: "white", size: 1 },
  
};

async function detectGesture(hand) {
    const GE = new fp.GestureEstimator([
        fp.Gestures.VictoryGesture,
        fp.Gestures.ThumbsUpGesture,
        squishGesture
    ]);
    const gesture = await GE.estimate(hand.keypoints, 4);
    console.log(hand.keypoints);
    //console.log(gesture);

    if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
        const confidence = gesture.gestures.map(
            (prediction) => prediction.confidence
        );
        const maxConfidence = confidence.indexOf(
            Math.max.apply(null, confidence)
        );

        if (maxConfidence !== -1) { // Check if a valid index is found
            const predictedGesture = gesture.gestures[maxConfidence];
            if (predictedGesture.name !== undefined) { // Check if 'name' property is defined
                console.log(predictedGesture.name);
            } else {
                console.log("Predicted gesture has no 'name' property.");
            }
        } else {
            console.log("No valid gestures found.");
        }
    }
}


export const drawHands = (hands, ctx, emoji) => {
    hands.forEach((hand) => {
        
        const landmarks = hand.keypoints;
        if ((landmarks !== undefined) && landmarks.length > 0) {
            detectGesture(hand);
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


