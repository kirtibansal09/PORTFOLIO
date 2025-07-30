import React from 'react'
import './Projects.css'
import {Button, Typography} from '@mui/material'
import {AiOutlineProject} from 'react-icons/ai';
import { Delete } from '@mui/icons-material';
import {FaRegSmileWink} from "react-icons/fa"

export const ProjectCard = ({
  url,
  projectImage,
  projectTitle,
  description,
  technologies,
  isAdmin = false,
  onDelete,
  id,
}) => {
  return(
    <>
     <a href={url} className='projectCard' target='black'>
      <div>
        <img src={projectImage} alt="Project" />
        <Typography variant='h5'>{projectTitle}</Typography>
      </div>

      <div>
        <Typography variant='h4'>{projectTitle}</Typography>
        <Typography>{description}</Typography>
        <Typography variant='h6' className="techStack">
          {(Array.isArray(technologies) 
            ? technologies 
            : (technologies || "").split(',')
          ).map((tech, idx) => (
            <span className="techChip" key={idx}>{tech.trim()}</span>
          ))}
        </Typography>
      </div>
   
     </a>

     {isAdmin && (
      <Button 
        style={{color: "rgba(40,40,40, 0.7)"}}
        onClick={onDelete}
      >
        <Delete/>
      </Button>
     )}
    </>
  )
}

const Projects = ({projects}) => {

  return (
    <div className='projects'>
      <Typography variant = 'h3'>Projects <AiOutlineProject/></Typography>

      <div className="projectsWrapper">
        {projects.map((item) => (
          <ProjectCard
          id={item._id}
          key={item._id}
          url ={item.url}
          projectImage = {item.image.url}
          projectTitle = {item.title}
          description = {item.description}
          technologies = {item.techStack}
          isAdmin = {false}
          />
        ))}
      </div>

      <Typography variant='h3' style={{font: "100 1.2rem 'Ubuntu Mono'"}}>
        All the Projects Shown Above are Made By Me <FaRegSmileWink/>
      </Typography>
    </div>
  )
}

export default Projects
