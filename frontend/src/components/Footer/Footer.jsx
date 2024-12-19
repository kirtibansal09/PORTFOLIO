import React from 'react'
import "./Footer.css"
import { Typography } from '@mui/material';
import { Link } from "react-router-dom";
import { BsGithub, BsLinkedin} from "react-icons/bs"

const Footer = () => {
  return (
    <div className='footer'>
      <div>
        <Typography variant="h5">About Me</Typography>
        <Typography>
          Hey, my name is Kirti Bansal. I am a to be Full Stack Developer and a student in NIT Kurukshetra. <b>Enthusiast</b>
        </Typography>

        <Link to="/contact" className="footerContactBtn">
          <Typography>Contact Us</Typography>
        </Link>
      </div>
      <div>
        <Typography variant="h6">Social Media</Typography>
        <a href="https://github.com/kirtibansal09" target='black'>
        <BsGithub/> 
        </a>

        <a href="https://www.linkedin.com/in/kirti-bansal-a065081b4/" target='black'>
        <BsLinkedin/>

        </a>
      </div>

    </div>
  )
}

export default Footer;
