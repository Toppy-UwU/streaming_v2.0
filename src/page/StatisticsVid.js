import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import DataTable, { createTheme, Media } from "react-data-table-component";
import config from '../config'; // Make sure to import config properly

const UserStats = () => {
    const [stats, setStats] = useState([]);
    document.title = "Statistics";

    const initialStorage = [
        { lid: 1, action: 'Login', time: '13/09/2023', ip: '10.10.25.23' },
        { lid: 2, action: 'Logout', time: '17/09/2023', ip: '192.10.25.23' },
        { lid: 3, action: 'Login', time: '18/09/2023', ip: '192.10.25.23' },
        { lid: 4, action: 'Login', time: '18/09/2023', ip: '10.10.25.23' },
        { lid: 5, action: 'Logout', time: '21/09/2023', ip: '192.168.24.23' },
        { lid: 6, action: 'Login', time: '22/09/2023', ip: '192.56.0.23' },
        { lid: 7, action: 'Logout', time: '22/09/2023', ip: '10.10.25.23' },
        { lid: 8, action: 'Login', time: '27/09/2023', ip: '192.10.25.23' },
        { lid: 9, action: 'Login', time: '3/10/2023', ip: '10.10.25.23' },
        { lid: 10, action: 'Logout', time: '7/10/2023', ip: '192.10.254.23' },
    ];

    useEffect(() => {
        setStats(initialStorage);
    }, []);

    const columns = [
        {
            name: 'LID',
            selector: row => row.lid,
            sortable: true,
            hide: Media.SM
        },
        {
            name: 'Action',
            selector: row => row.action,
            sortable: true
        },
        {
            name: 'Timestamp',
            selector: row => row.time,
            sortable: true
        },
        {
            name: 'IP',
            selector: row => row.ip,
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
                    <h2><i className="bi bi-graph-up"></i> Statistics</h2>
                </div>

                <div className="user-table">
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <DataTable
                                        customStyles={tableHeaderStyle}
                                        columns={columns}
                                        data={stats}
                                        pagination
                                        fixedHeader
                                        subHeader
                                        subHeaderComponent={
                                            <div className="text-align-left">
                                                <h5 className="text-white fw-bold">
                                                    <i className="bi bi-person-fill"></i> Self Watch
                                                </h5>
                                            </div>
                                        }
                                        highlightOnHover
                                        theme="solarized"
                                    ></DataTable>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <DataTable
                                        customStyles={tableHeaderStyle}
                                        columns={columns}
                                        data={stats}
                                        pagination
                                        fixedHeader
                                        subHeader
                                        subHeaderComponent={
                                            <div className="text-align-left">
                                                <h5 className="text-white fw-bold">
                                                    <i className="bi bi-person-fill"></i> Other Watch
                                                </h5>
                                            </div>
                                        }
                                        highlightOnHover
                                        theme="solarized"
                                    ></DataTable>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Sidebar>
    )
}
export default UserStats;