import React from 'react';
import logo from '../images/logo1.png';
import { Link } from 'react-router-dom';

const HeaderSection = ({ isLoggedIn }) => {
    return (
        <header className="header_section">
    
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
                                            
                                        </li>
                                        <li className="nav-item">
                                           
                                        </li>
                                        <li className="nav-item">
                                            
                                        </li>
                                        <li className="nav-item">
                                          
                                        </li>
                                        <li className="nav-item">
                                           
                                        </li>
                                        <li className="nav-item">
                                           
                                        </li>
                                    </ul>
                                </div>
                            )}
                            <div className="quote_btn-container">
                                {!isLoggedIn && (
                                    <>
                                        <Link to="/login">
                                            <i className="fa fa-user" aria-hidden="true"></i>
                                            <span>تسجيل الدخول</span>
                                        </Link>
                                        <Link to="/register">
                                            <i className="fa fa-user" aria-hidden="true"></i>
                                            <span>انشاء حساب جديد</span>
                                        </Link>
                                    </>
                                )}
                                <form className="form-inline">
                                 
                                    <a className="nav-item">
                                            <Link className="nav-link" to="/hospital">
                                                المستشفيات
                                            </Link>
                                        </a>
                                        <a className="nav-item">
                                            <Link className="nav-link" to="/testimonial">
                                                حجز
                                            </Link>
                                        </a>
                                        <a className="nav-item">
                                            <Link className="nav-link" to="/about">
                                                حول
                                            </Link>
                                        </a>
                                        <a className="nav-item">
                                            <Link className="nav-link" to="/contact">
                                               تواصل معنا
                                            </Link>
                                        </a>
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
