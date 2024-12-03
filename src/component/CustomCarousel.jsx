import React, { useEffect, useRef } from 'react';
import { Carousel } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import slider_img from '../images/1.jpg'; // Default image
import slider_img2 from '../images/2.jpg'; // Default image
import slider_img3 from '../images/3.jpg'; // Default image

import '../css/style.css';

const CustomCarousel = ({ carouselId, isDifferentData }) => {
  // Ref to access the Carousel component
  const carouselRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease'
    });
  }, []);

  const carouselData = isDifferentData ? [
    { img: slider_img, title: 'منصة  ', text: 'وصف  1' },
    { img: slider_img2, title: 'منصة صحة ', text: 'وصف  2' },
    { img: slider_img3, title: 'منصة', text: 'وصف  3' },
  ] : [
    { img: slider_img, title: ' صحتـــي', text: ' هي منصة خدمية تقدمها محافظة البحيرة لمواطنيها عبر منصة تفاعلية للتسهيل علي المواطنين قانطيها حجز تذاكر للأقسام المختلفة في المستشفيات الموجودة داخل المحافظة وللتقليل من عمليات التزاحم داخل المستشفيات.' },
    { img: slider_img2, title: ' صحتـــي', text: '     هي منصة خدمية تقدمها محافظة البحيرة لمواطنيها عبر منصة تفاعلية للتسهيل علي المواطنين قانطيها حجز تذاكر للأقسام المختلفة في المستشفيات الموجودة داخل المحافظة وللتقليل من عمليات التزاحم داخل المستشفيات.' },
    { img: slider_img3, title: ' صحتـــي', text: '   هي منصة خدمية تقدمها محافظة البحيرة لمواطنيها عبر منصة تفاعلية للتسهيل علي المواطنين قانطيها حجز تذاكر للأقسام المختلفة في المستشفيات الموجودة داخل المحافظة وللتقليل من عمليات التزاحم داخل المستشفيات.' },
  ];

  // Handlers for next and prev buttons
  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.prev();
    }
  };

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  return (
    <section className="slider_section" style={{ direction: "rtl", width: "100%" }}>
      <div className="carousel-container">
        <Carousel 
          id={carouselId} 
          controls={false} 
          indicators={true}
          ref={carouselRef} // Attach the ref to the Carousel component
        >
          {carouselData.map((slide, index) => (
            <Carousel.Item key={index}>
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-md-6" data-aos="fade-left">
                    <div className="detail-box">
                      <div className="play_btn">
                        <button>
                          <i className="fa fa-play" aria-hidden="true"></i>
                        </button>
                      </div>
                      <h1 data-aos="fade-up" data-aos-delay="100">
                        {slide.title}
                      </h1>
                      <p data-aos="fade-up" data-aos-delay="100">
                        {slide.text}
                      </p>
                      <a href="/" className="carousel-link" data-aos="fade-up" data-aos-delay="100" style={{marginBottom:'40px'}}>
                        تواصــل معنــا
                      </a>
                    </div>
                  </div>
                  <div className="col-md-6" data-aos="fade-right">
                    <div className="img-box">
                      <img src={slide.img} alt="slider-img" />
                    </div>
                  </div>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>

        {/* Fixed buttons */}
        <div className="carousel_btn-box">
          <button className="carousel-control-prev" onClick={handlePrev}>
            <span className="carousel-control-next-icon"></span>
          </button>
          <button className="carousel-control-next" onClick={handleNext}>
            <span className="carousel-control-prev-icon"></span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CustomCarousel;
