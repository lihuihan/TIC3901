import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { 
    createEvent,
    getAllEvents,
    getUserEvents,
    attendEvent,
    addEventComment,
    getEventComments,
    deleteEvent
} from "../controllers/event.controller.js";

const router = express.Router();

// Event Creation
router.route("/create").post(isAuthenticated, createEvent);

// Event Feed
router.route("/all").get(isAuthenticated, getAllEvents);

// User's Events
router.route("/user").get(isAuthenticated, getUserEvents);

// Event Attendance
router.route("/:id/attend").put(isAuthenticated, attendEvent);

// Event Comments
router.route("/:id/comment").post(isAuthenticated, addEventComment);
router.route("/:id/comments").get(isAuthenticated, getEventComments);

// Event Deletion
router.route("/delete/:id").delete(isAuthenticated, deleteEvent);

export default router;