import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { isSessionSet, getlocalData } from '../components/session';

import Sidebar from '../components/sidebar';

import './../css/profile.css';
import GetVideo from '../components/getVideo';
import UserUpdate from '../components/userUpdateModal';
import '../config'

const ProfilePage = () => {
  const param = new URLSearchParams(window.location.search);
  const U_id = param.get('profile');
  const ip = global.config.ip.ip;

  const getAPI = ip + '/getUser/id?u=' + U_id;

  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  ReactModal.setAppElement('#root');

  let [currentComp, setCurrentComp] = useState('public');
  var session

  if (isSessionSet('token')) {
    session = getlocalData('session');
  } else {
    session = {
      'U_id': null
    }
  }

  useEffect(() => {
    fetch(getAPI)
      .then(response => response.json())
      .then(data => {
        setUser(data)
      })
      .catch(e => {
        console.error('Error:', e);
      })
  }, [getAPI])

  useEffect(() => {
    if (user) {
      document.title = user.U_name + ' | Profile';
    }
  }, [user]);

  if (user) {
    const openModal = () => {
      setIsOpen(true);
    }

    const buttonHandler = (btnId) => {
      setCurrentComp(btnId);
      console.log("work!");
    };

    const closeModal = () => {
      setIsOpen(!isOpen);
    }

    const update = () => {
      window.location.reload();
    }


    const modalStyle = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        height: 'max-content',
        backgroundColor: 'rgb(44, 48, 56)',
      },
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      },
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
              <button className="setting-button" onClick={openModal}>
                <i className="bi bi-gear"></i> &nbsp;
                SETTING
              </button>
            )}

            <ReactModal isOpen={isOpen} onRequestClose={closeModal} style={modalStyle}>

              <UserUpdate data={user} closeModal={closeModal} update={update} />

            </ReactModal>


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
            <div className='loading' />
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