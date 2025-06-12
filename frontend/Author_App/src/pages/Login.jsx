import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../AuthContext.jsx";
import "./Auth.css";

const Login = () => {
    const { login } = useAuth();
    const [input, setInput] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInput({ ...input, [name]: value });
        if (error) setError(false); // Clear error when user starts typing
    }

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);
        
        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(input)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);
                setInput({ email: '', password: '' });
                login(data);
                setError(false);
                navigate('/');
            } else {
                setError(true);
                console.error('Error logging in:', response.statusText);
            }
        } catch (err) {
            setError(true);
            console.error('Network error:', err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h1 className="auth-title">Welcome Back</h1>
                <p className="auth-subtitle">Sign in to your account</p>
                
                {error && (
                    <div className="error-message">
                        Login failed. Please check your credentials.
                    </div>
                )}

                <form onSubmit={handleLogin} className="auth-form">
                    <div className="floating-label-group">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="floating-input"
                            placeholder=" "
                            value={input.email}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="email" className="floating-label">Email Address</label>
                    </div>

                    <div className="floating-label-group">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="floating-input"
                            placeholder=" "
                            value={input.password}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="password" className="floating-label">Password</label>
                    </div>

                    <button 
                        type="submit" 
                        className={`submit-button ${loading ? 'loading' : ''}`}
                        disabled={loading}
                    >
                        {loading ? '' : 'Sign In'}
                    </button>
                </form>

                <div className="form-toggle">
                    <span className="form-toggle-text">Don't have an account?</span>
                    <Link to="/register" className="form-toggle-link">Create one</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;