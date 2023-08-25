//Import dependencies 
//import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

import { Finger, FingerCurl, FingerDirection } from '../FingerDescription';
import GestureDescription from '../GestureDescription';


export const closedFist = new GestureDescription('closedFist');

//Thumb
closedFist.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0);
closedFist.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.9);
closedFist.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.9);

//Index 
closedFist.addCurl(Finger.Index, FingerCurl.NoCurl, 0.9);
closedFist.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 0.9);
closedFist.addDirection(Finger.Index, FingerDirection.HorizontalRight, 0.9);

for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky, Finger.Index]){
    closedFist.addCurl(finger, FingerCurl.FullCurl, 0.9);
    // closedFist.addDirection(finger, FingerDirection.HorizontalRight, 1.0);
    // closedFist.addDirection(finger, FingerDirection.HorizontalLeft, 1.0);
}




