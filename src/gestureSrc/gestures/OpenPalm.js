import { Finger, FingerCurl, FingerDirection } from '../FingerDescription';
import GestureDescription from '../GestureDescription';



export const openPalm = new GestureDescription('openPalm');

// thumb:
// - curl: none (must)
// - direction vertical up (best)
// - direction diagonal up left / right (acceptable)
// openPalm.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.9);
// openPalm.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 0.7);
// openPalm.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.7);
// openPalm.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.7);

// all other fingers:
// - curled (best)
// - half curled (acceptable)
// - pointing down is NOT acceptable
for(let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky, Finger.Thumb]) {
  openPalm.addCurl(finger, FingerCurl.NoCurl, 1.0);
  openPalm.addDirection(finger, FingerDirection.VerticalUp, 0.25);
  openPalm.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.25);
  openPalm.addDirection(finger, FingerDirection.DiagonalUpRight, 0.25);
}

// require the index finger to be somewhat left or right pointing
// but NOT down and NOT fully up
// openPalm.addDirection(Finger.Index, FingerDirection.DiagonalUpLeft, 1.0);
// openPalm.addDirection(Finger.Index, FingerDirection.HorizontalLeft, 1.0);
// openPalm.addDirection(Finger.Index, FingerDirection.HorizontalRight, 1.0);
// openPalm.addDirection(Finger.Index, FingerDirection.DiagonalUpRight, 1.0);


