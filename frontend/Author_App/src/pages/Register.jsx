import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

const Register = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        type: 'Basic'
    });
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();
        
        if (input.password !== input.confirmPassword) {
            setError("Passwords don't match");
            return;
        }
        
        setLoading(true);
        
        try {
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(input)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Register successful:', data);
                setInput({ 
                    name: '', 
                    email: '', 
                    password: '', 
                    confirmPassword: '', 
                    type: 'Basic' 
                });
                setError(false);
                navigate('/login');
            } else {
                setError("Registration failed. Please try again.");
                console.error('Error registering:', response.statusText);
            }
        } catch (err) {
            setError("Network error. Please try again.");
            console.error('Network error:', err);
        } finally {
            setLoading(false);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInput({ ...input, [name]: value });
        if (error) setError(null); // Clear error when user starts typing
    }

    const handleUserTypeChange = (type) => {
        setInput({ ...input, type });
    }

    return (
        <div className="auth-page">
            <div className="auth-container">
                <h1 className="auth-title">Join Us</h1>
                <p className="auth-subtitle">Create your account</p>
                
                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <form onSubmit={handleRegister} className="auth-form">
                    <div className="floating-label-group">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="floating-input"
                            placeholder=" "
                            value={input.name}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="name" className="floating-label">Full Name</label>
                    </div>

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

                    <div className="floating-label-group">
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className="floating-input"
                            placeholder=" "
                            value={input.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="confirmPassword" className="floating-label">Confirm Password</label>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Account Type</label>
                        <div className="user-type-selector">
                            <div 
                                className={`user-type-option ${input.type === 'Basic' ? 'selected' : ''}`}
                                onClick={() => handleUserTypeChange('Basic')}
                            >
                                📖 Reader
                            </div>
                            <div 
                                className={`user-type-option ${input.type === 'Author' ? 'selected' : ''}`}
                                onClick={() => handleUserTypeChange('Author')}
                            >
                                ✍️ Author
                            </div>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className={`submit-button ${loading ? 'loading' : ''}`}
                        disabled={loading}
                    >
                        {loading ? '' : 'Create Account'}
                    </button>
                </form>

                <div className="form-toggle">
                    <span className="form-toggle-text">Already have an account?</span>
                    <Link to="/login" className="form-toggle-link">Sign in</Link>
                </div>
            </div>
        </div>
    );
}

export default Register;