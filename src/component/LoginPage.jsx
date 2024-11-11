import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/login.css';
import logo from '../images/5.png';
import axios from 'axios'; // Import axios

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [tokens, setTokens] = useState({ access: '', refresh: '' });
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    // Regular expression for password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if password matches the regex
        if (!passwordRegex.test(password)) {
            setPasswordError('Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.');
            return;
        } else {
            setPasswordError('');  // Clear any previous password errors
        }

        try {
            // Sending POST request to login endpoint
            const response = await axios.post('http://10.100.100.149:500/API/login/', {
                username: username,  // use the state values
                password: password,
            });

            // Check if the response contains the tokens
            if (response.data && response.data.access && response.data.refresh) {
                // Store tokens in memory (in the component's state)
                setTokens({
                    access: response.data.access,
                    refresh: response.data.refresh,
                });

                // Optionally store tokens in localStorage for persistence
                
                // localStorage.setItem('accessToken', response.data.access);
                // localStorage.setItem('refreshToken', response.data.refresh);

                // Redirect to home page after successful login
                navigate('/home');
            } else {
                setErrorMessage('Login failed: No token received.');
            }
        } catch (error) {
            console.error('Login error:', error);
            // Handle error response more gracefully
            if (error.response) {
                setErrorMessage('Login failed: ' + (error.response.data?.message || 'Unknown error'));
            } else {
                setErrorMessage('Login failed: ' + error.message);
            }
        }
    };

    return (
        <div className='vh-100'>
            <div className='login-form-bx'>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6 col-md-7 box-skew d-flex">
                            <div className="authincation-content">
                                <a className="login-logo" href="/">
                                    <img src={logo} alt="" className="logo-icon me-2" />
                                </a>
                                <div className="mb-4">
                                    <h3 className="mb-1 font-w600">Welcome to Eres</h3>
                                    <p>Sign in by entering the information below</p>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label className="mb-2">
                                            <strong>Username</strong><span className="required">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={username}  // Bind state to input
                                            onChange={(e) => setUsername(e.target.value)}  
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="mb-2">
                                            <strong>Password</strong><span className="required">*</span>
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={password}  // Bind state to input
                                            onChange={(e) => setPassword(e.target.value)}  
                                            required
                                        />
                                        {/* Show password validation error */}
                                        {passwordError && <p className="text-danger">{passwordError}</p>}  
                                    </div>

                                    {errorMessage && <p className="text-danger">{errorMessage}</p>}  {/* Show general error message */}

                                    <div className="text-center">
                                        <button type="submit" className="btn btn-primary btn-block">
                                            Sign In
                                        </button>
                                    </div>
                                </form>

                                <div className="new-account mt-2">
                                    <p className="mb-0">Don't have an account?
                                        <Link className="text-primary" to="/">Sign up</Link> 
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-5 d-flex box-skew1">
                            {/* Additional content or image */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
