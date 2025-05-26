import React from 'react'
import {ReactNavbar} from 'overlay-navbar'
import logo from "../../images/K.png"
import {FaUserAlt} from "react-icons/fa"
function Header() {
  return (
   <ReactNavbar
    navColor1="white"
    navColor2 = "hsl(250, 48%, 8%)"  //dark blue color
    burgerColor = "hsl(102,63.1%,59.6%)"
    logo={logo}
    logoWidth = "250px"
    burgerColorHover= "	hsl(102,63.1%,49.6%)"
    nav2justifyContent = "space-around"
    nav3justifyContent = "space-around"
    link1Text = "Home"
    link2Text = "About"
    link3Text = "Projects"
    link4Text = "Contact"  
    link1Url = "/"
    link2Url = "about"
    link3Url = "projects"
    link4Url = "contact"
    link1ColorHover = "white"
    link1Color = "hsl(32.4,40.2%,52.2%)"
    link1Size = "1.5rem"
    link1Padding = "3vmax"
    profileIcon={true}
    ProfileIconElement ={FaUserAlt}
    profileIconColor = "hsl(32.4,40.2%,52.2%)"
    profileIconColorHover = "white"




    />
  )
}

export default Header
