import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "./Posts.css"; // Import the CSS file
const EditPost = () => {
    const [post, setPost] = useState({});
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState({ title: false, content: false, publish: false });
    const [messages, setMessages] = useState({ title: '', content: '', publish: '' });
    const { token } = useAuth();
    const { id } = useParams();


    useEffect(() => {
        async function getPost() {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:3000/api/post/author/posts/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    credentials: "include",
                });
                
                if (response.ok) {
                    const data = await response.json();
                    setPost(data);
                    setNewTitle(data.title);
                    setNewContent(data.content);
                } else {
                    console.error("Failed to fetch post");
                }
            } catch (error) {
                console.error("Error fetching post:", error);
            } finally {
                setLoading(false);
            }
        }
        getPost();
    }, [id, token]);

    const updateTitle = async () => {
        setUpdating(prev => ({ ...prev, title: true }));
        setMessages(prev => ({ ...prev, title: '' }));
        
        try {
            const res = await fetch(`http://localhost:3000/api/post/update/title/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                credentials: "include",
                body: JSON.stringify({ title: newTitle }),
            });
            
            if (res.ok) {
                const updated = await res.json();
                setPost(prev => ({ ...prev, title: updated.title }));
                setMessages(prev => ({ ...prev, title: 'Title updated successfully! ✨' }));
            } else {
                setMessages(prev => ({ ...prev, title: 'Failed to update title' }));
            }
        } catch (error) {
            setMessages(prev => ({ ...prev, title: 'Network error occurred' }));
        } finally {
            setUpdating(prev => ({ ...prev, title: false }));
        }
    };

    const updateContent = async () => {
        setUpdating(prev => ({ ...prev, content: true }));
        setMessages(prev => ({ ...prev, content: '' }));
        
        try {
            const res = await fetch(`http://localhost:3000/api/post/update/content/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                credentials: "include",
                body: JSON.stringify({ content: newContent }),
            });
            
            if (res.ok) {
                const updated = await res.json();
                setPost(prev => ({ ...prev, content: updated.content }));
                setMessages(prev => ({ ...prev, content: 'Content updated successfully! ✨' }));
            } else {
                setMessages(prev => ({ ...prev, content: 'Failed to update content' }));
            }
        } catch (error) {
            setMessages(prev => ({ ...prev, content: 'Network error occurred' }));
        } finally {
            setUpdating(prev => ({ ...prev, content: false }));
        }
    };

    const handlePublish = async (postId) => {
        setUpdating(prev => ({ ...prev, publish: true }));
        setMessages(prev => ({ ...prev, publish: '' }));
        
        try {
            const response = await fetch(`http://localhost:3000/api/post/publish/${postId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                credentials: "include",
            });
            
            if (response.ok) {
                setPost(prev => ({ ...prev, published: true }));
                setMessages(prev => ({ ...prev, publish: 'Post published successfully! 🚀' }));
            } else {
                setMessages(prev => ({ ...prev, publish: 'Failed to publish post' }));
            }
        } catch (error) {
            setMessages(prev => ({ ...prev, publish: 'Network error occurred' }));
        } finally {
            setUpdating(prev => ({ ...prev, publish: false }));
        }
    };

    const handleUnpublish = async (postId) => {
        setUpdating(prev => ({ ...prev, publish: true }));
        setMessages(prev => ({ ...prev, publish: '' }));
        
        try {
            const response = await fetch(`http://localhost:3000/api/post/unpublish/${postId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                credentials: "include",
            });
            
            if (response.ok) {
                setPost(prev => ({ ...prev, published: false }));
                setMessages(prev => ({ ...prev, publish: 'Post unpublished successfully! 📝' }));
            } else {
                setMessages(prev => ({ ...prev, publish: 'Failed to unpublish post' }));
            }
        } catch (error) {
            setMessages(prev => ({ ...prev, publish: 'Network error occurred' }));
        } finally {
            setUpdating(prev => ({ ...prev, publish: false }));
        }
    };

    if (loading) {
        return (
            <div className="edit-post-container">
                <div className="edit-post">
                    <div className="edit-header">
                        <h1>Loading post... ⏳</h1>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="edit-post-container">
            <div className="edit-post">
                <div className="edit-header">
                    <h1>Edit Your Post</h1>
                </div>

                <div className="current-post">
                    <h3>Current Post Preview</h3>
                    <div className="current-title">{post.title}</div>
                    <div className="current-content">{post.content}</div>
                </div>

                <div className="publish-section">
                    {messages.publish && (
                        <div className={`message ${messages.publish.includes('successfully') ? 'success' : 'error'}`}>
                            {messages.publish}
                        </div>
                    )}
                    {post.published ? (
                        <button 
                            onClick={() => handleUnpublish(post.id)} 
                            className="unpublish-btn"
                            disabled={updating.publish}
                        >
                            {updating.publish ? 'Unpublishing...' : 'Unpublish Post'}
                        </button>
                    ) : (
                        <button 
                            onClick={() => handlePublish(post.id)} 
                            className="publish-btn"
                            disabled={updating.publish}
                        >
                            {updating.publish ? 'Publishing...' : 'Publish Post'}
                        </button>
                    )}
                </div>

                <div className="edit-forms">
                    <div className="edit-section">
                        <h3>Edit Title</h3>
                        {messages.title && (
                            <div className={`message ${messages.title.includes('successfully') ? 'success' : 'error'}`}>
                                {messages.title}
                            </div>
                        )}
                        <div className="form-group">
                            <label htmlFor="title">Post Title:</label>
                            <input
                                type="text"
                                id="title"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                placeholder="Enter your post title..."
                            />
                            <button 
                                onClick={updateTitle} 
                                className="update-btn"
                                disabled={updating.title || newTitle === post.title}
                            >
                                {updating.title ? 'Updating...' : 'Update Title'}
                            </button>
                        </div>
                    </div>

                    <div className="edit-section">
                        <h3>Edit Content</h3>
                        {messages.content && (
                            <div className={`message ${messages.content.includes('successfully') ? 'success' : 'error'}`}>
                                {messages.content}
                            </div>
                        )}
                        <div className="form-group">
                            <label htmlFor="content">Post Content:</label>
                            <textarea
                                id="content"
                                rows="8"
                                value={newContent}
                                onChange={(e) => setNewContent(e.target.value)}
                                placeholder="Write your post content..."
                            />
                            <button 
                                onClick={updateContent} 
                                className="update-btn"
                                disabled={updating.content || newContent === post.content}
                            >
                                {updating.content ? 'Updating...' : 'Update Content'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPost;