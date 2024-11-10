import React from 'react';
import logo from '../images/logo1.png';
import { Link } from 'react-router-dom';

const HeaderSection = ({ isLoggedIn }) => {
    return (
        <header className="header_section">
            <div className="header_top">
                <div className="container">
                    <div className="contact_nav">
                        <Link to="tel:+0201271858715">
                            <i className="fa fa-phone" aria-hidden="true"></i>
                            <span> Call : +0201271858715</span>
                        </Link>
                        <Link to="mailto:mhmdtaha818@gmail.com">
                            <i className="fa fa-envelope" aria-hidden="true"></i>
                            <span> Email : mhmdtaha818@gmail.com</span>
                        </Link>
                        {/* Added Location Link with functionality */}
                        <Link to="/location">
                            <i className="fa fa-map-marker" aria-hidden="true"></i>
                            <span> Location</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="header_bottom">
                <div className="container-fluid">
                    <nav className="navbar navbar-expand-lg custom_nav-container">
                        <a className="navbar-brand" href="#" style={{ backgroundColor: 'rgb(0 0 0 / 0%)' }}>
                            <img src={logo} alt="Logo" />
                        </a>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className=""> </span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            {isLoggedIn && (
                                <div className="d-flex mr-auto flex-column flex-lg-row align-items-center">
                                    <ul className="navbar-nav">
                                        <li className="nav-item active">
                                            <Link className="nav-link" to="/home">
                                                Home <span className="sr-only">(current)</span>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/about">
                                                About
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/treatment">
                                                Treatment
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/doctor">
                                                Doctors
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/testimonial">
                                                Testimonial
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/contact">
                                                Contact Us
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            )}
                            <div className="quote_btn-container">
                                {!isLoggedIn && (
                                    <>
                                        <Link to="/login">
                                            <i className="fa fa-user" aria-hidden="true"></i>
                                            <span>Login</span>
                                        </Link>
                                        <Link to="/register">
                                            <i className="fa fa-user" aria-hidden="true"></i>
                                            <span>Sign Up</span>
                                        </Link>
                                    </>
                                )}
                                <form className="form-inline">
                                    <button className="btn my-2 my-sm-0 nav_search-btn" type="submit">
                                        <i className="fa fa-search" aria-hidden="true"></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default HeaderSection;
