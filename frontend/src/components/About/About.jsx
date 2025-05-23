import React from 'react'
import "./About.css"
import { Typography } from '@mui/material'


const About = ({about}) => {
  // Log the about object to see what we're working with
  console.log("About component received:", about);
  
  // Ensure about is an object
  const safeAbout = about || {};
  
  // Create a safe reference to avatar
  const avatarUrl = safeAbout.avatar && safeAbout.avatar.url 
    ? safeAbout.avatar.url 
    : "https://via.placeholder.com/300";
  
  return (
    <div className='about'>
      <div className="aboutContainer">
        <Typography>{safeAbout.quote || "This is a sample quote"}</Typography>
      </div>
      <div className="aboutContainer2">
           <div>
            <img 
              src={avatarUrl} 
              alt="profile" 
              className='aboutAvatar'
              onError={(e) => {
                console.log("Image failed to load, using fallback");
                e.target.src = "https://via.placeholder.com/300";
              }}
            />
            <Typography 
               variant='h4'
               style={{margin: "1vmax 0", color: "black"}}
            >
              {safeAbout.name || "Kirti"}
            </Typography>

            <Typography>{safeAbout.title || "Software Developer"}</Typography>
            
            <Typography
                 style={{margin: "1vmax 0"}}>
                  {safeAbout.subtitle || "I am a freelancer for now."}</Typography>
           </div>
           <div>
              <Typography 
              style={{
                wordSpacing: "5px",
                lineHeight: "50px",
                letterSpacing: "5px",
                textAlign: "right",
              }}>
                {safeAbout.description || "Hola Gentle readers, this is me, Kirti. Definintely an emotional fool Someone who is smart and lazy at a same time, lol. Hope you enjoy my site, adios amigo. XOXO"}
              </Typography>
           </div>
      </div>
    </div>
  )
}

export default About
