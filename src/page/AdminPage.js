import React, { useEffect, useState } from 'react';

import Sidebar from '../components/sidebar';
import { getAPI } from '../components/callAPI';
import NameTable from '../components/nameTable';

import './../css/utilities.css';
import './../css/admin.css';
import ServerMonitor from '../components/serverMonitor';

const Home = () => {
  const [users, setUsers] = useState(null);
  let [currentComp, setCurrentComp] = useState(null)

  useEffect(() => {
    getAPI('users')
      .then(response => {
        setUsers(response);
      });

  }, [])

  useEffect(() => {
    if (users !== null) {
      setCurrentComp('admin');
    }
  }, [users]);




  const buttonHandler = (btnId) => {
    let tmp = null;
    if (btnId === 1) {
      tmp = 'admin'
    } else if (btnId === 2) {
      tmp = <NameTable users={users} />
    } else if (btnId === 3) {
      tmp = <ServerMonitor />
    }

    setCurrentComp(tmp)
  };

  if (users === null) {

    return (
      <Sidebar>
        <div className="center">
          <div className="loading"></div>
        </div>
      </Sidebar>
    )
  }

  return (

    <div>
      <Sidebar>

        <div style={{}}>
          <div className='card cardMargin'>
            <div className='card-header'>
              <div className='marginBtn'>
                <button className='btn btn-secondary' onClick={() => buttonHandler(1)} >clickk me</button>
                <button className='btn btn-secondary' onClick={() => buttonHandler(2)} >User List</button>
                <button className='btn btn-secondary' onClick={() => buttonHandler(3)} >Server Monitor</button>
              </div>
            </div>
            <div>
              {/* card content */}
              {currentComp}
            </div>
          </div>
        </div>

      </Sidebar>
    </div>

  );
};

export default Home;