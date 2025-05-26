import React from 'react'
import "./Footer.css"
import { Typography } from '@mui/material';
import { Link } from "react-router-dom";
import { BsGithub, BsLinkedin } from "react-icons/bs"
import { FaEnvelope } from "react-icons/fa"

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className='footer'>
      <div>
        <Typography variant="h5">About Me</Typography>
        <Typography>
          Hey, my name is Kirti Bansal. I am a Full Stack Developer and a student at NIT Kurukshetra. 
          Passionate about creating elegant solutions to complex problems.
        </Typography>

        <Link to="/contact" className="footerContactBtn">
          <Typography>Get In Touch</Typography>
        </Link>
        
        <Typography variant="caption" style={{ color: 'rgba(255,255,255,0.5)', marginTop: '20px', display: 'block' }}>
          © {currentYear} Kirti Bansal. All rights reserved.
        </Typography>
      </div>
      
      <div>
        <Typography variant="h6" style={{ marginBottom: '20px', fontFamily: "'Josefin Sans', sans-serif", letterSpacing: '1px' }}>
          Connect With Me
        </Typography>
        
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
  )
}

export default Footer;
