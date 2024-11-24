import React from 'react';

const Video = () => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <video
        autoPlay
        loop
        muted
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',  // Ensures the video covers the entire screen without distortion
          zIndex: -1,  // Ensures the video is in the background
        }}
      >
        <source src="/video/health.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Video;
