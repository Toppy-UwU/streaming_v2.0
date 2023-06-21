import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

const VideoPlayer = ({ source }) => {
  const videoRef = useRef(null);
  const [hls, setHls] = useState(null);
  const [ resolutions, setResolutions] = useState(null);

  useEffect(() => {
    const loadVideo = async () => {
      if (typeof Hls === 'undefined') return;
      if (!Hls.isSupported()) return;

      const video = videoRef.current;
      const tmpHls = new Hls();

      tmpHls.loadSource(source);
      tmpHls.attachMedia(video);
      
      setHls(tmpHls);
    
      video.autoplay = true;

      tmpHls.on(Hls.Events.MANIFEST_PARSED, () => {
        const tmp = tmpHls.levels;
        // console.log(tmp);
        tmpHls.currentLevel = tmp.length-1;
        
        
        setResolutions(tmp);
      });

    };

    loadVideo();
  }, [source]);

  useEffect(() => {
    const video = videoRef.current;

    return () => {
      if (hls) {
        hls.destroy();
      }
      video.removeAttribute('src');
    };
  }, [hls]);

  const resChange = (e) => {
    const level = e.target.value
    if(level !== 'auto') {
        hls.currentLevel = parseInt(level);
    }else {
        hls.currentLevel = resolutions.length-1
        
    }
  }

  return (
    <div className='container-fluid' >
        <div className='row'>
        <video ref={videoRef} controls>
            Your browser does not support the video tag.
        </video>
        </div>
        <div>
        <select onChange={resChange}>
            <option value={'auto'}>Auto</option>
            {resolutions && resolutions.map((res, index) => (
                <option key={index} value={index} >{res.height}</option>
            ))}
        </select>
        </div>
    </div>
  );
};

export default VideoPlayer;
