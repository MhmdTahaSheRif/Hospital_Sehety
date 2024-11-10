import React, { useState } from 'react';
import '../css/login.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/5.png';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Use useNavigate hook here

    const handleSubmit = (e) => {
        e.preventDefault();

        // Retrieve user data from localStorage
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser) {
            // Compare entered email and password with stored data
            if (email === storedUser.email && password === storedUser.password) {
                console.log('Login successful');
                navigate('/home'); // Redirect to dashboard or home page
            } else {
                alert('Invalid email or password');
            }
        } else {
            alert('No user found. Please register first.');
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
                                    <p>Sign in by entering information below</p>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label className="mb-2">
                                            <strong>Email</strong><span className="required">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
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
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
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
                            {/* You can add an image or additional content here */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
