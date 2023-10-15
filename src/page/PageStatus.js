import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";
import { getUser } from "../components/session";
import DataTable, { createTheme, Media } from "react-data-table-component";
import config from '../config'; // Make sure to import config properly
import Swal from "sweetalert2";

const VideoStatusPage = () => {
    document.title = "Uploading Status";

    const user = getUser();
    const ip = config.ip.ip; // Use the imported config properly

    const gatUploadApi = ip + '/get/videos/upload?u=' + user;

    const [uploading, setUploading] = useState([]); // Initialize with an empty array

    useEffect(() => {
        const fetchData = async () => { // Use async/await for axios request
            try {
                const response = await axios.get(gatUploadApi);
                const data = response.data;
                setUploading(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

        const interval = setInterval(fetchData, 10000); // Fetch data every 10 seconds

        return () => clearInterval(interval);
    }, [gatUploadApi]); // Add dependency to useEffect

    const handleDeleteVideoDialog = (row) => {
        Swal.fire({
            title: 'Are you sure to delete?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete'
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete(row);
            }
        })
    }

    const handleDelete = (row) => {
        Swal.fire({
            title: "It work!",
            icon: "success",
            text: "Data = "+row,
            showConfirmButton: false,
            timer:2000,
            didClose: () => {

            }
        })
        // fetch({})
    }

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
            name: 'encode',
            selector: row => row.V_encode,
            hide: Media.SM
        },
        {
            name: 'Progress',
            selector: row => row.V_permit,
            sortable: true,
        },
        {
            name: 'Action',
            cell: row => <button type="button" class="btn btn-danger" onClick={() => handleDeleteVideoDialog(row.V_title)}><i className="bi bi-trash3-fill"></i> <span className="spanSMHide">Delete</span></button>
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
                <div className="container-fluid">
                    <br />
                    <div className='PageTitle'>
                        <h2><i className="bi bi-cloud-upload-fill"></i> Uploading Status</h2>
                    </div>

                    <div className='user-table'>
                        <div className="card">
                            <div className="card-body">
                                <DataTable
                                    customStyles={tableHeaderStyle}
                                    columns={columns}
                                    data={uploading}
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
        </div>
    );
};

export default VideoStatusPage;
