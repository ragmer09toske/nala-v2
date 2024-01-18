import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ videoLink }) => {
    return (
      <div className="video-player-wrapper">
        <ReactPlayer
          className="react-player"
          url={videoLink}
          width="100%"
          height="100%"
          controls
        />
      </div>
    );
  };
  
export default VideoPlayer;
  