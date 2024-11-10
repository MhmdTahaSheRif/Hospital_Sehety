import React, { useState } from 'react';
import '../css/login.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/5.png';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate(); // Use useNavigate hook here

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            // Save data in localStorage
            const userData = {
                username: username,
                email: email,
                password: password
            };
            localStorage.setItem('user', JSON.stringify(userData));

            console.log('Registered successfully!', userData);

            navigate('/login'); // useNavigate to redirect
        } else {
            alert("Passwords don't match!");
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
                                    <h3 className="mb-1 font-w600">Create a New Account</h3>
                                    <p>Register by filling the information below</p>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label className="mb-2">
                                            <strong>Username</strong><span className="required">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                        />
                                    </div>
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
                                    <div className="form-group">
                                        <label className="mb-2">
                                            <strong>Confirm Password</strong><span className="required">*</span>
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" className="btn btn-primary btn-block">
                                            Register
                                        </button>
                                    </div>
                                </form>
                                <div className="new-account mt-2">
                                    <p className="mb-0">Already have an account?
                                        <Link className="text-primary" to="/login">Sign in</Link>
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

export default Register;
