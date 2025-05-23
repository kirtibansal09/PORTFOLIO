import { sendMail } from "../middlewares/sendMail.js";
import {User}  from "../model/User.js";
import jwt from "jsonwebtoken";
import cloudinary from "cloudinary"

export const login = async(req, res) => {
    try {
        const { email, password} = req.body;
        
        const user = await User.findOne({email, password});
        
        if(!user){
            return res
            .status(400).json({
                success: false,
                message: "Invalid email or password",
            })
        }    
        const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET);

        res
        .status(200)
        .cookie("token", token, {
            expires: new Date(Date.now()+ 600000),
            httpOnly: true,
        }).json({
            success: true,
            message: "Logged In Successfully"
        })
    }
    catch (error) 
    {
        return res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}

export const logout = async(req, res) => {
    try {
       

        res
        .status(200)
        .cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        }).json({
            success: true,
            messsage: "Logged Out Successfully"
        })
    }
    catch (error) 
    {
        return res.status(400).json({
            success: false,
            message: error.message,
        })
    };
}


export const getUser = async(req, res)=>{
    try {
        const user = await User.findOne().select("-password -email");   // so that our email password does not shows

        res.status(200).json({
            success:true,
            user,
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

export const myProfile = async(req, res)=>{
    try {
        const user = await User.findById(req.user._id);   // so that our email password does not shows

        res.status(200).json({
            success:true,
            user,
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

export const contact = async(req,res) => {
    try {
        
        const{name,email,message} = req.body;
        const userMessage = `Hey I am ${name}. My email is ${email}. My message is ${message}.`;

        await sendMail(userMessage);

        return res.status(200).json({
            successs:true,
            message:"Message sent successfully. "
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

export const updateUser = async(req, res)=>{
    try {
        const user = await User.findById(req.user._id);

        const {name, email, password, skills, about} = req.body;

        if(name){
            user.name = name;
        }
        if(email){
            user.email = email;
        }
        if(password){
            user.password = password;
        }
        if(skills){
            if(skills.image1){
                // await cloudinary.v2.uploader.destroy(user.skills.image1.public_id);
                const myCloud = await cloudinary.v2.uploader.upload(skills.image1,{
                    folder: "portfolio",
                })

                user.skills.image1 = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                }
            }

            if(skills.image2){
                // await cloudinary.v2.uploader.destroy(user.skills.image2.public_id);
                const myCloud = await cloudinary.v2.uploader.upload(skills.image2,{
                    folder: "portfolio",
                })

                user.skills.image2 = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                }
            }

            if(skills.image3){
                // await cloudinary.v2.uploader.destroy(user.skills.image3.public_id);
                const myCloud = await cloudinary.v2.uploader.upload(skills.image3,{
                    folder: "portfolio",
                })

                user.skills.image3 = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                }
            }

            if(skills.image4){
                // await cloudinary.v2.uploader.destroy(user.skills.image4.public_id);
                const myCloud = await cloudinary.v2.uploader.upload(skills.image4,{
                    folder: "portfolio",
                })

                user.skills.image4 = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                }
            }

            if(skills.image5){
                // await cloudinary.v2.uploader.destroy(user.skills.image5.public_id);
                const myCloud = await cloudinary.v2.uploader.upload(skills.image5,{
                    folder: "portfolio",
                })

                user.skills.image5 = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                }
            }

            if(skills.image6){
                // await cloudinary.v2.uploader.destroy(user.skills.image6.public_id);
                const myCloud = await cloudinary.v2.uploader.upload(skills.image6,{
                    folder: "portfolio",
                })

                user.skills.image6 = {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                }
            }
        }

        if(about){
            if (!user.about) {
                user.about = {};
            }
            if (about.name) {
                user.about.name = about.name;
              }
              if (about.title) {
                user.about.title = about.title;
              }
              if (about.subtitle) {
                user.about.subtitle = about.subtitle;
              }
        
              if (about.description) {
                user.about.description = about.description;
              }
              if (about.quote) {
                user.about.quote = about.quote;
              }

            if(about.avatar){
                //await cloudinary.v2.uploader.destroy(user.about.avatar.public_id);
                const myCloud = await cloudinary.v2.uploader.upload(about.avatar, {
                    folder:"portfolio",
                });
                user.about.avatar ={
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                }
            }
        }
        console.log("User object before save:", user);

        await user.save();

        res.status(200).json({
            success:true,
            message:"User updated successfully",
        })
    } 
    
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

export const addTimeline = async(req, res)=>{
    try {
        const {title, description, date} = req.body;
        const user = await User.findById(req.user._id); 

        user.timeline.unshift({
            title,
            description, 
            date,
        });

        await user.save();

        res.status(200).json({
            success:true,
            message: "Added to timeline"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

export const addYoutube = async(req, res)=>{
    try {
        const {url, title, image} = req.body;
        const user = await User.findById(req.user._id); 

        const myCloud = await cloudinary.v2.uploader.upload(image,{
            folder:"portfolio",
        })

        user.youtube.unshift({
            url,
            title, 
            image:{
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            },
        });

        await user.save();

        res.status(200).json({
            success:true,
            message: "Added to Youtube"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

export const addProject = async(req, res)=>{
    try {
        const {url, title, image, description, techStack} = req.body;
        const user = await User.findById(req.user._id); 

        const myCloud = await cloudinary.v2.uploader.upload(image,{
            folder:"portfolio",
        })

        user.projects.unshift({
            url,
            title, 
            description,
            techStack,
            image:{
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            },
        });

        await user.save();

        res.status(200).json({
            success:true,
            message: "Added to Projects"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

export const deleteTimeline = async(req, res) => {
  try {
    const { id } = req.params;
    console.log("Backend received delete request for timeline ID:", id);
    
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if the timeline item exists before filtering
    const timelineItem = user.timeline.find(item => item._id.toString() === id);
    if (!timelineItem) {
      return res.status(404).json({
        success: false,
        message: "Timeline item not found",
      });
    }

    // Filter out the timeline item with the matching ID
    user.timeline = user.timeline.filter(item => item._id.toString() !== id);
    
    await user.save();
    
    console.log("Timeline item deleted successfully");
    
    res.status(200).json({
      success: true,
      message: "Deleted from timeline"
    });
  } catch (error) {
    console.error("Error in deleteTimeline:", error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

export const deleteYoutube = async(req, res)=>{
    try {
        const {id} = req.params;
        const user = await User.findById(req.user._id); 

        const video = user.youtube.filter((video)=>video._id !== id);
        await cloudinary.v2.uploader.destroy(video.image.public_id);

        user.youtube= user.youtube.filter((video)=>video._id !== id);

        await user.save();

        res.status(200).json({
            success:true,
            message: "Deleted from Youtube"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

export const deleteProject= async(req, res)=>{
    try {
        const {id} = req.params;
        const user = await User.findById(req.user._id); 

        // Find the project to delete first
        const project = user.projects.find((item) => item._id.toString() === id);
        
        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }
        
        // Delete image from cloudinary if it exists
        if (project.image && project.image.public_id) {
            await cloudinary.v2.uploader.destroy(project.image.public_id);
        }

        // Filter out the project with the matching ID
        user.projects = user.projects.filter((item) => item._id.toString() !== id);

        await user.save();

        res.status(200).json({
            success: true,
            message: "Deleted from Projects"
        });
    } catch (error) {
        console.error("Error in deleteProject:", error);
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}
