import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';
import ShowVideos from '../components/showVideo';
import { useEffect, useState } from 'react';
import { getAPI } from '../components/callAPI';

const Home = () => {
  const [videos, setVideos] = useState(null);
  const [tags, setTags] = useState(null);
  document.title = "CS MSU";

  useEffect(() => {
    getAPI('videosPublic')
      .then(response => {
        setVideos(response);
      });
    getAPI('tags')
      .then(response => {
        setTags(response);
      })
  }, [])

  const changeTag = (tag) => {
    window.location.href = '/tag?tag=' + tag
  }

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
        <div>
          {/* <div className='row' style={{ display: "flex", flexWrap: "nowrap", overflowX: "auto" }}>
            {tags && tags.slice(0, 8).map((tag, index) => (
              <div className='col-auto' key={index} style={{ marginTop: '5px' }}>
                <button className='btn rounded-pill' style={{ backgroundColor: 'white' }} onClick={() => changeTag(tag.T_name)}>
                  {tag.T_name} : {tag.count}
                </button>
              </div>
            ))}
          </div> */}
          <div style={{ marginTop: '15px' }}>
            <ShowVideos videos={videos} />
          </div>
        </div>
      </Sidebar>
    </div>

  );
};

export default Home;