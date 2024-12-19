import React from 'react'
import "./About.css"
import { Typography } from '@mui/material'


const About = () => {
  return (
    <div className='about'>
      <div className="aboutContainer">
        <Typography>This is a sample </Typography>
      </div>
      <div className="aboutContainer2">
           <div>
            <img src="https://media.licdn.com/dms/image/D5603AQG1flIwEvdqvQ/profile-displayphoto-shrink_400_400/0/1710701878115?e=1728518400&v=beta&t=BPUpc34PAh8dVrWOylvW6JNRKKm9xYADBResiq7YN6o" 
                 alt="kirti" 
                 className='aboutAvatar'/>
            <Typography 
               variant='h4'
               style={{margin: "1vmax 0", color: "black"}}
            >
              Kirti
            </Typography>

            <Typography>Softaware Developer</Typography>
            
            <Typography
                 style={{margin: "1vmax 0"}}>
                  I am a freelancer for now.</Typography>
           </div>
           <div>
              <Typography 
              style={{
                wordSpacing: "5px",
                lineHeight: "50px",
                letterSpacing: "5px",
                textAlign: "right",
              }}>
                Hola Gentle readers, this is me, Kirti.
                Definintely an emotional fool
                Someone who is smart and lazy at a same time, lol.
                Hope you enjoy my site, adios amigo. XOXO
              </Typography>
           </div>
      </div>
    </div>
  )
}

export default About
