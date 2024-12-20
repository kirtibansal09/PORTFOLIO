import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Contact from './components/Contacts/Contact';
import Login from './components/Login/Login';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from './actions/user';



function App() {
  const dispatch = useDispatch();
  useEffect(() => {
   dispatch(getUser());
  }, [dispatch])
  
  return (
  <Router>

    <Header/>
    <Routes>
      <Route path="/" element ={<Home/>}/>
      <Route path="/about" element ={<About/>}/>
      <Route path="/projects" element ={<Projects/>}/>
      <Route path="/contact" element ={<Contact/>}/>
      <Route path="/account" element ={<Login/>}/>
      
    </Routes>

    <Footer/>
  </Router>
  );
}

export default App;
