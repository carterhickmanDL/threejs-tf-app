import React, { useRef, useState, useEffect } from "react";
import SolarSystemComponent from './components/SolarSystemComponent';
import HandGestureRecognitionComponent from './components/HandGestureRecognitionComponent';


function App() {
    return (
        <div>
            <SolarSystemComponent />
            <HandGestureRecognitionComponent />
        </div>
    );
}

export default App;
