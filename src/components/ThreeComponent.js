// ExampleComponent.js
import React, { useEffect } from 'react';
import * as THREE from 'three';

function ThreeComponent() {
    useEffect(() => {
        // Set up your Three.js scene here
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(/*...*/);
        const renderer = new THREE.WebGLRenderer(/*...*/);
        // ...

        // Add your Three.js logic and rendering here

        // Clean up Three.js resources when component unmounts
        return () => {
            // Dispose of Three.js resources
        };
    }, []);

    return (
        <div>
            {/* Render Three.js scene */}
        </div>
    );
}

export default ThreeComponent;
