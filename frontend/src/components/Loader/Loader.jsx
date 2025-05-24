import React from 'react'
import './Loader.css'
import { Typography } from '@mui/material'

const Loader = () => {
  return (
    <div className="loaderContainer">
      <div className="loaderRing"></div>
      <div className="loaderRing"></div>
      <div className="loaderRing"></div>
      
      <Typography variant="h6" className="loaderText">
        Loading...
      </Typography>
    </div>
  )
}

export default Loader
