import { Finger, FingerCurl, FingerDirection } from '../FingerDescription';
import GestureDescription from '../GestureDescription';

export const fingerUp = new GestureDescription('fingerUp');

// all other fingers:
// - curled (best)
// - half curled (acceptable)
// - pointing down is NOT acceptable
fingerUp.addCurl(Finger.Index, FingerCurl.NoCurl, 0.9);
fingerUp.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.25);
fingerUp.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 0.25);
fingerUp.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 0.25);

for(let finger of [Finger.Middle, Finger.Ring, Finger.Pinky, Finger.Thumb]) {
    fingerUp.addCurl(finger, FingerCurl.FullCurl, 0.75);
}

// require the index finger to be somewhat left or right pointing
// but NOT down and NOT fully up
// openPalm.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0);
// openPalm.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 1.0);
// openPalm.addDirection(Finger.Index, FingerDirection.HorizontalRight, 1.0);
// openPalm.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.0);


