import React, { useEffect, useState } from 'react';
import DataTable, { createTheme, Media } from "react-data-table-component";
import { Link } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import NotFoundPage from './notfoundPage';
import { getAPI } from '../components/callAPI';
import './../css/utilities.css';
import { isAdmin } from '../components/session';
import "../css/admin.css"
import Swal from 'sweetalert2';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState([]);

  const [tags, setTags] = useState([]);
  const [searchTag, setSearchTag] = useState('');
  const [filterTag, setFilterTag] = useState([]);

  document.title = "Dashboard";

  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        const response = await getAPI('users');
        setUsers(response);
        setFilter(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchDataTag = async () => { //fetch Tags from DB
      try {
        const response = await getAPI('tags');
        setTags(response);
        setFilterTag(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataUser();
    fetchDataTag();

  }, []);

  useEffect(() => {
    const result = users.filter((item) => {
      return item.U_name.toLowerCase().match(search.toLocaleLowerCase());
    });
    setFilter(result);
  }, [search]);

  useEffect(() => { //handle table search
    const result = tags.filter((item) => {
      return item.T_name.toLowerCase().match(searchTag.toLocaleLowerCase());
    });
    setFilterTag(result);
  }, [searchTag]);

  const columns = [
    {
      name: 'Name',
      selector: row => row.U_name,
      sortable: true
    },
    {
      name: 'E-mail',
      selector: row => row.U_mail,
      sortable: true,
      hide: Media.SM
    },
    {
      name: 'Upload Permit',
      selector: row => row.U_permit,
      sortable: true,
      cell: (row) => (row.U_permit === 1 ? "Yes" : "No"),
      hide: Media.SM
    },
    {
      name: 'Role',
      selector: row => row.U_type,
      sortable: true,
      cell: (row) => row.U_type.toUpperCase()
    },
    {
      name: 'Videos',
      selector: row => row.U_vid,
      sortable: true,
      hide: Media.SM
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id={`dropdown-${row.id}`}
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="bi bi-gear"></i>
          </button>
          <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby={`dropdown-${row.id}`}>
            <li>
              <Link className="dropdown-item" to={`/profile?profile=${row.U_id}`}>
                <span><i className="bi bi-person"></i> View Profile</span>
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="#">
                <span><i className="bi bi-gear"></i> Setting</span>
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="#">
                <span><i className="bi bi-trash3"></i> Delete</span>
              </Link>
            </li>
          </ul>
        </div>
      ),
    }
  ]

  const columnsTag = [
    {
      name: 'Tag',
      selector: row => row.T_name,
      sortable: true,
      cell: (row) => (
        <Link className="text-decoration-none text-white" to={"/tag?tag=" + row.T_name}>{row.T_name}</Link>
      )
    },
    {
      name: 'Action',
      cell: (row) => (
        // <button className="btn btn-danger" onClick={() => handleDeleteTagDialog(row.T_ID)}>Delete</button>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id={`dropdown-${row.id}`}
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="bi bi-gear"></i>
          </button>
          <ul className="dropdown-menu" aria-labelledby={`dropdown-${row.id}`}>
            <li>
              <Link className="dropdown-item" to={"/tag?tag=" + row.T_name}>
                <span><i className="bi bi-file-earmark-play"></i> View Videos</span>
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="#">
                <span><i className="bi bi-trash3"></i> Delete</span>
              </Link>
            </li>
          </ul>
        </div>
      )
    }
  ]

  const tableHeaderStyle = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "16px"
      }
    },
    cells: {
      style: {
        fontSize: "16px",
      }
    },
    background: {
      default: "#2C3034"
    }
  }

  createTheme('solarized', {
    text: {
      primary: '#FFFFFF',
      secondary: '#BDC0C5',
    },
    background: {
      default: '#2C3034',
    },
    context: {
      background: '#222E3C',
      text: '#FFFFFF',
    },
    divider: {
      default: '#073642',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
    },
  }, 'dark');

  function sumValue(users) {
    let sum = 0;
    for (const item of users) {
      if (item.U_permit === 1) {
        sum += 1;
      }
    }
    return sum;
  }

  // if (users === null) {

  //   return (
  //     <AdminSidebar>
  //       <div className="center">
  //         <div className="loading" style={{ marginTop: '25%' }}></div>
  //       </div>
  //     </AdminSidebar>
  //   )
  // }

  if (isAdmin()) {
    return (
      <AdminSidebar>
        <div className='container-fluid content'>
          <div className='PageTitle'>
            <h2><i className="bi bi-box-fill"></i> Dashboard</h2>
            <p>Welcome to Administator Dashboard!</p>
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
                    <h5 class="card-title">{users.reduce((a, user) => a + parseFloat(user.U_vid), 0)} <span class="bi bi-file-earmark-play-fill"></span></h5>
                    <p class="card-text">Total Videos </p>
                  </div>
                </div>
              </div>
              <div class="col-sm-4 mb-3 mb-sm-0">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">
                      {sumValue(users)}
                      <span class="bi bi-cloud-check-fill"></span>
                    </h5>
                    <p class="card-text">Upload Permit</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='user-table'>
            <div className='row'>
              <div className='col-md-9 mb-3'>
                <div className="card">
                  <div className='card-header'>
                    <h4 className='text-white fw-bold'><i className="bi bi-people-fill"></i> Users</h4>
                  </div>
                  <div className="card-body">
                    <DataTable
                      customStyles={tableHeaderStyle}
                      columns={columns}
                      data={filter}
                      pagination
                      fixedHeader
                      highlightOnHover
                      theme="solarized"
                      subHeader
                      subHeaderComponent={
                        <input type="text"
                          className="w-25 form-control"
                          placeholder="Search..."
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      }
                    ></DataTable>
                  </div>
                </div>
              </div>
              <div className='col-md-3'>
                <div className="card">
                  <div className='card-header'>
                    <h4 className='text-white fw-bold'><i className="bi bi-tag-fill"></i> Tags</h4>
                  </div>
                  <div className="card-body">
                    <DataTable
                      customStyles={tableHeaderStyle}
                      columns={columnsTag}
                      data={filterTag}
                      pagination
                      fixedHeader
                      highlightOnHover
                      theme="solarized"
                      subHeader
                      subHeaderComponent={
                        <input type="text"
                          className="w-25 form-control"
                          placeholder="Search..."
                          value={searchTag}
                          onChange={(e) => setSearchTag(e.target.value)}
                        />
                      }
                    ></DataTable>
                  </div>
                </div>
              </div>
            </div>
            <br />
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