import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { insertHistories } from './saveHistories';
import { isSessionSet } from './session';

const VideoPlayer = ({ source, V_id, U_id }) => {
  const videoRef = useRef(null);
  const [hls, setHls] = useState(null);
  const [resolutions, setResolutions] = useState(null);

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
        tmpHls.currentLevel = tmp.length - 1;
        setResolutions(tmp);
      });
    };

    

    loadVideo();
    
    


    return () => {
      
    }

  }, [source]);

  useEffect(() => {
    const video = videoRef.current;

    const handleTime = async (e) => {
      e.preventDefault();
      const tmp = {
        'watchTime': video.currentTime,
        'V_id': V_id,
        'U_id': U_id
      }
      await insertHistories(tmp);
      e.returnValue = '';
    }

    if(isSessionSet('session')) {
      window.addEventListener('beforeunload', handleTime)
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
      if(isSessionSet('session')) {
        window.removeEventListener('beforeunload', handleTime)
      }

      video.removeAttribute('src');
    };
  }, [hls]);

  const resChange = (e) => {
    const level = e.target.value
    if (level !== 'auto') {
      hls.currentLevel = parseInt(level);
    } else {
      hls.currentLevel = resolutions.length - 1

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
