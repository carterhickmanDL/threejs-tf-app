//Import dependencies 
//import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

import { Finger, FingerCurl, FingerDirection } from '../FingerDescription';
import GestureDescription from '../GestureDescription';


export const squish = new GestureDescription('squish');

// //Thumb
squish.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.8);
squish.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 0.6);
squish.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.6);
squish.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.2);
squish.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.2);


//Index 
squish.addCurl(Finger.Index, FingerCurl.HalfCurl, 0.6);
squish.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 0.4);
squish.addDirection(Finger.Index, FingerDirection.HorizontalRight, 0.4);


for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]){
    squish.addCurl(finger, FingerCurl.FullCurl, 0.6);
    //squish.addDirection(finger, FingerDirection.)
}




