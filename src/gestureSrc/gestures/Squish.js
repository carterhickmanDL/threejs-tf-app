//Import dependencies 
//import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

import { Finger, FingerCurl, FingerDirection } from '../FingerDescription';
import GestureDescription from '../GestureDescription';


export const squishGesture = new GestureDescription('squish');

//Thumb
squishGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
squishGesture.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 0.9);
squishGesture.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.9);

//Index 
squishGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 0.9);
squishGesture.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 0.9);
squishGesture.addDirection(Finger.Index, FingerDirection.HorizontalRight, 0.9);

for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]){
    squishGesture.addCurl(finger, FingerCurl.FullCurl, 0.9);
    squishGesture.addDirection(finger, FingerDirection.HorizontalRight, 1.0);
    squishGesture.addDirection(finger, FingerDirection.HorizontalLeft, 1.0);
    console.log('squishFinger: ', finger);
}




