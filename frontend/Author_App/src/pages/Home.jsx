// AuthorApp Home Component (for authors)
import { NavLink } from "react-router-dom";
import { useAuth } from "../AuthContext.jsx";
import "./Home.css";

const Home = () => {
    const { user, token, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="home-page author-theme">
            <div className="home-container">
                <div className="hero-section">
                    <h1 className="hero-title">Welcome to the Author App</h1>
                    <div className="hero-icon">✍️</div>
                </div>

                {token ? (
                    <div className="authenticated-content">
                        <div className="welcome-card author-card">
                            <div className="user-avatar author-avatar">
                                <span>{user.name.charAt(0).toUpperCase()}</span>
                            </div>
                            <div className="welcome-text">
                                <h2>Hello, {user.name}!</h2>
                                <p className="user-role">Author Account</p>
                            </div>
                            <button onClick={handleLogout} className="logout-btn">
                                <span>🚪</span> Logout
                            </button>
                        </div>

                        <div className="feature-card author-feature">
                            <div className="feature-icon">🚀</div>
                            <h3>Your Writing Journey Starts Here</h3>
                            <p>This is your creative workspace to manage and share your stories with the world. Create, edit, and publish your thoughts.</p>
                        </div>

                        <div className="action-grid">
                            <div className="action-card create-card">
                                <div className="action-icon">📝</div>
                                <h4>Create New Post</h4>
                                <p>Start writing your next masterpiece. Share your thoughts, stories, and insights with your readers.</p>
                                <NavLink to='/create' className="action-button create-btn">
                                    <span>✨</span> Create Post
                                </NavLink>
                            </div>

                            <div className="action-card manage-card">
                                <div className="action-icon">📚</div>
                                <h4>Manage Posts</h4>
                                <p>Edit, update, or delete your existing posts. Keep your content fresh and engaging.</p>
                                <NavLink to='/manage' className="action-button manage-btn">
                                    <span>⚙️</span> Manage Posts
                                </NavLink>
                            </div>
                        </div>

                        <div className="inspiration-card">
                            <div className="inspiration-icon">💡</div>
                            <h3>Happy Writing!</h3>
                            <p>Remember, every great author started with a single word. Your voice matters, and your stories have the power to inspire, educate, and entertain. Enjoy your writing journey!</p>
                        </div>

                        <div className="stats-grid author-stats">
                            <div className="stat-item">
                                <div className="stat-number">📊</div>
                                <div className="stat-label">Track Performance</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number">💬</div>
                                <div className="stat-label">Engage Readers</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number">🌟</div>
                                <div className="stat-label">Build Following</div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="unauthenticated-content">
                        <div className="login-prompt-card author-prompt">
                            <div className="prompt-icon">🔐</div>
                            <h3>Join Our Author Community</h3>
                            <p>Sign in to start your writing journey. Create, publish, and manage your posts with our powerful authoring tools.</p>
                            
                            <div className="auth-buttons">
                                <NavLink to='/login' className="auth-btn primary">
                                    <span>🚀</span> Login
                                </NavLink>
                                <NavLink to='/register' className="auth-btn secondary">
                                    <span>✍️</span> Register
                                </NavLink>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;