import React, { useEffect, useState } from 'react';
import { isSessionSet, getSessionData, getlocalData } from '../components/session';

import Sidebar from '../components/sidebar';

import './../css/profile.css';
import GetVideo from '../components/getVideo';


const ProfilePage = () => {
  const param = new URLSearchParams(window.location.search);
  const U_id = param.get('profile');

  const [ user, setUser ] = useState(null)
  const getAPI = 'http://localhost:8900/getUser/id?u='+U_id

  let [currentComp, setCurrentComp] = useState('public')

  if(isSessionSet('session') && isSessionSet('isLoggedIn')) {
    
    if (getlocalData('check')) {
      // console.log('in local');
      var session = getlocalData('session');
    } else {
      // check if not checked remember me
      session = getSessionData('session');
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

  
    
  if(user) {
    

    const bgStyle = {
      backgroundImage: `url('data:image/jpeg;base64, ${user.U_banner}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '300px',
      position: 'relative'
    };

    const handleSettingBtn = (e) => {
      console.log('setting!!!');
    }
    
    const buttonHandler = (btnId) => {
      let tmp = null;
      if (btnId === 1) {
        tmp = 'public'
      } else if (btnId === 2) {
        tmp = 'private'
      } else if (btnId === 3) {
        tmp = 'unlisted'
      }
  
      setCurrentComp(tmp)
    };

    return (

      <div>
        <Sidebar>
          <div className='container'>
            <div className='row' style={bgStyle}>
              <div className='col-11' style={{ position: 'absolute', left: '0', bottom: '0', marginBottom: '10px' }}>
                <div className='row'>
                  <div className='col-1 info-bg-profile' style={{ width: 'fit-content' }}>
                    <img src={'data:image/jpeg;base64, ' + user.U_pro_pic} style={{ width: '110px', borderRadius: '50%', border: '5px solid white' }} alt='user banner' />
                  </div>
                  <div className='col-5 info-bg-name ' style={{ width: 'fit-content', color: 'white' }}>
                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingRight: '20px' }}>
                      <div>
                        <h3>User Name: {user.U_name}</h3>
                        <h5>Email: {user.U_mail}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-1 '>
                <button id='settingBtn' onClick={handleSettingBtn} className='btn btn-secondary' style={{ position: 'absolute', right: '0', margin: '20px', borderRadius: '40%', opacity: '0.8' }}>
                  <h5>. . .</h5>
                </button>
              </div>
            </div>
            {/* profile content */}
            <div className='row' style={{ marginTop: '20px' }}>
              <div className='col'>
                <div className='card' style={{backgroundColor: 'rgb(44,48,52)'}}>
                  
                      <div className='card-header'>
                        <div className='btn-margin'>
                          
                          {session.U_id === user.U_ID ?
                          <div>
                            <button className='btn btn-secondary' onClick={() => buttonHandler(1)} >public video</button>
                            <button className='btn btn-secondary' onClick={() => buttonHandler(2)} >private video</button>
                            <button className='btn btn-secondary' onClick={() => buttonHandler(3)} >unlisted video</button>
                          </div>
                          :
                          <div>
                            <button className='btn btn-secondary' onClick={() => buttonHandler(1)} >public video</button>
                          </div>
                          }
                        </div>
                      </div>
                      <div className='card-body'>
                        {/* card content */}
                        <GetVideo permit={currentComp} user={user.U_ID} />
                      </div>
                  
                </div>
              </div>
            </div>
          </div>

        </Sidebar>
      </div>
  
    );
  } else {
    <div>
      <Sidebar>
        <div className='loading center'></div>
      </Sidebar>
    </div>
  }
  
};

export default ProfilePage;