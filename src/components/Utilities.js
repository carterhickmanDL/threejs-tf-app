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



// Drawing function for multiple hands
export const drawHands = (hands, ctx, emoji) => {
    //console.log('here');
    let x = 0;
    hands.forEach((hand) => {
        x++;
        console.log('hand', x);
        const landmarks = hand.landmarks; 
        //console.log(landmarks);
        if (hand.landmarks && hand.landmarks.length > 0) {
            console.log('well we are here...?');
            const landmarks = hand.landmarks;
            
            for (let j = 0; j < Object.keys(fingerJoints).length; j++) {
                let finger = Object.keys(fingerJoints)[j];
                for (let k = 0; k < fingerJoints[finger].length - 1; k++) {
                    const firstJointIndex = fingerJoints[finger][k];
                    const secondJointIndex = fingerJoints[finger][k + 1];
                    
                    ctx.beginPath();
                    ctx.moveTo(
                        landmarks[firstJointIndex][0],
                        landmarks[firstJointIndex][1]
                    );
                    ctx.lineTo(
                        landmarks[secondJointIndex][0],
                        landmarks[secondJointIndex][1]
                    );
                    ctx.strokeStyle = "plum";
                    ctx.lineWidth = 4;
                    ctx.stroke();
                }
            }

            for (let i = 0; i < landmarks.length; i++) {
                const x = landmarks[i][0];
                const y = landmarks[i][1];
                ctx.beginPath();
                ctx.arc(x, y, style[i]["size"], 0, 3 * Math.PI);
                ctx.fillStyle = style[i]["color"];
                ctx.fill();
            }
        }
    });
};



// // Drawing function
// export const drawHand = (predictions, ctx, emoji) => {
//     // Check if we have predictions
//     if (predictions.length > 0) {
//       // Loop through each prediction
//       predictions.forEach((prediction) => {
//         // Grab landmarks
//         const landmarks = prediction.landmarks;
  
//         // Loop through fingers
//         for (let j = 0; j < Object.keys(fingerJoints).length; j++) {
//           let finger = Object.keys(fingerJoints)[j];
//           //  Loop through pairs of joints
//           for (let k = 0; k < fingerJoints[finger].length - 1; k++) {
//             // Get pairs of joints
//             const firstJointIndex = fingerJoints[finger][k];
//             const secondJointIndex = fingerJoints[finger][k + 1];
  
//             // Draw path
//             ctx.beginPath();
//             ctx.moveTo(
//               landmarks[firstJointIndex][0],
//               landmarks[firstJointIndex][1]
//             );
//             ctx.lineTo(
//               landmarks[secondJointIndex][0],
//               landmarks[secondJointIndex][1]
//             );
//             ctx.strokeStyle = "plum";
//             ctx.lineWidth = 4;
//             ctx.stroke();
//           }
//         }
  
//         // Loop through landmarks and draw em
//         for (let i = 0; i < landmarks.length; i++) {
//           // Get x point
//           const x = landmarks[i][0];
//           console.log('x: ', x);
//           // Get y point
//           const y = landmarks[i][1];
//           console.log('y: ', y);
//           // Start drawing
//           ctx.beginPath();
//           ctx.arc(x, y, style[i]["size"], 0, 3 * Math.PI);
  
//           // Set line color
//           ctx.fillStyle = style[i]["color"];
//           ctx.fill();
//         }
//       });
//     }
// };"
