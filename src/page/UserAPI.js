import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import DataTable, { createTheme, Media } from "react-data-table-component";
import config from '../config'; // Make sure to import config properly
import { Link } from "react-router-dom";

const UserAPI = () => {
    document.title = "Videos API";
    const [api, setAPI] = useState([]);

    const initialStorage = [
        { video: 1, title: 'Login', link: 'http://localhost:3000/watch?u=INIsUKmUO2Pn&v=gzIBQRkGAoPd', time: '13/09/2023' },
        { video: 2, title: 'Logout', link: 'http://localhost:3000/watch?u=INIsUKmUO2Pn&v=gzIBQRkGAoPd', time: '13/09/2023' },
        { video: 3, title: 'Login', link: 'http://localhost:3000/watch?u=INIsUKmUO2Pn&v=gzIBQRkGAoPd', time: '16/09/2023' },
        { video: 4, title: 'Login', link: 'http://localhost:3000/watch?u=INIsUKmUO2Pn&v=gzIBQRkGAoPd', time: '20/09/2023' },
        { video: 5, title: 'Logout', link: 'http://localhost:3000/watch?u=INIsUKmUO2Pn&v=gzIBQRkGAoPd', time: '22/09/2023' },
        { video: 6, title: 'Login', link: 'http://localhost:3000/watch?u=INIsUKmUO2Pn&v=gzIBQRkGAoPd', time: '22/09/2023' },
        { video: 7, title: 'Logout', link: 'http://localhost:3000/watch?u=INIsUKmUO2Pn&v=gzIBQRkGAoPd', time: '25/09/2023' },
        { video: 8, title: 'Login', link: 'http://localhost:3000/watch?u=INIsUKmUO2Pn&v=gzIBQRkGAoPd', time: '28/09/2023' },
        { video: 9, title: 'Login', link: 'http://localhost:3000/watch?u=INIsUKmUO2Pn&v=gzIBQRkGAoPd', time: '3/10/2023' },
        { video: 10, title: 'Logout', link: 'http://localhost:3000/watch?u=INIsUKmUO2Pn&v=gzIBQRkGAoPd', time: '10/10/2023' },
    ];

    useEffect(() => {
        setAPI(initialStorage)
    }, []);
    const columns = [
        {
            name: 'Video',
            selector: row => row.video,
        },
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true
        },
        {
            name: 'Date',
            selector: row => row.time,
        },
        {
            name: 'Link',
            selector: row => row.link,
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
                            <Link className="dropdown-item" to="#">
                                <span><i className="bi bi-clipboard"></i> Copy URL</span>
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
        },
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
        <Sidebar>
            <div className="container-fluid">
                <br />
                <div className='PageTitle'>
                    <h2><i className="bi bi-link"></i> Videos API</h2>
                </div>

                <div className='user-table'>
                    <div className="card">
                        <div className="card-body">
                            <DataTable
                                customStyles={tableHeaderStyle}
                                columns={columns}
                                data={api}
                                pagination
                                fixedHeader
                                highlightOnHover
                                theme="solarized"
                            ></DataTable>
                        </div>
                    </div>
                    <br />
                </div>
            </div>
        </Sidebar>
    )
}
export default UserAPI;