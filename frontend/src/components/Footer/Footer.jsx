import React from 'react'
import "./Footer.css"
import { Typography } from '@mui/material';
import { Link } from "react-router-dom";
import { BsGithub, BsLinkedin } from "react-icons/bs"
import { FaEnvelope } from "react-icons/fa"

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className='footer'>
      <div>
        <Typography variant="h5">About Me</Typography>
        <Typography>
          Hey, my name is Kirti Bansal. I am a Full Stack Developer and a student at NIT Kurukshetra. 
          Passionate about creating elegant solutions to complex problems.
        </Typography>

        <Link to="/contact" className="footerContactBtn">
          Get In Touch
        </Link>
        
        <Typography variant="caption">
          © {currentYear} Kirti Bansal. All rights reserved.
        </Typography>
      </div>
      
      <div>
        <Typography variant="h6">Connect With Me</Typography>
        <div className="footerSocials">
          <a href="https://github.com/kirtibansal09" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <BsGithub /> 
          </a>
          <a href="https://www.linkedin.com/in/kirti-bansal-a065081b4/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <BsLinkedin />
          </a>
          <Link to="/contact" aria-label="Email">
            <FaEnvelope />
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer;