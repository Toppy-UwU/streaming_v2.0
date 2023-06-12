import { useState } from "react";
import axios from "axios";

import './../css/utilities.css';

import Sidebar from "../components/sidebar";
import ProgressBar from "../components/progressBar";

const UploadPage = () => {
    const uploadAPI = 'http://localhost:8900/upload';

    const [file, setFile] = useState();
    const [vidDesc, setVidDesc] = useState('');
    const [upProgress, setUpProgress] = useState('0');
    const [vidData, setVidData] = useState(null);

    const handleFileChange = (e) => {
        // console.log(e.target.files[0]);
        const tmpFile = e.target.files[0];
        setFile(tmpFile);

    };


    const handleClickUpload = async () => {

        setUpProgress('0');
        if (file) {
            const video = document.createElement('video');
            video.preload = 'metadata';
            video.src = URL.createObjectURL(file);

            video.addEventListener('loadedmetadata', function () {
                const duration = video.duration;
                const tmpData = {
                    'videoName': file.name,
                    'videoSize': file.size,
                    'videoDuration': duration,
                    'videoDesc': vidDesc
                }
                setVidData(tmpData)

                // console.log(vidData);
                const formData = new FormData();
                formData.append('video', file, file.name);
                // formData.append('data', JSON.stringify(tmpData));

                axios.post(uploadAPI, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    onUploadProgress: (progressEvent) => {
                        const progress = (progressEvent.loaded / progressEvent.total);
                        let tmp = Math.round(progress * 100)
                        setUpProgress(tmp.toString());
                    },
                })
                    .then((response) => {
                        sendConvert()
                    })
                    .catch((error) => {
                        console.error('Upload failed:', error);
                    });
            });

        } else {
            // active button after upload function
            console.log('file not found');
        }
    }

    const sendConvert = () => {

    }

    return (
        <div>
            <Sidebar>
                <div style={{ color: 'white' }}>
                    <input type="file" accept="video/*" onChange={handleFileChange} />
                    <button onClick={handleClickUpload}>upload</button>
                    {/* <p>Upload Progress: {upProgress}%</p> */}



                </div>
                <div className="container-fluid">
                    <div className="progress">
                        <ProgressBar value={upProgress + '%'} />
                    </div>
                </div>
            </Sidebar>
        </div>

    );

}

export default UploadPage;