//Import dependencies 
//import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

import { Finger, FingerCurl, FingerDirection } from '../FingerDescription';
import GestureDescription from '../GestureDescription';


export const thumbOut = new GestureDescription('thumbOut');

//Thumb
thumbOut.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
thumbOut.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.9);
thumbOut.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 0.9);

for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky, Finger.Index]){
    thumbOut.addCurl(finger, FingerCurl.FullCurl, 1.0);
    // closedFist.addDirection(finger, FingerDirection.HorizontalRight, 1.0);
    // closedFist.addDirection(finger, FingerDirection.HorizontalLeft, 1.0);
}




