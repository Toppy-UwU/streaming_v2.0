import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";
import ProgressBar from "../components/progressBar";
import { getUser} from "../components/session";
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

    return (
        <div>
            <Sidebar>
                <br /> <br />
                <div className="row d-flex justify-content-between align-items-center">
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
                </div>
            </Sidebar>
        </div>
    );
};

export default VideoStatusPage;
