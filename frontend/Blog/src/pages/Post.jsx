import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "./Post.css"; // Import the CSS file

const Post = () => {
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [commentLoading, setCommentLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    const { token } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function getPost() {
            try {
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
                }
            } catch (error) {
                console.error("Error fetching post:", error);
            }
        }

        async function getComments() {
            try {
                const response = await fetch(`http://localhost:3000/api/comment/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    credentials: "include",
                });
                if (response.ok) {
                    const data = await response.json();
                    setComments(data);
                }
            } catch (error) {
                console.error("Error fetching comments:", error);
            } finally {
                setLoading(false);
            }
        }

        getPost();
        getComments();
    }, [id, token]);

    // Helper function to get author initials
    const getAuthorInitials = (name) => {
        if (!name) return "?";
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    // Helper function to format date
    const formatDate = (dateString) => {
        if (!dateString) return "Recently";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Show message function
    const showMessage = (text, type) => {
        setMessage({ text, type });
        setTimeout(() => {
            setMessage({ text: '', type: '' });
        }, 3000);
    };

    // Handle comment submission
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        setCommentLoading(true);
        
        const content = e.target.content.value.trim();
        if (!content) {
            showMessage('Please enter a comment', 'error');
            setCommentLoading(false);
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/comment/${post.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ content }),
                credentials: "include",
            });

            if (response.ok) {
                const newComment = await response.json();
                setComments(prevComments => [...prevComments, newComment]);
                e.target.reset();
                showMessage('Comment added successfully!', 'success');
            } else {
                showMessage('Failed to add comment', 'error');
            }
        } catch (error) {
            console.error("Error adding comment:", error);
            showMessage('Error adding comment', 'error');
        } finally {
            setCommentLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="post-page">
                <div className="post-container">
                    <div className="post-loading">
                        <div className="loading-spinner"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="post-page">
            {/* Scroll Progress Bar */}
            <div className="scroll-progress">
                <div className="scroll-progress-bar" style={{ width: '0%' }}></div>
            </div>

            {/* Back Button */}
            <button 
                className="back-button" 
                onClick={() => navigate(-1)}
                aria-label="Go back"
            >
                <span className="back-icon">←</span>
                <span>Back</span>
            </button>

            {/* Share Button */}
            <button 
                className="share-button"
                onClick={() => {
                    if (navigator.share) {
                        navigator.share({
                            title: post.title,
                            url: window.location.href,
                        });
                    } else {
                        navigator.clipboard.writeText(window.location.href);
                        showMessage('Link copied to clipboard!', 'success');
                    }
                }}
                aria-label="Share post"
            >
                📤
            </button>

            {/* Success/Error Messages */}
            {message.text && (
                <div className={`message ${message.type}`}>
                    {message.text}
                </div>
            )}

            <div className="post-container">
                {/* Post Article */}
                <article className="post-article">
                    <header className="post-header">
                        <h1 className="post-title">{post.title}</h1>
                        <div className="post-meta">
                            <div className="meta-item">
                                <span className="meta-icon">👤</span>
                                <span>{post.author?.name || 'Unknown Author'}</span>
                            </div>
                            <div className="meta-item">
                                <span className="meta-icon">📅</span>
                                <span>{formatDate(post.createdAt)}</span>
                            </div>
                            <div className="meta-item">
                                <span className="meta-icon">💬</span>
                                <span>{comments.length} Comments</span>
                            </div>
                        </div>
                    </header>
                    
                    <div className="post-content">
                        {post.content}
                    </div>
                </article>

                {/* Comments Section */}
                <section className="comments-section">
                    <header className="comments-header">
                        <h2 className="comments-title">Comments</h2>
                        <span className="comments-icon">💬</span>
                        <span className="comments-count">{comments.length}</span>
                    </header>

                    {comments && comments.length > 0 ? (
                        <ul className="comments-list">
                            {comments.map((comment, index) => (
                                <li 
                                    key={comment.id} 
                                    className="comment-item"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <p className="comment-content">{comment.content}</p>
                                    <div className="comment-author">
                                        <div className="comment-avatar">
                                            {getAuthorInitials(comment.author?.name)}
                                        </div>
                                        <span>By: {comment.author?.name || 'Anonymous'}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="no-comments">
                            <div className="no-comments-icon">💭</div>
                            <p>No comments yet. Be the first to share your thoughts!</p>
                        </div>
                    )}
                </section>

                {/* Comment Form */}
                <section className="comment-form-section">
                    <header className="form-header">
                        <h3 className="form-title">Add Your Comment</h3>
                        <span className="form-icon">✍️</span>
                    </header>

                    <form className="comment-form" onSubmit={handleCommentSubmit}>
                        <textarea
                            className="comment-input"
                            name="content"
                            placeholder="Share your thoughts about this post..."
                            required
                            disabled={commentLoading}
                        />
                        <button 
                            type="submit" 
                            className="submit-btn"
                            disabled={commentLoading}
                        >
                            {commentLoading ? (
                                <>
                                    <span>Posting...</span>
                                    <span className="submit-icon">⏳</span>
                                </>
                            ) : (
                                <>
                                    <span>Post Comment</span>
                                    <span className="submit-icon">📤</span>
                                </>
                            )}
                        </button>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default Post;