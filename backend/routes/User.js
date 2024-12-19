import express from "express";
import { addProject, addTimeline, addYoutube, contact, deleteProject, deleteTimeline, deleteYoutube, getUser, login, logout, myProfile, updateUser } from "../controller/User.js";
import { isauthenticated } from "../middlewares/auth.js";

export const userRouter = express.Router();

userRouter.route("/login").post(login);

userRouter.route("/logout").get(logout);

userRouter.route("/user").get(getUser);

userRouter.route("/me").get(isauthenticated, myProfile);

userRouter.route("/admin/update").put(isauthenticated, updateUser);

userRouter.route("/admin/timeline/add").post(isauthenticated, addTimeline);
userRouter.route("/admin/youtube/add").post(isauthenticated, addYoutube);
userRouter.route("/admin/project/add").post(isauthenticated, addProject);

userRouter.route("/admin/timeline/:id").delete(isauthenticated, deleteTimeline);
userRouter.route("/admin/Youtube/:id").delete(isauthenticated, deleteYoutube);
userRouter.route("/admin/Project/:id").delete(isauthenticated, deleteProject);

userRouter.route("/contact").post(contact);