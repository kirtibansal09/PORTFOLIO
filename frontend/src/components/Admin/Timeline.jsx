import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTimeline, deleteTimeline, getUser } from '../../actions/user';
import { MdKeyboardBackspace } from 'react-icons/md';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {FaTrash} from 'react-icons/fa';

const Timeline = () => {

  const { message, error, loading } = useSelector((state) => state.update)
  const { user } = useSelector((state) => state.user)

  const dispatch = useDispatch();

  const[title,setTitle] = useState("");
  const[description,setDescription] = useState("");
  const[date, setDate] = useState("");


  const submitHandler = async(e) => {
    e.preventDefault();
    await dispatch(addTimeline(title,description,date));
    dispatch(getUser());
  }

  const deleteHandler = async(id) => {
    try {
      await dispatch(deleteTimeline(id));
      await dispatch(getUser());
    } catch (error) {
      console.error("Error deleting timeline item:", error);
    }
  }


  useEffect(() => {
      // console.log("Error:", error);
      console.log("Message:", message);
      console.log("Error", error);
      console.log("LoginMessage", message)
  
      if (error) {
        toast.error(error);
        dispatch({ type: "CLEAR_ERRORS" });
      }
      if (message) {
        toast.success(message);
        dispatch({ type: "CLEAR_MESSAGE" });
      }
  
    }, [error, message, dispatch])
  
  return (
    <div className='adminPanel'>
    <div className="adminPanelContainer">
      <Typography variant='h4'>
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

      <form action="" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='adminPanelInputs'
        />

        <input
          type="text"
          placeholder='Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='adminPanelInputs'
        />

        <input
          type="date"
          placeholder='Date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className='adminPanelInputs'
        />


        

        

        <Link to='/account'>
              BACK <MdKeyboardBackspace />
        </Link>

        <Button type="submit" variant="contained" disabled={loading}>
          Add
        </Button>
      </form>

      <div className="timelineContainer">
        {user && 
        user.timeline &&
        user.timeline.map((item)=>(
          <div key={item._id} className="timelineItem">
            <Typography variant='h6' className="timelineTitle">{item.title}</Typography>
            <Typography variant='body1' className="timelineDescription" style={{letterSpacing: "2px"}}>{item.description}</Typography>
            <Typography variant='body1' className="timelineDate" style={{fontWeight:"600"}}>{item.date.toString().split("T")[0]}</Typography>
            <Button
            className="deleteButton"
            style={{
              margin: "auto",
              display: "block",
              color: "rgba(40,40,40,0.7",
            }} onClick={()=>deleteHandler(item._id)}><FaTrash/></Button>
          </div>
        )
        )}
      </div>
      
    </div>
  </div>
  )
}

export default Timeline
