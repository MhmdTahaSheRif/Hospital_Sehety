// Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/footer.css'; // تأكد من وجود ملف CSS لتنسيق الفوتر

const Footer = () => {
    return (
        <footer className="footer_section">
            <div className="container">
                <div className="row">
                    {/* عمود الروابط */}
                    <div className="col-md-4">
                        <h5>Quick Links</h5>
                        <ul className="footer_links">
                            <li><Link to="/home">Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/services">Services</Link></li>
                            <li><Link to="/contact">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* عمود معلومات الاتصال */}
                    <div className="col-md-4">
                        <h5>Contact Us</h5>
                        <p><i className="fa fa-phone"></i> +0201271858715</p>
                        <p><i className="fa fa-envelope"></i> mhmdtaha818@gmail.com</p>
                        <p><i className="fa fa-map-marker"></i> Madint Nasr ,Cairo ,Egypt</p> 
                    </div>

                    {/* عمود وسائل التواصل الاجتماعي */}
                    <div className="col-md-4">
                        <h5>Follow Us</h5>
                        <ul className="social_links" >
                            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: "#00c6a9" }}><i class="fa-brands fa-facebook"></i> Facebook</a></li>
                            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: "#00c6a9" }}><i class="fa-brands fa-twitter"></i> Twitter</a></li>
                            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: "#00c6a9" }}><i class="fa-brands fa-instagram"></i> Instagram</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer_bottom text-center">
                    <p>© {new Date().getFullYear()} Your Company. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
