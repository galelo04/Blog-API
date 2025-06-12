import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { NavLink } from "react-router-dom";
import "./Posts.css"; // Import the CSS file

const Posts = () => {
  const { token } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/api/post/published", {
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
          console.error("Failed to fetch posts", token);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [token]);

  // Helper function to get author initials
  const getAuthorInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Helper function to truncate content
  const truncateContent = (content, maxLength = 200) => {
    if (content.length <= maxLength) return content;
    return content.slice(0, maxLength) + '...';
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="posts-page">
        <div className="posts-container">
          <div className="posts-loading">
            <div className="loading-spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="posts-page">
      <div className="posts-container">
        {/* Page Header */}
        <div className="posts-header">
          <h1 className="posts-title">✨ Blog Posts</h1>
          <p className="posts-subtitle">Discover amazing stories and insights from our community</p>
        </div>

        {/* Posts Content */}
        {posts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📚</div>
            <p className="empty-message">No posts available yet. Check back soon for amazing content!</p>
          </div>
        ) : (
          <ul className="posts-grid">
            {posts.map((post, index) => (
              <li key={post.id} className="post-card" style={{ animationDelay: `${index * 0.1}s` }}>
                {/* Author Info */}
                <div className="post-author">
                  <div className="author-avatar">
                    {getAuthorInitials(post.author.name)}
                  </div>
                  <div>
                    <div className="author-name">{post.author.name}</div>
                    <div className="author-badge">Author</div>
                  </div>
                </div>

                {/* Post Content */}
                <h3 className="post-title">{post.title}</h3>
                <p className="post-content">{truncateContent(post.content)}</p>

                {/* Post Actions */}
                <div className="post-actions">
                  <NavLink to={`/post/${post.id}`} className="read-more-btn">
                    <span>Read More</span>
                    <span>📖</span>
                  </NavLink>
                  
                  <div className="post-meta">
                    <div className="meta-item">
                      <span className="meta-icon">📅</span>
                      <span>{formatDate(post.createdAt || new Date())}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-icon">💬</span>
                      <span>{post.comments?.length || 0}</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Posts;