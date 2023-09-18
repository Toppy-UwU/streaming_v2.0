import React, { useEffect, useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import NotFoundPage from './notfoundPage';
import { getAPI } from '../components/callAPI';
import './../css/utilities.css';
import { isAdmin } from '../components/session';
import "../css/admin.css"
import Swal from 'sweetalert2';

const Home = () => {
  const [users, setUsers] = useState(null);
  document.title = "Dashboard";
  const [serverRes, setServerRes] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAPI('serverRes');
        setServerRes(response);
      } catch (error) {
        // Handle error if the API request fails
        console.error(error);
      }
    };

    fetchData();
    // set timer every 10 sec
    const interval = setInterval(fetchData, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getAPI('users')
      .then(response => {
        setUsers(response);
      });

  }, []);

  function sumValue(users) {
    let sum = 0;
    for (const item of users) {
      if (item.U_permit === 1) {
        sum += 1;
      }
    }
    return sum;
  }

  if (users === null || serverRes === null) {

    return (
      <AdminSidebar>
        <div className="center">
          <div className="loading" style={{ marginTop: '25%' }}></div>
        </div>
      </AdminSidebar>
    )
  }

  if (isAdmin()) {
    return (
      <AdminSidebar>
        <div className='container-fluid content'>
          <div className='PageTitle'>
            <h2>Dashboard</h2>
          </div>

          <div className='showStatus'>
            <div class="row">
              <div class="col-sm-4 mb-3 mb-sm-0">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">{users.length} <span class="bi bi-person-check-fill"></span> </h5>
                    <p class="card-text">Total Users</p>
                  </div>
                </div>
              </div>
              <div class="col-sm-4 mb-3 mb-sm-0">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">{users.reduce((a, user) => a + parseFloat(user.U_vid), 0)} <span class="bi bi-file-earmark-play"></span></h5>
                    <p class="card-text">Total Videos </p>
                  </div>
                </div>
              </div>
              <div class="col-sm-4 mb-3 mb-sm-0">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">
                      {sumValue(users)}
                      <span class="bi bi-check2-square"></span>
                    </h5>
                    <p class="card-text">Upload Permit</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='showServerStatus'>
            <div class="row">
              <div class="col-sm-4 mb-3 mb-sm-0">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">{serverRes.CPU_Used}<span class="bi bi-cpu"></span> </h5>
                    <p class="card-text">CPU Used</p>
                  </div>
                </div>
              </div>
              <div class="col-sm-4 mb-3 mb-sm-0">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">{serverRes.Disk_Used} of {serverRes.Disk_Total} <span class="bi bi-hdd"></span></h5>
                    <p class="card-text">Disk Used </p>
                  </div>
                </div>
              </div>
              <div class="col-sm-4 mb-3 mb-sm-0">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">
                      {serverRes.Disk_Free}
                      <span class="bi bi-sd-card"></span>
                    </h5>
                    <p class="card-text">Disk Free</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='user-table'>
            <div className='table-responsive'>
              <table class="table table-dark table-hover">
                <thead>
                  <tr>
                    <th scope='col'>UID</th>
                    <th scope='col'>Name</th>
                    <th scope='col'>E-mail</th>
                    <th scope='col'>Upload Permit</th>
                    <th scope='col'>Role</th>
                    <th scope='col'>Videos</th>
                    <th scope='col'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.U_id}>
                      <td>{user.U_id}</td>
                      <td>{user.U_name}</td>
                      <td>{user.U_mail}</td>
                      <td>{user.U_permit === 1 ? "Yes" : "No"}</td>
                      <td>{user.U_type.toUpperCase()}</td>
                      <td>{user.U_vid}</td>
                      <td><button type="button" class="btn btn-secondary"><i className="bi bi-gear"></i></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </AdminSidebar>
    );
  } else {
    return (
      <NotFoundPage />
    );
  }
};

export default Home;