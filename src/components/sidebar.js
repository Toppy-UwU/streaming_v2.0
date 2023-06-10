import React from 'react';
// import { getlocalData, removelocalData } from './localstorage';
import { getSessionData, removeSessionData, getlocalData, removelocalData, isSessionSet } from './session';


const Sidebar = ({ children }) => {


  if(isSessionSet('session') && isSessionSet('isLoggedIn')) {
    if (getlocalData('check') || getSessionData('check')) {
      var session = getlocalData('session');
      var isLoggedIn = getlocalData('isLoggedIn');
    } else { // check if not checked remember me
      var session = getSessionData('session');
      var isLoggedIn = getSessionData('isLoggedIn');

    }
  }

  // const permitAPI = 'http://localhost:8900/getPermit?id=' + session.U_id;
  // const [ permit, setPermit ] = useState(null);
  // fetch(permitAPI)
  //   .then(response => response.json())
  //   .then(data => {
  //     setPermit(data)
  //     console.log(permit);
  //   })
  //   .catch(error => {
  //     console.error('error:', error)
  //   })

  // const [ permit, setPermit ] = useState({'U_permit': null,'U_type': null});

  // useEffect(() => {
  //   getData();
  // }, []);

  // const getData = async () => {
  //   try {
  //     const response = await fetch(permitAPI);
  //     const permitData = await response.json();
  //     setPermit(permitData.data);
  //     console.log(permit);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };


  const logoutHandler = (e) => {
    removelocalData('session');
    removelocalData('isLoggedIn');

    removeSessionData('session');
    removeSessionData('isLoggedIn')
  }


  return (
    <div className="d-flex" style={{ minHeight: '100vh' }} id={'sideBar'}>
      <div className="position-fixed h-100" style={{ width: '250px', backgroundColor: 'gray' }}>
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
                      <div style={{ marginTop: '20px' }}>
                        <button className="btn btn-light rounded-pill" data-toggle="modal" data-target="#uploadVid" style={{ width: '230px', color: 'black' }}>Upload Video</button>
                      </div>
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
                  <a href="/login" style={{ marginTop: '20px' }}>
                    <button className="btn btn-light rounded-pill" style={{ width: '230px', color: 'black' }}>Login</button>
                  </a>
                )}

                {/* upload popup */}
                <div className="modal fade" id="uploadVid" tabIndex="-1" role="application" data-backdrop="false" aria-hidden="true" style={{ backgroundColor: 'rgba(255, 255, 255, 0.307)' }}>
                  <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content" style={{ backgroundColor: 'rgb(56, 56, 56)' }}>
                      <div className="modal-header">
                        <h5 className="modal-title" id="uploadVidTitle" style={{ color: 'white' }}>Upload Video</h5>
                      </div>
                      <form action="upload.php" method="post" encType="multipart/form-data">
                        <div className="modal-body">
                          <div className="container-fluid">
                            <div className="row">
                              <div className="col-7 rounded">
                                <div className="custom-file">
                                  <input type="file" id="selectVid" className="form-control-file" name="video" accept="video/*" />
                                  <label className="custom-file-label" htmlFor="selectVid">Select File</label>
                                </div>
                              </div>
                              <div className="col-5">
                                <label htmlFor="U_type"><h6>Video permission</h6></label>
                                <div className="form-check">
                                  <input className="form-check-input" type="radio" name="V_permit" id="permit_public" value="public" checked />
                                  <label className="form-check-label" htmlFor="permit_public">
                                    Public
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input className="form-check-input" type="radio" name="V_permit" id="permit_private" value="private" />
                                  <label className="form-check-label" htmlFor="permit_private">
                                    Private
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input className="form-check-input" type="radio" name="V_permit" id="permit_unlist" value="unlisted" />
                                  <label className="form-check-label" htmlFor="permit_unlist">
                                    unlisted
                                  </label>
                                </div>
                              </div>
                            </div>

                            <div className="row" style={{ padding: '5px' }}>
                              <input type="text" className="form-control rounded-pill" placeholder="title" name="V_title" style={{ height: '30px' }} />
                            </div>
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-danger rounded-pill" data-dismiss="modal">Cancel</button>
                          <button type="submit" className="btn btn-primary rounded-pill">Upload</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
          {/* end of menu */}
        </div>
      </div>
      {/* end of side bar */}
      <div className="container-fluid" style={{ marginLeft: '250px', backgroundColor: 'rgb(56, 56, 56)' }}>
        <div className="row">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
