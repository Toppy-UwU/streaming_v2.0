import React, { useEffect, useState } from 'react';
import { isSessionSet, getlocalData } from '../components/session';

import Sidebar from '../components/sidebar';
import UserUpdate from '../components/userUpdateModal';
import './../css/profile.css';
import './../css/modal.css';
import GetVideo from '../components/getVideo';
import '../config'

const ProfilePage = () => {
  const param = new URLSearchParams(window.location.search);
  const U_id = param.get('profile');
  const ip = global.config.ip.ip;

  const getAPI = ip + '/getUser/id?u=' + U_id;

  const [user, setUser] = useState(null);

  let [currentComp, setCurrentComp] = useState('public');

  const session = isSessionSet('token') ? getlocalData('session') : { U_id: null };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(getAPI);

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserData();
  }, [getAPI])

  useEffect(() => {
    if (user) {
      document.title = user.U_name + ' | Profile';
    }
  }, [user]);


  if (user === null) {

    return (
      <Sidebar>
        <div className="center">
          <div className="loading" style={{ marginTop: '25%' }}></div>
        </div>
      </Sidebar>
    )
  }

  console.log(user);
  if (user) {

    const buttonHandler = (btnId) => {
      setCurrentComp(btnId);
    };

    return (
      <Sidebar>
        <div className='container-fluid'>
          <div className="profile-header">
            <img src={`data:image/jpeg;base64, ${user.U_banner}`} alt="cover" className="cover-photo" />
            <img src={`data:image/jpeg;base64, ${user.U_pro_pic}`} alt="profile" className="profile-photo" />
            <h2 className="user-details">{user.U_name}</h2>
            <p className="user-details">{user.U_mail} | {user.U_vid} Videos</p>

            {session.U_id === user.U_ID && (
              <button type="button" className="setting-button" data-bs-toggle="modal" data-bs-target="#UpdateUserModal">
                <i className="bi bi-gear"></i> &nbsp;
                SETTING
              </button>
            )}

            <UserUpdate data={user} />

          </div>

          <hr className='text-secondary d-md-block' />

          {session.U_id === user.U_ID ?
            <ul className="nav d-flex">
              <li className="nav-item">
                <button className="setting-button" onClick={() => buttonHandler('public')}>
                  Public Video
                </button>
              </li>
              <li className="nav-item">
                <button className="setting-button" onClick={() => buttonHandler('unlisted')}>
                  Unlisted Video
                </button>
              </li>
              <li className="nav-item">
                <button className="setting-button" onClick={() => buttonHandler('private')}>
                  Private Video
                </button>
              </li>
            </ul>
            :
            <ul className="nav nav-underline d-flex justify-content-center">
              <li className="nav-item">
                <button className="setting-button" onClick={() => buttonHandler('public')}>
                  Public Video
                </button>
              </li>
            </ul>
          }
          <div style={{ marginTop: '20px' }}>
            <GetVideo permit={currentComp} user={user.U_ID} />
          </div>
        </div>
      </Sidebar >
    );
  } else {
    return (
      <div>
        <Sidebar>
          <div className='container-fluid d-flex justify-content-center'>
            <div>
              No User have ID = {U_id}
            </div>
          </div>
        </Sidebar>
      </div>
    );
  }

};

export default ProfilePage;