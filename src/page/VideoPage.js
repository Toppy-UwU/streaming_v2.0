import Sidebar from '../components/sidebar';
import { useEffect, useState } from 'react';
import { getlocalData } from "../components/session"
import '../config';
import moment from 'moment';

const Home = () => {
  const [videos, setVideos] = useState('');
  document.title = "CS-HUB";
  const ip = global.config.ip.ip;
  var session = getlocalData('session');
  const getUserVideo = ip + '/getVideos/profile?u=' + session.U_id + '&p=all';

  useEffect(() => {
    fetch(getUserVideo)
      .then(response => response.json())
      .then(data => {
        setVideos(data);
      })
      .catch(() => { });
  }, [getUserVideo])

  return (

    <div>
      <Sidebar>
        <br /> <br />
        <div className="row d-flex justify-content-between align-items-center">
          <div style={{ flex: 1, marginRight: '20px' }}>
            <h3 className="text-white">{session.username}'s Videos</h3>
            {console.log(videos)}
          </div>
        </div>
        <div className="table-responsive">
          <table class="table table-dark table-hover">
            <thead>
              <tr>
                <th scope="col">Thumbnail</th>
                <th scope="col">Title</th>
                <th scope="col">Permit</th>
                <th scope="col">Upload Date</th>
                <th scope="col">Views</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {videos.length > 0 ? (
                videos.map(video => (
                  <tr key={video.V_ID}>
                    <td> <img className="card-img-top" src={'data:image/jpeg;base64,' + video.V_pic} style={{ borderRadius: '20px', maxHeight: '200px', maxWidth: '200px' }} alt={video.V_title + ' thumbnail'} /></td>
                    <td>{video.V_title}</td>
                    <td>{video.V_permit}</td>
                    <td>{moment((new Date(video.V_upload))).format("DD MMMM YYYY")}</td>
                    <td>{video.V_view}</td>
                    <td><button type="button" class="btn btn-danger"><i class="bi bi-trash3"></i></button></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colspan="5" className="text-center text-white">- No Video Upload Status! -</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Sidebar>
    </div>

  );
};

export default Home;