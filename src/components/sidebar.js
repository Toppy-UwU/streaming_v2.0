import React from 'react';
import { getSessionData, removeSessionData, getlocalData, removelocalData, isSessionSet } from './session';
import './../css/utilities.css';
import TokenExpirePage from '../page/tokenExpirePage';

const Sidebar = ({ children }) => {
  const logoutHandler = (e) => {
    removelocalData('session');
    removelocalData('isLoggedIn');
    removelocalData('token');
    removelocalData('expDate');

    removeSessionData('session');
    removeSessionData('isLoggedIn');
    removeSessionData('token');
    removeSessionData('expDate');

    removelocalData('check');
  }

  if(isSessionSet('session') && isSessionSet('isLoggedIn')) {
    
    
      if (getlocalData('check')) {
        const expDate = getlocalData('expDate');
        if (Date.now() >= expDate){
          logoutHandler();
          window.location.href = '/token-expired';
        } else {
        // console.log('in local');
        var session = getlocalData('session');
        var isLoggedIn = getlocalData('isLoggedIn');
        }
      } else {
        const expDate = getSessionData('expDate');
        if (Date.now() >= expDate){
          logoutHandler();
          window.location.href = '/token-expired';
        } else {
        // check if not checked remember me
        session = getSessionData('session');
        isLoggedIn = getSessionData('isLoggedIn');
        }
      }
    

    
  }

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }} id={'sideBar'}>
      <div className="position-fixed h-100" style={{ width: '250px', backgroundColor: 'rgb(44,48,52)' }}>
        <div className="col-12">
          <div className="input-group" style={{ padding: '15px' }}>
            <input type="text" className="form-control rounded-end-0 rounded-start-pill" placeholder="search" aria-label="searchBar" aria-describedby="searchBtn" />
            <div className="input-group-append">
              <button className="btn btn-light rounded-start-0 rounded-end-pill" type="button" id="searchBtn">search</button>
            </div>
          </div>

          <hr />

          {/* menu start */}
          <div className="container-fluid vh-100 flex-column">
            <div className="row-cols-1" style={{ alignItems: 'center' }}>
              <nav className="nav">
                {isLoggedIn ? (
                  <>
                    <a href="/" style={{ marginTop: '20px' }}>
                      <button className="btn btn-light rounded-pill" style={{ width: '230px', color: 'black' }}>Home</button>
                    </a>
                    {/* profile.php?profile=${session.U_id} */}
                    <a href={`/profile?profile=${session.U_id}`} style={{ marginTop: '20px' }}>
                      <button className="btn btn-light rounded-pill" style={{ width: '230px', color: 'black' }}>Profile</button>
                    </a>
                    <a href="historyPage.php" style={{ marginTop: '20px' }}>
                      <button className="btn btn-light rounded-pill" style={{ width: '230px', color: 'black' }}>History</button>
                    </a>

                    {session.U_permit === 1 && (
                      <a href='/upload' style={{ marginTop: '20px' }}>
                        <button className="btn btn-light rounded-pill" data-toggle="modal" data-target="#uploadVid" style={{ width: '230px', color: 'black' }}>Upload Video</button>
                      </a>
                    )}

                    {session.U_type === 'admin' && (
                      <a href="/admin" style={{ marginTop: '20px' }}>
                        <button className="btn btn-light rounded-pill" style={{ width: '230px', color: 'black' }}>Administration</button>
                      </a>
                    )}

                    <a href="/login" style={{ marginTop: '20px' }}>
                      <button className="btn btn-danger rounded-pill" style={{ width: '230px', color: 'black' }} onClick={logoutHandler}>Logout</button>
                    </a>
                  </>
                ) : (
                  <>
                  <a href="/" style={{ marginTop: '20px' }}>
                      <button className="btn btn-light rounded-pill" style={{ width: '230px', color: 'black' }}>Home</button>
                    </a>
                  <a href="/login" style={{ marginTop: '20px' }}>
                    <button className="btn btn-light rounded-pill" style={{ width: '230px', color: 'black' }}>Login</button>
                  </a>
                  </>
                )}
              </nav>
            </div>
          </div>
          {/* end of menu */}
        </div>
      </div>
      {/* end of side bar */}
      <div className="container-fluid" style={{ marginLeft: '250px', backgroundColor: 'rgb(56, 56, 56)', height: '100vh', overflow: 'auto', position: 'relative' }}>
        <div className="row" >
          {children}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
