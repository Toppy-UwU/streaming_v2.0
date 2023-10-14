import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";
import { getUser } from "../components/session";
import DataTable, { createTheme, Media } from "react-data-table-component";
import config from '../config'; // Make sure to import config properly

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
            name: 'Delete',
            cell: (row) => (
                <button type="button" className="btn btn-danger"><i className="bi bi-trash3-fill"></i></button>
            )
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
                {/* <div className="row d-flex justify-content-between align-items-center">
                    <div style={{ flex: 1, marginRight: '20px' }}>
                        <h3 className="text-white">Uploading Status</h3>
                        {console.log(uploading)}
                    </div>
                </div>
                <div className="table-responsive">
                    <table class="table table-dark table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Video</th>
                                <th scope="col">Title</th>
                                <th scope="col">Encode</th>
                                <th scope="col">Upload Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {uploading.length > 0 ? (
                                uploading.map((upload, index) => (
                                    <tr key={index}>
                                        <td> <img className="card-img-top" src={'data:image/jpeg;base64,' + upload.V_pic} style={{ borderRadius: '20px', maxHeight: '200px', maxWidth: '200px' }} alt={upload.V_title + ' thumbnail'} /></td>
                                        <td>{upload.V_title}</td>
                                        <td>{upload.V_encode}</td>
                                        <td>
                                            <div className="progress">
                                                <ProgressBar value={upload.V_permit} />
                                            </div>
                                        </td>
                                        <td><button type="button" class="btn btn-danger"><i class="bi bi-trash3"></i></button></td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colspan="5" className="text-center text-white">- No Video Upload Status! -</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div> */}
            </Sidebar>
        </div>
    );
};

export default VideoStatusPage;
