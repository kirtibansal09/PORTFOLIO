import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Contact.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { contactUs } from "../../actions/user";
import { FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const {
    loading,
    message: alertMessage,
    error,
  } = useSelector((state) => state.update);

  const contactFormHandler = (e) => {
    e.preventDefault();
    dispatch(contactUs(name, email, message));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "CLEAR_ERRORS" });
    }
    if (alertMessage) {
      toast.success(alertMessage);
      dispatch({ type: "CLEAR_MESSAGE" });
    }
  }, [error, alertMessage, dispatch]);

  return (
    <div className="contact">
      <div className="contactRightBar"></div>

      <div className="contactContainer">
        <div className="contactInfo">
          <Typography variant="h4">Contact Information</Typography>
          <div className="contactInfoItem">
            <FaPhone style={{ marginRight: "10px" }} />
            <a 
              href="tel:+919783201890" 
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <Typography>+91-9783201890</Typography>
            </a>
          </div>
          <div className="contactInfoItem">
            <FaEnvelope style={{ marginRight: "10px" }} />
            <a 
              href="mailto:kirtibansalbikaner@gmail.com" 
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <Typography>kirtibansalbikaner@gmail.com</Typography>
            </a>
          </div>
          <div className="contactInfoItem">
            <FaLinkedin style={{ marginRight: "10px" }} />
            <a 
              href="https://www.linkedin.com/in/kirti-bansal-a065081b4/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <Typography>Kirti Bansal</Typography>
            </a>
          </div>
        </div>

        <form className="contactContainerForm" onSubmit={contactFormHandler}>
          <Typography variant="h4">Send Message</Typography>

          <input
            type="text"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <textarea
            placeholder="Message"
            required
            cols="30"
            rows="10"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <Button variant="contained" type="submit" disabled={loading}>
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
