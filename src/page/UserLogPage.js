import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import DataTable, { createTheme, Media } from "react-data-table-component";
import config from '../config'; // Make sure to import config properly

const UserLog = () => {
    const [log, setLog] = useState([]);
    document.title = "Log";

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
        setLog(initialStorage);
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
                    <h2><i className="bi bi-info-circle-fill"></i> Log</h2>
                </div>

                <div className='user-table'>
                    <div className="card">
                        <div className="card-body">
                            <DataTable
                                customStyles={tableHeaderStyle}
                                columns={columns}
                                data={log}
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
export default UserLog;