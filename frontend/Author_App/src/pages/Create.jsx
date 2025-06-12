import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../AuthContext.jsx';
import { useState } from 'react';
import './Posts.css';

const Create = () => {
    const [input, setInput] = useState({
        title: '',
        content: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const { user, token } = useAuth();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInput({ ...input, [name]: value });
    }

    const handleCreatePost = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setMessage({ type: '', text: '' });
        
        try {
            const response = await fetch('http://localhost:3000/api/post/create', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                credentials: 'include',
                body: JSON.stringify(input)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Post created successfully:', data);
                setInput({ title: '', content: '' });
                setMessage({ type: 'success', text: 'Post created successfully! ✨' });
            } else {
                setMessage({ type: 'error', text: 'Error creating post. Please try again.' });
            }
        } catch (error) {
            console.error('Error creating post:', error);
            setMessage({ type: 'error', text: 'Network error. Please check your connection.' });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="create-header">
            {user ? (
                <div className="create">
                    <h1>Create a New Post</h1>
                    <p>Share your thoughts and ideas with the world. Use the form below to create a new post.</p>
                    
                    {message.text && (
                        <div className={`message ${message.type}`}>
                            {message.text}
                        </div>
                    )}
                    
                    <form onSubmit={handleCreatePost}>
                        <div>
                            <label htmlFor="title">Post Title</label>
                            <input 
                                type="text" 
                                id="title" 
                                name="title" 
                                value={input.title} 
                                onChange={handleChange} 
                                placeholder="Enter an engaging title for your post..."
                                required 
                            />
                        </div>
                        <div>
                            <label htmlFor="content">Post Content</label>
                            <textarea 
                                id="content" 
                                name="content" 
                                value={input.content} 
                                onChange={handleChange}
                                placeholder="Write your post content here. Share your story, insights, or ideas..."
                                required
                            ></textarea>
                        </div>
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Creating Post...' : 'Create Post'}
                        </button>
                    </form>
                </div>
            ) : (
                <div className="create">
                    <h1>Please Login to Create a Post</h1>
                    <p>You need to be logged in to create a new post and share your ideas with the community.</p>
                    <p>Please <NavLink to='/login'>Login</NavLink> to continue and start creating amazing content!</p>
                </div>
            )}
        </div>
    );
};

export default Create;