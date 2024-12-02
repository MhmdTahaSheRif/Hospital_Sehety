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
                    <br/>
                        <h5 style={{color:"#00c6a9"}}>روابط سريعة</h5>
                        <ul className="footer_links">
                            <li><Link to="/">الرئيسية</Link></li>
                            <li><Link to="/">من نحن</Link></li>
                            <li><Link to="/posts">اتصل بنا</Link></li>
                        </ul>
                    </div>

                    {/* عمود معلومات الاتصال */}
                    <div className="col-md-4">
                    <br/>
                        <h5  style={{color:"#00c6a9"}}>تواصل معنا </h5>
                        <p className='withus'>+0201271858715 <i className="fa fa-phone"></i> </p>
                        <p className='withus'>mhmdtaha818@gmail.com <i className="fa fa-envelope"></i> </p>
                        <p className='withus'>مدينة نصر، القاهرة، مصر<i className="fa fa-map-marker"></i> </p>
                    </div>

                    {/* عمود وسائل التواصل الاجتماعي */}
                    <div className="col-md-4">
                    <br/>
                        <h5 style={{color:"#00c6a9"}}>تابعنا </h5>
                        <ul className="social_links" >
                            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" >فيسبوك <i className="fa-brands fa-facebook"></i></a></li>
                            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" >تويتر <i className="fa-brands fa-twitter"></i></a></li>
                            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" >انستجرام<i className="fa-brands fa-instagram"></i></a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer_bottom text-center">
                    <br/>
                    <p> جميع الحقوق محفوظة ©  NSDI {new Date().getFullYear()}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
