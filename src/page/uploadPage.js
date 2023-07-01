import { useState } from "react";
import axios from "axios";

import './../css/utilities.css';
import './../css/upload.css';

import Sidebar from "../components/sidebar";
import ProgressBar from "../components/progressBar";

import { getSessionData, getlocalData } from "../components/session";

const UploadPage = () => {

    var session
    var token

    if (getlocalData('check')) {
        // console.log('in local');
        session = getlocalData('session');
        token = getlocalData('token')
    } else {
        // check if not checked remember me
        session = getSessionData('session');
         token = getSessionData('token')
    }


    const uploadAPI = 'http://localhost:8900/upload';

    const [file, setFile] = useState();
    const [vidDesc, setVidDesc] = useState('');
    const [upProgress, setUpProgress] = useState('0');
    const [vidPermit, setVidPermit] = useState('public');
    const [tmp, setTmp] = useState('');
    const [videoUrl, setVideoUrl] = useState(null);
    const [videoKey, setVideoKey] = useState(0);

    const handleFileChange = (e) => {
        // console.log(e.target.files[0]);
        const tmpFile = e.target.files[0];
        if (tmpFile) {
            setFile(tmpFile);
            setTmp(tmpFile.name);
            setVideoUrl(URL.createObjectURL(tmpFile));
            setVideoKey(videoKey + 1);
        }

    };

    const handleVidName = (e) => {
        setTmp(e.target.value)
        e.preventDefault();
    }

    const handleVidDesc = (e) => {
        setVidDesc(e.target.value)
        e.preventDefault();
    }

    const handleSelect = (e) => {
        setVidPermit(e.target.value);
    }


    const handleClickUpload = async () => {

        setUpProgress('0');
        if (file) {

            document.getElementById('submitBtn').disabled = true;
            document.getElementById('cancleBtn').disabled = true;

            const video = document.createElement('video');
            video.preload = 'metadata';
            video.src = URL.createObjectURL(file);

            video.addEventListener('loadedmetadata', function () {
                const duration = video.duration;
                const w = video.videoWidth;
                const h = video.videoHeight;
                const type = file.type.split('/').pop(); // video/mp4 -> [video, mp4] -> mp4
                const tmpData = {
                    'videoName': tmp,
                    'videoOriginName': file.name,
                    'videoSize': file.size,
                    'videoDuration': duration,
                    'videoDesc': vidDesc,
                    'videoType': type,
                    'videoOwner': session.U_id,
                    'videoPermit': vidPermit,
                    'videoThumbnail': '',
                    'path': session.U_folder,
                    'width': w,
                    'height': h
                    // encode included
                }
                // setVidData(tmpData)

                console.log(tmpData);
                const formData = new FormData();
                formData.append('video', file, file.name);
                formData.append('data', JSON.stringify(tmpData));

                axios.post(uploadAPI, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + token
                    },
                    onUploadProgress: (progressEvent) => {
                        const progress = (progressEvent.loaded / progressEvent.total);
                        let tmp = Math.round(progress * 100)
                        setUpProgress(tmp.toString());
                        if (tmp === 100.0 || tmp === 100) {
                            console.log('done upload');
                        }
                    },
                })
                    .then((response) => {
                        alert('Upload Success\nConverting Video');
                        window.location.href='/';
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

    const cardClick = () => {
        document.getElementById('uploadBtn').click()
        // handleClickUpload
    }

    const logTest = () => {
        console.log('work!!!');
        console.log(vidPermit);
    }

    return (
        <div>
            <Sidebar>
                <div className="container-fluid">
                    <div className="card card-margin" style={{ marginTop: '6%', backgroundColor: 'rgb(44,48,52)' }}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-7">
                                    <div>
                                        {videoUrl ? (
                                            <div className="card" style={{ height: '65.7vh' }}>
                                                <div className="card-body">
                                                    <video key={videoKey} controls style={{ width: '100%' }} >
                                                        <source src={videoUrl} type="video/mp4" />
                                                    </video>

                                                    <div className="center">
                                                        <button className="btn btn-primary" onClick={cardClick}>
                                                            Change Video
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                        ) : (
                                            <div className="card upload-card" onClick={cardClick} style={{ height: '65.7vh' }}>
                                                <div className="card-body">
                                                    <h4 className="card-title center" style={{ marginTop: '20%' }}>Video Upload</h4>
                                                    <p className="card-text center">Choose a video to upload.</p>
                                                </div>
                                                {/* <input className="form-control-file" id="uploadBtn" type="file" accept="video/*" style={{ display: 'none' }} onChange={handleFileChange} /> */}
                                            </div>
                                        )}

                                        <input className="form-control-file" id="uploadBtn" type="file" accept="video/*" style={{ display: 'none' }} onChange={handleFileChange} />
                                    </div>
                                </div>
                                <div className="col-5" style={{color: 'white'}}>
                                    <div className="row" >
                                        <h4>Video Name</h4>
                                        <div className="input-group row mb-3">
                                            <input type="text" className="form-control" placeholder='' value={tmp} onChange={handleVidName} ></input>
                                        </div>
                                    </div>
                                    <div className="input-group row">
                                        <h4>Video Description</h4>
                                        <textarea className="form-control" onChange={handleVidDesc} rows="4"></textarea>
                                    </div>
                                    <div className="input-group row" style={{ marginTop: '15px' }}>
                                        <h4>Video Permission</h4>
                                        <select className="form-control custom-select mb-3" value={vidPermit} onChange={handleSelect}>
                                            <option value='public'>Public</option>
                                            <option value="private">Private</option>
                                            <option value="unlisted">Unlisted</option>
                                        </select>
                                    </div>
                                    <div className="row" style={{ marginTop: '10%' }}>
                                        <div className="col btn-margin center">
                                            <button className="btn btn-primary rounded-pill" style={{ flex: '1', height: '130%' }} id="submitBtn" onClick={handleClickUpload}>upload</button>
                                            <button className="btn btn-danger rounded-pill" style={{ flex: '1', height: '130%' }} id="cancleBtn" onClick={logTest}>cancle</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br></br>
                            <div className="row" style={{ marginLeft: '2px', marginRight: '2px' }}>
                                <div className="col-12">
                                    <div className="progress">
                                        <ProgressBar value={upProgress + '%'} />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </Sidebar>
        </div>

    );

}

export default UploadPage;