import React, { useState } from 'react';
import aboutImg from '../images/about-img.jpg';
import HeaderSection from './HeaderSection';

const AboutSection = ({ showHeader = true }) => { 
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    return (
        <>
            {showHeader && <HeaderSection isLoggedIn={isLoggedIn} />}
            
            <br />
            <br />
            <br />
            <section className="about_section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="img-box">
                                <img src={aboutImg} alt="About Hospital" />
                            </div>
                        </div>
                        <div className="col-md-6" style={{ direction: "rtl" }}>
                            <div className="detail-box">
                                <div className="heading_container">
                                    <h2>
                                        معلومات عن <span>منصة صحتـــي</span>
                                    </h2>
                                </div>
                                <p>
                                    هي منصة خدمية تقدمها محافظة البحيرة لمواطنيها عبر منصة تفاعلية للتسهيل علي المواطنين قانطيها حجز تذاكر للأقسام المختلفة في المستشفيات الموجودة داخل المحافظة وللتقليل من عمليات التزاحم داخل المستشفيات.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutSection;
