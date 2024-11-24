import React, { useState } from 'react';
import CustomCarousel from './component/CustomCarousel';
import HeaderSection from './component/HeaderSection';
import Video from './component/video';
import Footer from './component/Footer';

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    return (
        <div>
            <div className="hero_area">
                <HeaderSection isLoggedIn={isLoggedIn} />
                
                <section className="slider_section">
                    <Video />
                </section>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <section className="slider_section">
                    <CustomCarousel />
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
