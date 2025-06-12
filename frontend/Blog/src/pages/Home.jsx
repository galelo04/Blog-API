// BlogApp Home Component (for readers)
import { NavLink } from "react-router-dom";
import { useAuth } from "../AuthContext.jsx";
import "./Home.css";

const Home = () => {
    const { user, token, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="home-page">
            <div className="home-container">
                <div className="hero-section">
                    <h1 className="hero-title">Welcome to the Blog App</h1>
                    <div className="hero-icon">📚</div>
                </div>

                {token ? (
                    <div className="authenticated-content">
                        <div className="welcome-card">
                            <div className="user-avatar">
                                <span>{user.name.charAt(0).toUpperCase()}</span>
                            </div>
                            <div className="welcome-text">
                                <h2>Hello, {user.name}!</h2>
                                <p className="user-role">Reader Account</p>
                            </div>
                            <button onClick={handleLogout} className="logout-btn">
                                <span>🚪</span> Logout
                            </button>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">✨</div>
                            <h3>Discover Amazing Stories</h3>
                            <p>This application is your gateway to explore and engage with authors' posts. Read, comment, and connect with the writing community.</p>
                            
                            <NavLink to='/posts' className="cta-button">
                                <span>📖</span>
                                View Posts
                            </NavLink>
                        </div>

                        <div className="stats-grid">
                            <div className="stat-item">
                                <div className="stat-number">∞</div>
                                <div className="stat-label">Stories to Read</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number">💬</div>
                                <div className="stat-label">Join Discussions</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number">🌟</div>
                                <div className="stat-label">Discover Authors</div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="unauthenticated-content">
                        <div className="login-prompt-card">
                            <div className="prompt-icon">🔐</div>
                            <h3>Join Our Reading Community</h3>
                            <p>Sign in to access exclusive content, comment on posts, and connect with amazing authors.</p>
                            
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