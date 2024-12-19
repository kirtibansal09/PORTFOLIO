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
    SiCplusplus,
    SiReact,
    SiJavascript,
    SiMongodb,
    SiNodedotjs,
    SiExpress,
    SiCss3,
    SiHtml5,
    SiThreedotjs,
  } from "react-icons/si";
import YoutubeCard from '../YoutubeCard/YoutubeCard';



function Home() {

    useEffect(() => {     //in useEffect we will write our threejs code so that it will et rendered only once

        const textureLoader = new THREE.TextureLoader();
        const moonTexture = textureLoader.load(moonImage);
        const venusTexture = textureLoader.load(venusImage);
        const spacetexture = textureLoader.load(spaceImage);

        

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.set(4, 4, 8);


        const canvas = document.querySelector(".homeCanvas");
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true});
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
        

        const constSpeed = 0.01
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




        const animate = () => {   // recursion is used so that it can re render again and again 
            requestAnimationFrame(animate);
            moon.rotation.y += 0.001;
            venus.rotation.y += 0.001;

            // renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.render(scene, camera);
        }


        animate();

    }, [])
    return (
        <div className='Home'>


            <canvas className='homeCanvas'></canvas>

            <div className="homeContainer">
                 <Typography variant='h3'>TIMELINE</Typography>
                 <TimeLine timelines ={[1,2,3,4]}/>
            </div>

            <div className="homeSkills">
            <Typography variant='h3'>SKILLS</Typography>
            <div className="homeCubeSkills">
                <div className="homeCubeSkillsFaces homeCubeSkillsFace1">
                    <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAMAAzAMBIgACEQEDEQH/xAAbAAEBAAIDAQAAAAAAAAAAAAAAAQQGAgMFB//EADMQAQACAQIEBAMHAwUAAAAAAAABAgMEEQUSITEGIkFRMmFxExSBkbHB8EKh0QcVM2Jy/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APhoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACygAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACggOVbzWNo/QHEAAAAAAAAAAF237Agpt8wIiZ9OkIvZAHKK80xEerisT7ggKCAAAAAAAAAACkxsCAAA79Jp76rU49PijfJktFag7uHcN1HEtRGDSUm9v6rTG0Vj3mW9cG8HcOwxE6rfV5v+1uXHE/KI6z+bM4bbTcK0uLQaXDExEc2XLPe8+/89GTg4tjw5ebPkjk3iI5a+YHVr64OHUjFo+GaWPS22GP1hganhfD82CMmbh+HH9rG28+W0WZuu45lx3vXSTSK367xvuxPu2q4jFc3LaZmdo3npP0B4mu8GWvi+14bm5p9MWTvb6S1PLjvhyWx5KzW9Z2msx1iX1nTaXU4Yw4tRa0xvty0jea+zyvH/hybaP/AHHFSIzY43ydNptT/MA+cCz36ICiAAAAAAqAAAA5TPSY9JncHFZmZ7oAAANl8F0xY8+r1uSP+LFyY99vit6x+H6tae/4fyR93yY9++SJn8gbdo8tKW5814579Zr3mGBmi85fPvaLT0nbaGDi1FpyWms7Tu9iurpbT5K2iZmNp5vmBXhubJFZw+eI8tonpMS2LhPBdXhxYZjPFa2iZvHpWWFwHPh0nJ5rXy5o3nfrs96M0THLXefLvPT+fIHRg4bl0l7zbNOSIny7TvEfz9mRxCttXpIreYtWvl/CXZj613jeYtXm/GHC0xEXp3jbafqD4fxnSzoeKajTTG3JfpHtE9f3YTZP9QK0r4n1HJH9Neb67NbAAAAAAAAAABYEAFlAAABm8M1H3fPv6TswlidusdwbNS1eaZrttPZ73D60+xvN7RHTp033+TUNLrYnHMWjedvyehg1teS072raO01noDYtFmnR2vasUm0x237MrFxuMd5plxd+3L7tXrquePhmbe+7Jw6jHe9NqxafimvNPf2B9T0l8WTQ0y1tHmjfaK+roz2x0y7ztGOJ80+0erWKcctiwU+GInbavo17xT4nyZdLfRYc0zbJHLk2nfavrH49voDWvEWvjifHNZrKfBkyTyf+Y6R/aIeas9/dAFQAAAAAAAAAABRAAAFQAWszE9JZOPUx0i8bfOGKoPW0+rxUmLRkiJj3hkTxHSYomaxE2t3mHgoD0dRxXLk8uOZpEdN/V59pm07zO8oAvogAAAAAAAAAAAAAqAAAALsgKIAAACwSCAAAAAAAAAAAAAAAAAoG/l22jv3QAAAAAAAAAAAAAVAAAAWO/VAFlAAAAAAAAAAAAAAAAAAc+byzXav126uAC+iAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//Z" alt="Face1" />
                </div>
                <div className="homeCubeSkillsFaces homeCubeSkillsFace2">
                    <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAMAAzAMBIgACEQEDEQH/xAAbAAEBAAIDAQAAAAAAAAAAAAAAAQQGAgMFB//EADMQAQACAQIEBAMHAwUAAAAAAAABAgMEEQUSITEGIkFRMmFxExSBkbHB8EKh0QcVM2Jy/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APhoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACygAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACggOVbzWNo/QHEAAAAAAAAAAF237Agpt8wIiZ9OkIvZAHKK80xEerisT7ggKCAAAAAAAAAACkxsCAAA79Jp76rU49PijfJktFag7uHcN1HEtRGDSUm9v6rTG0Vj3mW9cG8HcOwxE6rfV5v+1uXHE/KI6z+bM4bbTcK0uLQaXDExEc2XLPe8+/89GTg4tjw5ebPkjk3iI5a+YHVr64OHUjFo+GaWPS22GP1hganhfD82CMmbh+HH9rG28+W0WZuu45lx3vXSTSK367xvuxPu2q4jFc3LaZmdo3npP0B4mu8GWvi+14bm5p9MWTvb6S1PLjvhyWx5KzW9Z2msx1iX1nTaXU4Yw4tRa0xvty0jea+zyvH/hybaP/AHHFSIzY43ydNptT/MA+cCz36ICiAAAAAAqAAAA5TPSY9JncHFZmZ7oAAANl8F0xY8+r1uSP+LFyY99vit6x+H6tae/4fyR93yY9++SJn8gbdo8tKW5814579Zr3mGBmi85fPvaLT0nbaGDi1FpyWms7Tu9iurpbT5K2iZmNp5vmBXhubJFZw+eI8tonpMS2LhPBdXhxYZjPFa2iZvHpWWFwHPh0nJ5rXy5o3nfrs96M0THLXefLvPT+fIHRg4bl0l7zbNOSIny7TvEfz9mRxCttXpIreYtWvl/CXZj613jeYtXm/GHC0xEXp3jbafqD4fxnSzoeKajTTG3JfpHtE9f3YTZP9QK0r4n1HJH9Neb67NbAAAAAAAAAABYEAFlAAABm8M1H3fPv6TswlidusdwbNS1eaZrttPZ73D60+xvN7RHTp033+TUNLrYnHMWjedvyehg1teS072raO01noDYtFmnR2vasUm0x237MrFxuMd5plxd+3L7tXrquePhmbe+7Jw6jHe9NqxafimvNPf2B9T0l8WTQ0y1tHmjfaK+roz2x0y7ztGOJ80+0erWKcctiwU+GInbavo17xT4nyZdLfRYc0zbJHLk2nfavrH49voDWvEWvjifHNZrKfBkyTyf+Y6R/aIeas9/dAFQAAAAAAAAAABRAAAFQAWszE9JZOPUx0i8bfOGKoPW0+rxUmLRkiJj3hkTxHSYomaxE2t3mHgoD0dRxXLk8uOZpEdN/V59pm07zO8oAvogAAAAAAAAAAAAAqAAAALsgKIAAACwSCAAAAAAAAAAAAAAAAAoG/l22jv3QAAAAAAAAAAAAAVAAAAWO/VAFlAAAAAAAAAAAAAAAAAAc+byzXav126uAC+iAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//Z" alt="Face2" />
                </div>
                <div className="homeCubeSkillsFaces homeCubeSkillsFace3">
                    <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAMAAzAMBIgACEQEDEQH/xAAbAAEBAAIDAQAAAAAAAAAAAAAAAQQGAgMFB//EADMQAQACAQIEBAMHAwUAAAAAAAABAgMEEQUSITEGIkFRMmFxExSBkbHB8EKh0QcVM2Jy/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APhoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACygAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACggOVbzWNo/QHEAAAAAAAAAAF237Agpt8wIiZ9OkIvZAHKK80xEerisT7ggKCAAAAAAAAAACkxsCAAA79Jp76rU49PijfJktFag7uHcN1HEtRGDSUm9v6rTG0Vj3mW9cG8HcOwxE6rfV5v+1uXHE/KI6z+bM4bbTcK0uLQaXDExEc2XLPe8+/89GTg4tjw5ebPkjk3iI5a+YHVr64OHUjFo+GaWPS22GP1hganhfD82CMmbh+HH9rG28+W0WZuu45lx3vXSTSK367xvuxPu2q4jFc3LaZmdo3npP0B4mu8GWvi+14bm5p9MWTvb6S1PLjvhyWx5KzW9Z2msx1iX1nTaXU4Yw4tRa0xvty0jea+zyvH/hybaP/AHHFSIzY43ydNptT/MA+cCz36ICiAAAAAAqAAAA5TPSY9JncHFZmZ7oAAANl8F0xY8+r1uSP+LFyY99vit6x+H6tae/4fyR93yY9++SJn8gbdo8tKW5814579Zr3mGBmi85fPvaLT0nbaGDi1FpyWms7Tu9iurpbT5K2iZmNp5vmBXhubJFZw+eI8tonpMS2LhPBdXhxYZjPFa2iZvHpWWFwHPh0nJ5rXy5o3nfrs96M0THLXefLvPT+fIHRg4bl0l7zbNOSIny7TvEfz9mRxCttXpIreYtWvl/CXZj613jeYtXm/GHC0xEXp3jbafqD4fxnSzoeKajTTG3JfpHtE9f3YTZP9QK0r4n1HJH9Neb67NbAAAAAAAAAABYEAFlAAABm8M1H3fPv6TswlidusdwbNS1eaZrttPZ73D60+xvN7RHTp033+TUNLrYnHMWjedvyehg1teS072raO01noDYtFmnR2vasUm0x237MrFxuMd5plxd+3L7tXrquePhmbe+7Jw6jHe9NqxafimvNPf2B9T0l8WTQ0y1tHmjfaK+roz2x0y7ztGOJ80+0erWKcctiwU+GInbavo17xT4nyZdLfRYc0zbJHLk2nfavrH49voDWvEWvjifHNZrKfBkyTyf+Y6R/aIeas9/dAFQAAAAAAAAAABRAAAFQAWszE9JZOPUx0i8bfOGKoPW0+rxUmLRkiJj3hkTxHSYomaxE2t3mHgoD0dRxXLk8uOZpEdN/V59pm07zO8oAvogAAAAAAAAAAAAAqAAAALsgKIAAACwSCAAAAAAAAAAAAAAAAAoG/l22jv3QAAAAAAAAAAAAAVAAAAWO/VAFlAAAAAAAAAAAAAAAAAAc+byzXav126uAC+iAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//Z" alt="Face3" />
                </div>
                <div className="homeCubeSkillsFaces homeCubeSkillsFace4">
                    <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAMAAzAMBIgACEQEDEQH/xAAbAAEBAAIDAQAAAAAAAAAAAAAAAQQGAgMFB//EADMQAQACAQIEBAMHAwUAAAAAAAABAgMEEQUSITEGIkFRMmFxExSBkbHB8EKh0QcVM2Jy/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APhoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACygAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACggOVbzWNo/QHEAAAAAAAAAAF237Agpt8wIiZ9OkIvZAHKK80xEerisT7ggKCAAAAAAAAAACkxsCAAA79Jp76rU49PijfJktFag7uHcN1HEtRGDSUm9v6rTG0Vj3mW9cG8HcOwxE6rfV5v+1uXHE/KI6z+bM4bbTcK0uLQaXDExEc2XLPe8+/89GTg4tjw5ebPkjk3iI5a+YHVr64OHUjFo+GaWPS22GP1hganhfD82CMmbh+HH9rG28+W0WZuu45lx3vXSTSK367xvuxPu2q4jFc3LaZmdo3npP0B4mu8GWvi+14bm5p9MWTvb6S1PLjvhyWx5KzW9Z2msx1iX1nTaXU4Yw4tRa0xvty0jea+zyvH/hybaP/AHHFSIzY43ydNptT/MA+cCz36ICiAAAAAAqAAAA5TPSY9JncHFZmZ7oAAANl8F0xY8+r1uSP+LFyY99vit6x+H6tae/4fyR93yY9++SJn8gbdo8tKW5814579Zr3mGBmi85fPvaLT0nbaGDi1FpyWms7Tu9iurpbT5K2iZmNp5vmBXhubJFZw+eI8tonpMS2LhPBdXhxYZjPFa2iZvHpWWFwHPh0nJ5rXy5o3nfrs96M0THLXefLvPT+fIHRg4bl0l7zbNOSIny7TvEfz9mRxCttXpIreYtWvl/CXZj613jeYtXm/GHC0xEXp3jbafqD4fxnSzoeKajTTG3JfpHtE9f3YTZP9QK0r4n1HJH9Neb67NbAAAAAAAAAABYEAFlAAABm8M1H3fPv6TswlidusdwbNS1eaZrttPZ73D60+xvN7RHTp033+TUNLrYnHMWjedvyehg1teS072raO01noDYtFmnR2vasUm0x237MrFxuMd5plxd+3L7tXrquePhmbe+7Jw6jHe9NqxafimvNPf2B9T0l8WTQ0y1tHmjfaK+roz2x0y7ztGOJ80+0erWKcctiwU+GInbavo17xT4nyZdLfRYc0zbJHLk2nfavrH49voDWvEWvjifHNZrKfBkyTyf+Y6R/aIeas9/dAFQAAAAAAAAAABRAAAFQAWszE9JZOPUx0i8bfOGKoPW0+rxUmLRkiJj3hkTxHSYomaxE2t3mHgoD0dRxXLk8uOZpEdN/V59pm07zO8oAvogAAAAAAAAAAAAAqAAAALsgKIAAACwSCAAAAAAAAAAAAAAAAAoG/l22jv3QAAAAAAAAAAAAAVAAAAWO/VAFlAAAAAAAAAAAAAAAAAAc+byzXav126uAC+iAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//Z" alt="Face4" />
                </div>
                <div className="homeCubeSkillsFaces homeCubeSkillsFace5">
                    <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAMAAzAMBIgACEQEDEQH/xAAbAAEBAAIDAQAAAAAAAAAAAAAAAQQGAgMFB//EADMQAQACAQIEBAMHAwUAAAAAAAABAgMEEQUSITEGIkFRMmFxExSBkbHB8EKh0QcVM2Jy/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APhoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACygAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACggOVbzWNo/QHEAAAAAAAAAAF237Agpt8wIiZ9OkIvZAHKK80xEerisT7ggKCAAAAAAAAAACkxsCAAA79Jp76rU49PijfJktFag7uHcN1HEtRGDSUm9v6rTG0Vj3mW9cG8HcOwxE6rfV5v+1uXHE/KI6z+bM4bbTcK0uLQaXDExEc2XLPe8+/89GTg4tjw5ebPkjk3iI5a+YHVr64OHUjFo+GaWPS22GP1hganhfD82CMmbh+HH9rG28+W0WZuu45lx3vXSTSK367xvuxPu2q4jFc3LaZmdo3npP0B4mu8GWvi+14bm5p9MWTvb6S1PLjvhyWx5KzW9Z2msx1iX1nTaXU4Yw4tRa0xvty0jea+zyvH/hybaP/AHHFSIzY43ydNptT/MA+cCz36ICiAAAAAAqAAAA5TPSY9JncHFZmZ7oAAANl8F0xY8+r1uSP+LFyY99vit6x+H6tae/4fyR93yY9++SJn8gbdo8tKW5814579Zr3mGBmi85fPvaLT0nbaGDi1FpyWms7Tu9iurpbT5K2iZmNp5vmBXhubJFZw+eI8tonpMS2LhPBdXhxYZjPFa2iZvHpWWFwHPh0nJ5rXy5o3nfrs96M0THLXefLvPT+fIHRg4bl0l7zbNOSIny7TvEfz9mRxCttXpIreYtWvl/CXZj613jeYtXm/GHC0xEXp3jbafqD4fxnSzoeKajTTG3JfpHtE9f3YTZP9QK0r4n1HJH9Neb67NbAAAAAAAAAABYEAFlAAABm8M1H3fPv6TswlidusdwbNS1eaZrttPZ73D60+xvN7RHTp033+TUNLrYnHMWjedvyehg1teS072raO01noDYtFmnR2vasUm0x237MrFxuMd5plxd+3L7tXrquePhmbe+7Jw6jHe9NqxafimvNPf2B9T0l8WTQ0y1tHmjfaK+roz2x0y7ztGOJ80+0erWKcctiwU+GInbavo17xT4nyZdLfRYc0zbJHLk2nfavrH49voDWvEWvjifHNZrKfBkyTyf+Y6R/aIeas9/dAFQAAAAAAAAAABRAAAFQAWszE9JZOPUx0i8bfOGKoPW0+rxUmLRkiJj3hkTxHSYomaxE2t3mHgoD0dRxXLk8uOZpEdN/V59pm07zO8oAvogAAAAAAAAAAAAAqAAAALsgKIAAACwSCAAAAAAAAAAAAAAAAAoG/l22jv3QAAAAAAAAAAAAAVAAAAWO/VAFlAAAAAAAAAAAAAAAAAAc+byzXav126uAC+iAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//Z" alt="Face5" />
                </div>
                <div className="homeCubeSkillsFaces homeCubeSkillsFace6">
                    <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAMAAzAMBIgACEQEDEQH/xAAbAAEBAAIDAQAAAAAAAAAAAAAAAQQGAgMFB//EADMQAQACAQIEBAMHAwUAAAAAAAABAgMEEQUSITEGIkFRMmFxExSBkbHB8EKh0QcVM2Jy/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APhoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACygAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACggOVbzWNo/QHEAAAAAAAAAAF237Agpt8wIiZ9OkIvZAHKK80xEerisT7ggKCAAAAAAAAAACkxsCAAA79Jp76rU49PijfJktFag7uHcN1HEtRGDSUm9v6rTG0Vj3mW9cG8HcOwxE6rfV5v+1uXHE/KI6z+bM4bbTcK0uLQaXDExEc2XLPe8+/89GTg4tjw5ebPkjk3iI5a+YHVr64OHUjFo+GaWPS22GP1hganhfD82CMmbh+HH9rG28+W0WZuu45lx3vXSTSK367xvuxPu2q4jFc3LaZmdo3npP0B4mu8GWvi+14bm5p9MWTvb6S1PLjvhyWx5KzW9Z2msx1iX1nTaXU4Yw4tRa0xvty0jea+zyvH/hybaP/AHHFSIzY43ydNptT/MA+cCz36ICiAAAAAAqAAAA5TPSY9JncHFZmZ7oAAANl8F0xY8+r1uSP+LFyY99vit6x+H6tae/4fyR93yY9++SJn8gbdo8tKW5814579Zr3mGBmi85fPvaLT0nbaGDi1FpyWms7Tu9iurpbT5K2iZmNp5vmBXhubJFZw+eI8tonpMS2LhPBdXhxYZjPFa2iZvHpWWFwHPh0nJ5rXy5o3nfrs96M0THLXefLvPT+fIHRg4bl0l7zbNOSIny7TvEfz9mRxCttXpIreYtWvl/CXZj613jeYtXm/GHC0xEXp3jbafqD4fxnSzoeKajTTG3JfpHtE9f3YTZP9QK0r4n1HJH9Neb67NbAAAAAAAAAABYEAFlAAABm8M1H3fPv6TswlidusdwbNS1eaZrttPZ73D60+xvN7RHTp033+TUNLrYnHMWjedvyehg1teS072raO01noDYtFmnR2vasUm0x237MrFxuMd5plxd+3L7tXrquePhmbe+7Jw6jHe9NqxafimvNPf2B9T0l8WTQ0y1tHmjfaK+roz2x0y7ztGOJ80+0erWKcctiwU+GInbavo17xT4nyZdLfRYc0zbJHLk2nfavrH49voDWvEWvjifHNZrKfBkyTyf+Y6R/aIeas9/dAFQAAAAAAAAAABRAAAFQAWszE9JZOPUx0i8bfOGKoPW0+rxUmLRkiJj3hkTxHSYomaxE2t3mHgoD0dRxXLk8uOZpEdN/V59pm07zO8oAvogAAAAAAAAAAAAAqAAAALsgKIAAACwSCAAAAAAAAAAAAAAAAAoG/l22jv3QAAAAAAAAAAAAAVAAAAWO/VAFlAAAAAAAAAAAAAAAAAAc+byzXav126uAC+iAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//Z" alt="Face6" />
                </div>
            </div>

            <div className="cubeShadow"></div>
            <div className="homeskillsBox">
            <SiCplusplus />
          <SiHtml5 />
          <SiCss3 />
          <SiJavascript />
          <SiMongodb />
          <SiExpress />
          <SiReact />
          <SiNodedotjs />
          <SiThreedotjs />
            </div>
            </div>

            <div className="homeYoutube">
                <Typography variant='h3'>YOUTUBE VIDEOS</Typography>
                <div className="homeYoutubeWrapper">
                    <YoutubeCard image="https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg" title='Sample video'/>
                    <YoutubeCard image="https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg" title='Sample video'/>
                    <YoutubeCard image="https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg" title='Sample video'/>
                    <YoutubeCard image="https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg" title='Sample video'/>
                </div>
            </div>
              
        </div>
    )
}



export default Home