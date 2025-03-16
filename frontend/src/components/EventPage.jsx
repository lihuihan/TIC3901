import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';
import { setEvents } from '@/redux/eventSlice';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import moment from 'moment';
import {
    FaMapMarkerAlt,
    FaClock,
    FaCheckCircle,
    FaRegCalendarCheck
} from 'react-icons/fa';


const EventsPage = () => {
    const dispatch = useDispatch();

    const { events } = useSelector(store => store.event);
    const { user } = useSelector(store => store.auth || {});
    const [isCreating, setIsCreating] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: '',
        description: '',
        location: '',
        dateTime: '',
    });

    // Fetch all events on component mount
    React.useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/v1/event/all', {
                    withCredentials: true
                });
                console.log(res.data)
                console.log("response from be")
                dispatch(setEvents([res.data.events, ...events]));
                console.log("events frontend")
                console.log(events)
            } catch (error) {
                toast.error('Failed to load events');
            }
        };
        fetchEvents();
    }, [dispatch]);

    // Fixed event creation handler
    const createEventHandler = async () => {
        try {
            const res = await axios.post(
                'http://localhost:8000/api/v1/event/create',
                {
                    ...newEvent,
                    author: user._id
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            if (res.data.success) {
                dispatch(setEvents([res.data.event, ...events]));
                console.log("events addded")
                console.log(events)
                toast.success('Event created successfully!');
                setIsCreating(false);
                setNewEvent({
                    title: '',
                    description: '',
                    location: '',
                    dateTime: ''
                });
            }
        } catch (error) {
            console.error('Event creation error:', error);
            toast.error(error.response?.data?.message || 'Error creating event');
        }
    };

    // Event card component
    const EventCard = ({ event }) => {
        const [attending, setAttending] = useState(event?.attendees?.includes(user?._id) || false);
        const [attendeesCount, setAttendeesCount] = useState(event?.attendees?.length || 0);

        const handleAttendance = async () => {
            try {
                const res = await axios.put(
                    `http://localhost:8000/api/v1/event/${event._id}/attend`,
                    null,
                    { withCredentials: true }
                );

                if (res.data.success) {
                    setAttending(!attending);
                    setAttendeesCount(prev => attending ? prev - 1 : prev + 1);
                    dispatch(setEvents(events.map(e =>
                        e._id === event._id ? res.data.event : e
                    )));
                }
            } catch (error) {
                toast.error('Failed to update attendance');
            }
        };

        return (
            <div className='my-4 p-6 bg-white rounded-lg shadow-md'>
                <div className='flex items-center justify-between mb-4'>
                    <div className='flex items-center gap-2'>
                        <img
                            src={event.author?.profilePicture}
                            alt="organizer"
                            className='w-10 h-10 rounded-full'
                        />
                        <div>
                            <h2 className='font-semibold'>{event.title}</h2>
                            <p className='text-sm text-gray-500'>
                                {event.author?.username} • {moment(event.dateTime).fromNow()}
                            </p>
                        </div>
                    </div>
                    {user?._id === event.author?._id && (
                        <button
                            onClick={() => handleDelete(event._id)}
                            className='text-red-500 hover:text-red-700'
                        >
                            Delete
                        </button>
                    )}
                </div>

                <div className='mb-4'>
                    <p className='text-gray-600'>{event.description}</p>
                    <div className='mt-2 flex items-center gap-4 text-sm'>
                        <span className='flex items-center gap-1'>
                            <FaMapMarkerAlt className='text-gray-500' />
                            {event.location}
                        </span>
                        <span className='flex items-center gap-1'>
                            <FaClock className='text-gray-500' />
                            {moment(event.dateTime).format('MMM Do, h:mm A')}
                        </span>
                    </div>
                </div>

                <div className='flex items-center justify-between'>
                    <button
                        onClick={handleAttendance}
                        className={`flex items-center gap-2 ${attending ? 'text-green-600' : 'text-gray-600'
                            }`}
                    >
                        {attending ? <FaCheckCircle /> : <FaRegCalendarCheck />}
                        {attendeesCount} attending
                    </button>
                    <button className='text-blue-600 hover:text-blue-800'>
                        View Details
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className='max-w-4xl mx-auto p-4'>
            {/* Create Event Section */}
            <div className='mb-8 p-6 bg-white rounded-lg shadow-md'>
                <Button
                    onClick={() => setIsCreating(!isCreating)}
                    className='w-full mb-4'
                    variant={isCreating ? 'destructive' : 'default'}
                >
                    {isCreating ? 'Cancel Event Creation' : 'Create New Event'}
                </Button>

                {isCreating && (
                    <div className='space-y-4'>
                        <div>
                            <Label>Event Title *</Label>
                            <Input
                                value={newEvent.title}
                                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <Label>Description</Label>
                            <Input
                                value={newEvent.description}
                                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                            />
                        </div>

                        <div>
                            <Label>Location *</Label>
                            <Input
                                value={newEvent.location}
                                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <Label>Date & Time *</Label>
                            <Input
                                type="datetime-local"
                                value={newEvent.dateTime}
                                onChange={(e) => setNewEvent({ ...newEvent, dateTime: e.target.value })}
                                required
                            />
                        </div>

                        <Button
                            onClick={createEventHandler}
                            className='w-full'
                            disabled={!newEvent.title || !newEvent.location || !newEvent.dateTime}
                        >
                            Create Event
                        </Button>
                    </div>
                )}
            </div>

            {/* Events List */}
            <div className='space-y-6'>
                {/* // EventsPage component rendering */}
                {events?.length > 0 ? (
                    events
                        .filter(event => !Array.isArray(event)) // Filter out array elements
                        .map((event, index) => (
                            <EventCard
                                key={event._id || index} // Use _id if available, else fallback to index
                                event={event}
                                onAttendanceChange={(updatedEvent) => {
                                    const updatedEvents = events.map(e =>
                                        e._id === updatedEvent._id ? updatedEvent : e
                                    );
                                    dispatch(setEvents(updatedEvents));
                                }}
                            />
                        ))
                ) : (
                    <div className='text-center py-8 text-gray-500'>
                        No events found. Create one to get started!
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventsPage;