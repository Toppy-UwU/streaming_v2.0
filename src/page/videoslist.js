import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import moment from "moment";
import AdminSidebar from "../components/AdminSidebar";
import { getAPI } from '../components/callAPI';
import DataTable, { createTheme, Media } from "react-data-table-component";
import '../config'

const VideosListPage = () => {
    const [logs, setLogs] = useState([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState([]);
    document.title = "Users Videos | Administator";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAPI('uploadLog');
                setLogs(response);
                setFilter(response);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const result = logs.filter((item) => {
            return item.V_title.toLowerCase().match(search.toLocaleLowerCase());
        });
        setFilter(result);
    }, [search]);

    const columns = [
        {
            name: 'Videos',
            selector: row => <img height={120} width={160} src={`data:image/jpeg;base64, ${row.V_pic}`} alt={row.V_title+" Picture"}/>,
            hide: Media.SM
        },
        {
            name: 'Title',
            selector: row => row.V_title,
            sortable: true
        },
        {
            name: 'Owner',
            selector: row => row.U_name,
            sortable: true
        },
        {
            name: 'Date',
            selector: row => <span>{moment.utc(row.V_upload).format("DD MMMM YYYY")}</span>,
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

    if (logs !== null) {
        return (
            <AdminSidebar>
                <div className="container-fluid">
                    <br />
                    <div className='PageTitle'>
                        <h2><i className="bi bi-collection-play-fill"></i> Users Videos</h2>
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
                </div>
            </AdminSidebar>
        )
    } else {
        return (
            <AdminSidebar>
                <div className="center">
                    <div className="loading" />
                </div>
            </AdminSidebar>
        )
    }

}

export default VideosListPage;