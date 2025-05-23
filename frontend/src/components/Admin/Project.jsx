import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProject, getUser, deleteProject } from "../../actions/user";
import { MdKeyboardBackspace } from "react-icons/md";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProjectCard } from "../Projects/Projects";

const Project = () => {
  const { message, error, loading } = useSelector((state) => state.update);
  const { message: loginMessage } = useSelector((state) => state.login);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    
    // Validate inputs
    if (!title || !url || !description || !techStack || !image) {
      toast.error("Please fill all fields and upload an image");
      return;
    }
    
    // Debug log
    console.log("Submitting form with techStack:", techStack);
    
    try {
      await dispatch(addProject(url, title, image, description, techStack));
      
      // Clear form after successful submission
      setTitle("");
      setUrl("");
      setImage("");
      setDescription("");
      setTechStack("");
      
      // Fetch updated user data
      dispatch(getUser());
      
      toast.success("Project added successfully");
    } catch (err) {
      console.error("Error adding project:", err);
      toast.error("Failed to add project");
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      console.log("Attempting to delete project with ID:", id);
      await dispatch(deleteProject(id));
      toast.success("Project deleted successfully");
      dispatch(getUser());
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project");
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "CLEAR_ERRORS" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "CLEAR_MESSAGE" });
    }
    if (loginMessage) {
      toast.success(loginMessage);
      dispatch({ type: "CLEAR_MESSAGE" });
    }
  }, [error, message, dispatch, loginMessage]);

  // Debug: Log projects when they change
  useEffect(() => {
    if (user && user.projects && user.projects.length > 0) {
      console.log("First project techStack:", user.projects[0].techStack);
    }
  }, [user]);

  return (
    <div className="adminPanel">
      <div className="adminPanelContainer">
        <Typography variant="h4">
          <p>A</p>
          <p>D</p>
          <p>M</p>
          <p>I</p>
          <p style={{ marginRight: "1vmax" }}>N</p>

          <p>P</p>
          <p>A</p>
          <p>N</p>
          <p>E</p>
          <p>L</p>
        </Typography>

        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="adminPanelInputs"
          />
          <input
            type="text"
            placeholder="Link"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="adminPanelInputs"
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="adminPanelInputs"
          />
          <input
            type="text"
            placeholder="Technologies"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            className="adminPanelInputs"
          />
          <input
            type="file"
            onChange={handleImage}
            className="adminPanelFileUpload"
            accept="image/*"
          />

          <Link to="/account">
            BACK <MdKeyboardBackspace />
          </Link>

          <Button type="submit" variant="contained" disabled={loading}>
            Add
          </Button>
        </form>

        <div className="projectContainer">
          {user &&
            user.projects &&
            user.projects.map((item) => (
              <ProjectCard
                key={item._id}
                url={item.url}
                projectImage={item.image.url}
                projectTitle={item.title}
                description={item.description}
                technologies={item.techstack}
                isAdmin={true}
                onDelete={() => handleDeleteProject(item._id)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Project;
