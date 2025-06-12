import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { NavLink } from "react-router-dom";
import "./Posts.css"; // Import the CSS file
const Manage = () => {
    const { token } = useAuth();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const response = await fetch("http://localhost:3000/api/post/author/posts", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    credentials: "include",
                });

                if (response.ok) {
                    const data = await response.json();
                    setPosts(data);
                } else {
                    setError("Failed to fetch posts");
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
                setError("Network error while fetching posts");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [token]);

    const handleDelete = async (postId) => {
        if (!window.confirm("Are you sure you want to delete this post? This action cannot be undone.")) return;

        try {
            const response = await fetch(`http://localhost:3000/api/post/${postId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                credentials: "include",
            });

            if (response.ok) {
                setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
                // You could add a success message here
            } else {
                alert("Failed to delete the post.");
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred while deleting the post.");
        }
    };

    if (loading) {
        return (
            <div className="manage">
                <div className="manage-container">
                    <h2>Loading your posts... ⏳</h2>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="manage">
                <div className="manage-container">
                    <h2>Error Loading Posts</h2>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="manage">
            <div className="manage-container">
                <h2>Manage Your Posts</h2>
                <p>Here you can view, edit, and manage all your published and draft posts.</p>

                {posts.length === 0 ? (
                    <div className="no-posts">
                        <p>You haven't created any posts yet. <NavLink to="/create">Create your first post!</NavLink></p>
                    </div>
                ) : (
                    <ul>
                        {posts.map((post) => (
                            <li key={post.id}>
                                <div className="post-header">
                                    <div className="post-title">{post.title}</div>
                                    <div className={`post-status ${post.published ? 'published' : 'draft'}`}>
                                        {post.published ? 'Published' : 'Draft'}
                                    </div>
                                </div>
                                <div className="post-content">{post.content}</div>
                                <div className="post-actions">
                                    <NavLink to={`/editpost/${post.id}`} className="edit-link">
                                        Edit Post
                                    </NavLink>
                                    <button 
                                        onClick={() => handleDelete(post.id)} 
                                        className="delete-btn"
                                    >
                                        Delete Post
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Manage;