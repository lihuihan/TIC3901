import { Event } from "../models/event.model.js";
import { User } from "../models/user.model.js";
import { Comment } from "../models/comment.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const createEvent = async (req, res) => {
    try {
        console.log(req.body)
        const { title, description, dateTime, location,author } = req.body;
       

        if (!title || !dateTime || !location) {
            return res.status(400).json({ 
                message: 'Title, date/time and location are required', 
                success: false 
            });
        }

        const newEvent = new Event({
            title,
            description,
            dateTime,
            location,
            author
        });

          await newEvent.save();
        

        const eve = await User.findByIdAndUpdate(
            author,
            { $addToSet: { events: newEvent._id } },
            { new: true }
        );
        console.log(eve)

        return res.status(201).json({
            message: 'Event created successfully',
            event: await newEvent.populate('author', 'username profilePicture'),
            success: true
        });

    } catch (error) {
        console.error('Event creation error:', error);
        return res.status(500).json({ 
            message: error.message || 'Server error',
            success: false
        });
    }
};

export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find()
            .sort({ dateTime: 1 })
            .populate({ 
                path: 'author', 
                select: 'username profilePicture' 
            })
            .populate({
                path: 'comments',
                sort: { createdAt: -1 },
                populate: {
                    path: 'author',
                    select: 'username profilePicture'
                }
            })
            .populate('attendees', 'username profilePicture');

        return res.status(200).json({
            events,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            message: 'Server error', 
            success: false 
        });
    }
};

export const getUserEvents = async (req, res) => {
    try {
        const userId = req.user._id;
        const events = await Event.find({ author: userId })
            .sort({ dateTime: 1 })
            .populate('attendees', 'username profilePicture')
            .populate({
                path: 'comments',
                populate: {
                    path: 'author',
                    select: 'username profilePicture'
                }
            });

        return res.status(200).json({
            events,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            message: 'Server error', 
            success: false 
        });
    }
};

export const attendEvent = async (req, res) => {
    try {
        const userId = req.user._id;
        const eventId = req.params.id;
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ 
                message: 'Event not found', 
                success: false 
            });
        }

        const attendeeIndex = event.attendees.indexOf(userId);
        if (attendeeIndex === -1) {
            event.attendees.push(userId);
        } else {
            event.attendees.splice(attendeeIndex, 1);
        }

        await event.save();

        // Real-time notification
        const user = await User.findById(userId).select('username profilePicture');
        const eventOwnerId = event.author.toString();
        
        if (eventOwnerId !== userId) {
            const notification = {
                type: 'event_attendance',
                userId,
                userDetails: user,
                eventId,
                message: attendeeIndex === -1 
                    ? 'Someone is attending your event' 
                    : 'Someone left your event'
            };
            
            const ownerSocketId = getReceiverSocketId(eventOwnerId);
            if (ownerSocketId) {
                io.to(ownerSocketId).emit('notification', notification);
            }
        }

        return res.status(200).json({
            message: attendeeIndex === -1 
                ? 'Attendance marked successfully' 
                : 'Attendance removed',
            success: true,
            event: await event.populate('attendees', 'username profilePicture')
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            message: 'Server error', 
            success: false 
        });
    }
};

export const deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const userId = req.user._id;

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ 
                message: 'Event not found', 
                success: false 
            });
        }

        if (!event.author.equals(userId)) {
            return res.status(403).json({ 
                message: 'Unauthorized to delete this event', 
                success: false 
            });
        }

        await Event.findByIdAndDelete(eventId);
        await User.findByIdAndUpdate(
            userId,
            { $pull: { events: eventId } }
        );
        await Comment.deleteMany({ event: eventId });

        return res.status(200).json({
            success: true,
            message: 'Event deleted successfully'
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            message: 'Server error', 
            success: false 
        });
    }
};

export const addEventComment = async (req, res) => {
    try {
        const eventId = req.params.id;
        const userId = req.user._id;
        const { text } = req.body;

        if (!text || text.trim() === '') {
            return res.status(400).json({ 
                message: 'Comment text is required', 
                success: false 
            });
        }

        const comment = await Comment.create({
            text: text.trim(),
            author: userId,
            event: eventId
        });

        await comment.populate({
            path: 'author',
            select: 'username profilePicture'
        });

        await Event.findByIdAndUpdate(
            eventId,
            { $push: { comments: comment._id } }
        );

        return res.status(201).json({
            message: 'Comment added successfully',
            comment,
            success: true
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            message: 'Server error', 
            success: false 
        });
    }
};

export const getEventComments = async (req, res) => {
    try {
        const eventId = req.params.id;
        const comments = await Comment.find({ event: eventId })
            .populate('author', 'username profilePicture')
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            comments
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            message: 'Server error', 
            success: false 
        });
    }
};