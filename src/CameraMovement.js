
import React, { useRef, useState, useEffect } from 'react';
export let x = 0;
export let y = 0; 
export let z = 5;

export function updateCameraValues(xMod, yMod, zMod) {
    // Update the values in this function or perform any necessary actions
    x += xMod;
    y += yMod;
    z += zMod;
  }

