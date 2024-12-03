import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/login.css';
import logo from '../images/5.png';
import axios from 'axios';
import { useUser } from './UserContext';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();
    const { fetchUserData } = useUser();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!passwordRegex.test(password)) {
            setPasswordError('Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.');
            return;
        } else {
            setPasswordError('');
        }

        try {
            const response = await axios.post('http://10.100.100.149:500/API/login/', {
                username: username,
                password: password,
            });

            if (response.data && response.data.access && response.data.refresh) {
                localStorage.setItem('accessToken', response.data.access);
                localStorage.setItem('refreshToken', response.data.refresh);

                // Fetch user data using the context
                await fetchUserData();

                const profileResponse = await axios.get('http://10.100.100.149:500/API/ProfileView/', {
                    headers: {
                        Authorization: `Bearer ${response.data.access}`,
                    },
                });

                const { role } = profileResponse.data;
                if (role === 2) {
                    navigate('/');
                } else if (role === 1 || role === 3) {
                    navigate('/');
                } else {
                    setErrorMessage('Unknown role, unable to determine redirect destination.');
                }
            } else {
                setErrorMessage('Login failed: No token received.');
            }
        } catch (error) {
            console.error('Login error:', error);
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
                            <div className="authincation-content" style={{ margin: '0px' }}>
                                <a className="login-logo" href="/">
                                    <img src={logo} alt="" className="logo-icon me-2" />
                                </a>
                                <div className="mb-4">
                                    <h3 className="mb-1 font-w600">أهلا بك في منصة صحتي</h3>
                                    <p></p>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label className="mb-2">
                                            <span className="required">*</span>  <strong>أدخل اسم المستخدم</strong>
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
                                            <span className="required">*</span>  <strong>أدخل الرقم السري</strong>
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        {passwordError && <p className="text-danger">{passwordError}</p>}
                                    </div>

                                    {errorMessage && <p className="text-danger">{errorMessage}</p>}

                                    <div className="text-center">
                                        <button type="submit" className="btn btn-primary btn-block">
                                            الدخول
                                        </button>
                                    </div>
                                </form>

                                <div className="new-account mt-2">
                                    <p className="mb-0">ليس لديك حساب ؟
                                        <Link className="text-primary" to="/register">انشاء حساب جديد</Link>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-5 d-flex box-skew1">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
