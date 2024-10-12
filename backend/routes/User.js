import express from "express";
import { addTimeline, contact, getUser, login, logout, myProfile, updateUser } from "../controller/User.js";
import { isauthenticated } from "../middlewares/auth.js";

export const userRouter = express.Router();

userRouter.route("/login").post(login);

userRouter.route("/logout").get(logout);

userRouter.route("/user").get(getUser);

userRouter.route("/me").get(isauthenticated, myProfile);

userRouter.route("/admin/update").put(isauthenticated, updateUser);

userRouter.route("/admin/timeline/add").post(isauthenticated, addTimeline);

userRouter.route("/contact").post(contact);