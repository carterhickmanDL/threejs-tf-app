//Import dependencies 
import {Finger, FingerCurl, FingerDirection, GestureDescription} from 'fingerpose';

export const squishGesture = new GestureDescription('squish');

//Thumb
squishGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
squishGesture.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 0.10);
squishGesture.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.10);

//Index 
squishGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
squishGesture.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 0.10);
squishGesture.addDirection(Finger.Index, FingerDirection.HorizontalRight, 0.10);

for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]){
    squishGesture.addCurl(finger, FingerCurl.FullCurl, 0.75);
    squishGesture.addDirection(finger, FingerDirection.HorizontalRight, 0.15);
    squishGesture.addDirection(finger, FingerDirection.HorizontalLeft, 0.15);
}




