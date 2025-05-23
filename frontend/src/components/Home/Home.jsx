import React, { useEffect } from 'react'
import './Home.css';
import * as THREE from "three";
// import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js"
import moonImage from "../../images/moon.jpg"
import venusImage from "../../images/venus.jpg"
import spaceImage from "../../images/space.jpg"
import TimeLine from '../TimeLine/TimeLine';
import { Typography } from '@mui/material';
import {

    SiJavascript,
    SiNodedotjs,
    SiExpress,
    SiCss3,
    SiHtml5,
    SiPython,
    SiGit,
    SiFigma,
} from "react-icons/si";



import { Link } from 'react-router-dom';
import { MouseOutlined } from '@mui/icons-material';

function Home({ timelines, skills }) {
    // Create a default placeholder image URL
    const placeholderImage = "https://via.placeholder.com/300";

    // Safely access skills with fallbacks
    const getImageUrl = (imageObj) => {
        if (imageObj && imageObj.url) {
            return imageObj.url;
        }
        return placeholderImage;
    };

    useEffect(() => {     //in useEffect we will write our threejs code so that it will et rendered only once

        const textureLoader = new THREE.TextureLoader();
        const moonTexture = textureLoader.load(moonImage);
        const venusTexture = textureLoader.load(venusImage);
        const spacetexture = textureLoader.load(spaceImage);



        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.set(4, 4, 8);


        const canvas = document.querySelector(".homeCanvas");
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);



        renderer.outputEncoding = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = -0.5;

        const moonGeometry = new THREE.SphereGeometry(2, 64, 64);  //cube  //html 
        const moonMaterial = new THREE.MeshStandardMaterial({ map: moonTexture }); //css
        const moon = new THREE.Mesh(moonGeometry, moonMaterial);

        const venusGeometry = new THREE.SphereGeometry(3, 64, 64);  //cube  //html 
        const venusMaterial = new THREE.MeshBasicMaterial({ map: venusTexture }); //css
        const venus = new THREE.Mesh(venusGeometry, venusMaterial);
        venus.position.set(8, 5, 5)


        // const ambientLight = new THREE.AmbientLight(0xffffff, 0.01); // Add ambient light
        const pointLight = new THREE.PointLight(0xffffff, 140)  // 3 parameters color, intensity, distance
        const pointLight2 = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(8, 5, 5);
        pointLight2.position.set(-8, -5, -5)





        //  const lightHelper = new THREE.PointLightHelper(pointLight);

        //  const controls = new OrbitControls(camera, renderer.domElement);

        scene.add(moon);
        //  scene.add(lightHelper);
        scene.add(venus);
        scene.add(pointLight);
        scene.add(pointLight2);
        // scene.add(ambientLight); 
        scene.background = spacetexture


        const constSpeed = 0.03
        window.addEventListener("mousemove", (e) => {
            if (e.clientX <= window.innerWidth / 2) {
                moon.rotation.x -= constSpeed;
                moon.rotation.y += constSpeed;
                venus.rotation.x -= constSpeed;
                venus.rotation.y += constSpeed;
                // venus.position.x = -8;
            }

            if (e.clientX > window.innerWidth / 2) {
                moon.rotation.x -= constSpeed;
                moon.rotation.y -= constSpeed;
                venus.rotation.x -= constSpeed;
                venus.rotation.y -= constSpeed;
                // venus.position.x = -8;
            }

            if (e.clientY > window.innerHeight / 2) {
                moon.rotation.x -= constSpeed;
                moon.rotation.y += constSpeed;
                venus.rotation.x -= constSpeed;
                venus.rotation.y += constSpeed;
                // venus.position.x = -8;
            }

            if (e.clientY <= window.innerHeight / 2) {
                moon.rotation.x -= constSpeed;
                moon.rotation.y -= constSpeed;
                venus.rotation.x -= constSpeed;
                venus.rotation.y -= constSpeed;
                // venus.position.x = -8;
            }
        })

        // Add scroll event listener to rotate camera and planets
        window.addEventListener("scroll", () => {
            const scrollY = window.scrollY;
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = scrollY / maxScroll;
            const skillsBox = document.getElementById("homeskillsBox");

            // Rotate camera based on scroll position
            camera.rotation.y = scrollY * 0.003;

            // Also rotate the planets slightly based on scroll
            moon.rotation.y = 0.5 + scrollPercent * Math.PI;
            venus.rotation.y = 0.5 + scrollPercent * Math.PI * 0.8;

            // Move camera slightly backward as user scrolls down
            camera.position.z = 8 + scrollPercent * 2;

            // Add null check before accessing style property
            if (skillsBox) {
                if (window.scrollY > 1500) {
                    skillsBox.style.animationName = "homeSkillsBoxAnimationOn";
                }
                else {
                    skillsBox.style.animationName = "homeSkillsBoxAnimationOff";
                }
            }
        });

        // Handle window resize
        window.addEventListener("resize", () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });


        const animate = () => {   // recursion is used so that it can re render again and again 
            requestAnimationFrame(animate);
            moon.rotation.y += 0.001;
            venus.rotation.y += 0.001;

            // renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.render(scene, camera);
        }


        animate();

        // Cleanup function to remove event listeners when component unmounts
        return () => {
            window.removeEventListener("mousemove", () => { });
            window.removeEventListener("scroll", () => { });
            window.removeEventListener("resize", () => { });
        };

    }, [])
    return (
        <div className='Home'>
            <canvas className='homeCanvas'></canvas>
            <div className="homeCanvasContainer">
                <Typography variant='h1'>
                    <p>K</p>
                    <p>I</p>
                    <p>R</p>
                    <p>T</p>
                    <p>I</p>
                </Typography>

                <div className='homeCanvasBox'>
                    <Typography variant='h2'> DESIGNER </Typography>
                    <Typography variant='h2'> DEVELOPER </Typography>
                    <Typography variant='h2'> STUDENT </Typography>
                    <Typography variant='h2'> FREELANCER </Typography>
                </div>

                <Link to="/projects">VIEW WORK</Link>
            </div>

            <div className="homeScrollBtn">
                <MouseOutlined />
            </div>

            <div className="homeContainer">
                <Typography variant='h3'>TIMELINE</Typography>
                <TimeLine timelines={timelines || []} />
            </div>

            <div className="homeSkills">
                <Typography variant='h3'>SKILLS</Typography>
                <div className="homeCubeSkills">
                    <div className="homeCubeSkillsFaces homeCubeSkillsFace1">
                        <img src={getImageUrl(skills && skills.image1)} alt="Face1" />
                    </div>
                    <div className="homeCubeSkillsFaces homeCubeSkillsFace2">
                        <img src={getImageUrl(skills && skills.image2)} alt="Face2" />
                    </div>
                    <div className="homeCubeSkillsFaces homeCubeSkillsFace3">
                        <img src={getImageUrl(skills && skills.image3)} alt="Face3" />
                    </div>
                    <div className="homeCubeSkillsFaces homeCubeSkillsFace4">
                        <img src={getImageUrl(skills && skills.image4)} alt="Face4" />
                    </div>
                    <div className="homeCubeSkillsFaces homeCubeSkillsFace5">
                        <img src={getImageUrl(skills && skills.image5)} alt="Face5" />
                    </div>
                    <div className="homeCubeSkillsFaces homeCubeSkillsFace6">
                        <img src={getImageUrl(skills && skills.image6)} alt="Face6" />
                    </div>
                </div>

                <div className="cubeShadow"></div>
                <div className="homeskillsBox" id="homeskillsBox">

                    <SiJavascript data-tooltip="JavaScript" />

                    <SiNodedotjs data-tooltip="Node.js" />
                    <SiExpress data-tooltip="Express" />
                    <SiCss3 data-tooltip="CSS3" />
                    <SiHtml5 data-tooltip="HTML5" />
                    <SiPython data-tooltip="Python" />
                    <SiGit data-tooltip="Git" />
                    <SiFigma data-tooltip="Figma" />
                </div>
            </div>
        </div>
    )
}

export default Home
