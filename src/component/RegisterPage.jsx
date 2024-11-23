import React, { useState } from 'react';
import '../css/login.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/5.png';
import axios from 'axios'; // Import axios

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [nationalNumber, setNationalNumber] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Use useNavigate hook here

    // Regular Expressions for validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; 
    const nationalNumberRegex = /^\d{14}$/;
    const contactNumberRegex = /^\d{11}$/;

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate password format
        if (!passwordRegex.test(password)) {
            setErrorMessage('Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.');
            return;
        }

        // Ensure passwords match
        if (password !== confirmPassword) {
            setErrorMessage("Passwords don't match!");
            return;
        }

        // Validate email format
        if (!emailRegex.test(email)) {
            setErrorMessage('Please enter a valid email address (e.g., user@domain.com).');
            return;
        }

        // Validate national number (exactly 15 digits)
        if (!nationalNumberRegex.test(nationalNumber)) {
            setErrorMessage('National number must be exactly 14 digits.');
            return;
        }

        // Validate contact number (between 12 and 15 digits)
        if (!contactNumberRegex.test(contactNumber)) {
            setErrorMessage('Contact number must be 11 digits.');
            return;
        }

        const payload = {
            username: username,
            email: email,
            password: password,
            Profile: {
                fullname: fullname,
                national_number: nationalNumber,
                contact_number: contactNumber,
                address: address,
                gender: gender,
                date_of_birth: dob,
            },
        };

        console.log('Payload being sent:', payload);

        try {
            const response = await axios.post('http://10.100.100.149:500/API/register/', payload);

            if (response.data && response.data.success) {
                console.log('Registration successful!');
                navigate('/login'); // Redirect to login after successful registration
            } else {
                setErrorMessage(response.data.message);
                navigate('/login'); // Redirect to login after successful registration
            }
        } catch (error) {
            // Log detailed error to understand what's wrong
            console.error('Registration error:', error);
            if (error.response) {
                setErrorMessage(error.response.data.message || 'Registration failed: This user already exists.');
            } else {
                setErrorMessage('Registration failed: Server error');
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
                                    <h3 className="mb-1 font-w600">انشاء حساب جديد</h3>
                                    <p></p>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    {/* Form Group with Flexbox */}
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label className="mb-2">
                                           <span className="required">*</span> <strong>اسم المستخدم</strong>
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
                                            <span className="required">*</span>  <strong>البريد الالكتروني</strong>
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label className="mb-2">
                                            <span className="required">*</span><strong>الرقم السري</strong>
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
                                            <span className="required">*</span> <strong>تأكيد الرقم السري</strong>
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label className="mb-2">
                                            <span className="required">*</span><strong>الاسم بالكامل</strong>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={fullname}
                                                onChange={(e) => setFullname(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="mb-2">
                                            <span className="required">*</span><strong>الرقم القومي</strong>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={nationalNumber}
                                                onChange={(e) => setNationalNumber(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label className="mb-2">
                                            <span className="required">*</span><strong>رقم التواصل</strong>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={contactNumber}
                                                onChange={(e) => setContactNumber(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="mb-2">
                                            <span className="required">*</span> <strong>العنوان</strong>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label className="mb-2">
                                            <span className="required">*</span><strong>النوع</strong>
                                            </label>
                                            <select
                                                className="form-control"
                                                value={gender}
                                                onChange={(e) => setGender(e.target.value)}
                                                required
                                            >
                                                <option value="">اختر النوع</option>
                                                <option value="Male">ذكر</option>
                                                <option value="Female">انثى</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label className="mb-2">
                                            <span className="required">*</span><strong>تاريخ الميلاد</strong>
                                            </label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                value={dob}
                                                onChange={(e) => setDob(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {errorMessage && <p className="text-danger">{errorMessage}</p>}

                                    <div className="text-center">
                                        <button type="submit" className="btn btn-primary btn-block">
                                            التسجيل
                                        </button>
                                    </div>
                                </form>
                                <div className="new-account mt-2">
                                    <p className="mb-0">لديك حساب بالفعل ؟
                                        <Link className="text-primary" to="/login">تسجيل الدخول</Link>
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

export default Register;
