

import Sidebar from '../components/sidebar';
import ShowVideos from '../components/showVideo';
import { useEffect, useState } from 'react';
import { getAPI } from '../components/callAPI';

const Home = () => {
  const [ videos, setVideos ] = useState(null);

  useEffect(() => {
    getAPI('videosPublic')
    .then(response => {
      setVideos(response);
    });
  }, [])

  if (videos === null) {
    return (
      <div>
        <Sidebar>
          <div className='center'>
            <div className='loading' />
          </div>
        </Sidebar>
      </div>
    )
  }

  return (

    <div>
      <Sidebar>
        <div style={{marginTop: '15px'}}>
        <ShowVideos videos={videos}/>

        </div>
      </Sidebar>
    </div>

  );
};

export default Home;