// AppHeader Component
import { useAuth } from "../AuthContext.jsx";
import { NavLink } from "react-router-dom";
import "./Header.css";

const AppHeader = ({ appType = "blog" }) => {
    const { user, token } = useAuth();
    
    return (
        <header className={`app-header ${appType}-header`}>
            <div className="header-container">
                <div className="header-brand">
                    <div className="brand-icon">
                        {appType === "author" ? "✍️" : "📚"}
                    </div>
                    <h1 className="brand-title">
                        {appType === "author" ? "Author Studio" : "Blog Reader"}
                    </h1>
                </div>

                <nav className="header-nav">
                    {token ? (
                        <>
                            <NavLink to="/" className="nav-link">
                                <span>🏠</span> Home
                            </NavLink>
                            
                            {appType === "author" ? (
                                <>
                                    <NavLink to="/create" className="nav-link">
                                        <span>✨</span> Create
                                    </NavLink>
                                    <NavLink to="/manage" className="nav-link">
                                        <span>⚙️</span> Manage
                                    </NavLink>
                                </>
                            ) : (
                                <NavLink to="/posts" className="nav-link">
                                    <span>📖</span> Posts
                                </NavLink>
                            )}
                            
                            <div className="user-menu">
                                <div className="user-avatar-small">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </div>
                                <span className="user-name">{user?.name}</span>
                            </div>
                        </>
                    ) : (
                        <div className="auth-nav">
                            <NavLink to="/login" className="nav-link">
                                <span>🚀</span> Login
                            </NavLink>
                            <NavLink to="/register" className="nav-link register-nav">
                                <span>✍️</span> Register
                            </NavLink>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default AppHeader;