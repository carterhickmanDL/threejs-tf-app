import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function SolarSystemComponent() {
    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;
        
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);

        // Create stars
        function createStars() {
            const geometry = new THREE.BufferGeometry();
            const vertices = [];
            for (let i = 0; i < 10000; i++) {
                const x = (Math.random() - 0.5) * 2000;
                const y = (Math.random() - 0.5) * 2000;
                const z = (Math.random() - 0.5) * 2000;
                vertices.push(x, y, z);
            }
            geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
            const material = new THREE.PointsMaterial({ color: 0xFFFFFF, size: 0.05 });
            const stars = new THREE.Points(geometry, material);
            scene.add(stars);

        }

        createStars();

        // Create Earth
        const earthGeometry = new THREE.SphereGeometry(0.5, 32, 32);
        const earthTexture = new THREE.TextureLoader().load(process.env.PUBLIC_URL + '/earth.jpg');
        const earthMaterial = new THREE.MeshBasicMaterial({ map: earthTexture }); 
        const earth = new THREE.Mesh(earthGeometry, earthMaterial);
        scene.add(earth);

        const moonGeometry = new THREE.SphereGeometry(0.33, 32, 32);
        const moonTexture = new THREE.TextureLoader().load(process.env.PUBLIC_URL + '/moon.jpg');
        const moonMaterial = new THREE.MeshBasicMaterial({ map: moonTexture }); 
        const moon = new THREE.Mesh(moonGeometry, moonMaterial);
        moon.position.set(3, 2, -9)
        scene.add(moon);

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);

            // Rotate Earth
            earth.rotation.y += 0.001;

            controls.update();
            renderer.render(scene, camera);
        };

        // Handle window resize
        window.addEventListener('resize', () => {
            const newWidth = window.innerWidth;
            const newHeight = window.innerHeight;

            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(newWidth, newHeight);
        });

        animate();

        return () => {
            // Clean up resources if needed
        };
    }, []);

    return (
        <div></div> // Empty div for Three.js canvas
    );
}

export default SolarSystemComponent;
