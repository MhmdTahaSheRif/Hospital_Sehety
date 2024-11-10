import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import contactImage from '../images/contact-img.jpg'; // Replace with your image path

const ContactUs = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [showMap, setShowMap] = useState(false); // State to toggle map display

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && email && message) {
            setSubmitted(true);
            // Handle form submission here (e.g., send to API or email service)
            console.log({ name, email, subject, message });
        } else {
            alert('Please fill out all fields!');
        }
    };

    // Handle toggling map visibility
    const toggleMapVisibility = () => {
        setShowMap(!showMap); // Toggle the showMap state
    };

    return (
        <div className="contact-us-page">
            <section className="contact-banner">
                <div className="container">
                    <h1>Contact Us</h1>
                    <p>We would love to hear from you! Please fill out the form below, and we will get back to you as soon as possible.</p>
                </div>
            </section>

            <section className="contact-info">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="contact-card">
                                <FaPhoneAlt size={30} />
                                <h4>Phone</h4>
                                <p>+0201271858715</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="contact-card">
                                <FaEnvelope size={30} />
                                <h4>Email</h4>
                                <p>mhmdtaha818@gmail.com</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section className="contact-form">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h2>Send Us a Message</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>Your Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Your Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Subject</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Message</label>
                                    <textarea
                                        className="form-control"
                                        rows="4"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                            {submitted && <div className="alert alert-success mt-4">Your message has been sent successfully!</div>}
                        </div>

                        {/* Add the image next to the form */}
                        <div className="col-md-6">
                            <div className="contact-image">
                            <img src={contactImage} alt="Contact Us" className="img-fluid" style={{ borderRadius: '25px' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactUs;
