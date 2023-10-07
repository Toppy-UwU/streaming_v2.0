import Sidebar from '../components/sidebar';
import { useEffect, useState } from 'react';
import { getlocalData } from "../components/session"
import '../config';
import moment from 'moment';
import DataTable, { createTheme, Media } from "react-data-table-component";
import { Link } from 'react-router-dom';
import VideoUpdateModal from '../components/videoUpdateModal';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState([])
  document.title = "CS-HUB";
  const ip = global.config.ip.ip;
  var session = getlocalData('session');
  const getUserVideo = ip + '/getVideos/profile?u=' + session.U_id + '&p=all';

  useEffect(() => {
    fetch(getUserVideo)
      .then(response => response.json())
      .then(data => {
        setVideos(data);
        setFilter(data);
      })
      .catch(() => { });
  }, [getUserVideo])

  useEffect(() => {
    const result = videos.filter((item) => {
      return item.V_title.toLowerCase().match(search.toLocaleLowerCase());
    });
    setFilter(result);
  }, [search]);

  const columns = [
    {
      name: 'Video',
      selector: row => <img height={120} width={160} style={{ borderRadius: "10px" }} src={`data:image/jpeg;base64, ${row.V_pic}`} alt={row.V_title + " Picture"} />,
      hide: Media.SM
    },
    {
      name: 'Title',
      selector: row => row.V_title,
      sortable: true
    },
    {
      name: 'Permit',
      selector: row => row.V_permit.toUpperCase(),
      sortable: true,
    },
    {
      name: 'Date',
      selector: row => <span>{moment.utc(row.V_upload).format("DD MMMM YYYY")}</span>,
      sortable: true,
      hide: Media.SM
    },
    {
      name: 'Views',
      selector: row => row.V_view,
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
              <Link className="dropdown-item" to={'/watch?u=' + row.U_folder + '&v=' + row.V_encode}>
                <span><i className="bi bi-play-btn"></i> View</span>
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="#" data-bs-toggle="modal" data-bs-target="#UpdateVideoModal">
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

  return (

    <div>
      <Sidebar>
        <div className='container-fluid'>
          <br />
          <div className='PageTitle'>
            <h2><i className="bi bi-collection-play-fill"></i> {session.username} Videos</h2>
          </div>

          <div className='user-table'>
            <div className="card">
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
            <br />
          </div>
          <VideoUpdateModal id={videos.U_ID} V_id={videos.V_ID} desc={videos.V_desc} title={videos.V_title} permit={videos.V_permit} path={videos.U_folder} encode={videos.V_encode} tags={videos.V_title} />
        </div>
      </Sidebar>
    </div>

  );
};

export default Home;