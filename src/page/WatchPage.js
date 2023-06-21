
import Sidebar from '../components/sidebar';

import VideoPlayer from '../components/player';
import { getAPI } from '../components/callAPI';

import 'video.js/dist/video-js.css';
import { useState, useEffect } from 'react';
import ShowVideos from '../components/showVideo';

const WatchPage = () => {
    const param = new URLSearchParams(window.location.search);
    const [videos, setVideos] = useState(null)
    const [vidDetail, setVidDetail] = useState(null)

    const user = param.get('u');
    const video = param.get('v');

    const url = 'http://localhost:80/hls/upload/' + user + '/' + video + '/' + video + '.m3u8';
    const api = 'http://localhost:8900/getVideo/info?v=' + video

    useEffect(() => {
        fetch(api)
            .then(response => response.json())
            .then(data => {
                setVidDetail(data)
            })
            .catch(e => {
                console.error('Error:', e);
            })
    }, [])

    useEffect(() => {
        getAPI('videosPublic')
            .then(response => {
                setVideos(response);
            });
    }, [])

    const handleDownloadBtn = (e) => {

        const downloadAPI = 'http://localhost:8900/download?u='+ vidDetail.U_folder +'&v='+ vidDetail.V_encode
        
        fetch(downloadAPI)
            .then(response => {
                if (response.ok) {
                    return response.blob();
                }
            })
            .then(blob => {
                const downloadUrl = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = downloadUrl;
                a.download = vidDetail.V_title+'.mp4';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            })
            .catch(e => {
                console.error('Error:', e);
            });

    }


    if (!videos) {
        return (
            <div>
                <Sidebar>
                    <div className='center'>
                        <div className='loading' />
                    </div>
                </Sidebar>
            </div>
        )
    }

    return (
        <div style={{ backgroundColor: 'rgb(56, 56, 56)' }}>
            <Sidebar >
                <div className='container-fluid' >
                    <div className='row'>
                        <div className='col-9'>
                            <div className='row' style={{paddingBottom: '10px'}}>
                                <VideoPlayer source={url} />
                            </div>
                            <div className='row' style={{ color: 'white' }}>
                                <div className='col'>
                                    <div className='row' style={{paddingBottom: '20px'}}>
                                        <div className='col-11'>
                                            <h3>{vidDetail.V_title}</h3>
                                        </div>
                                        <div className='col-1'>
                                            <button className='btn btn-secondary rounded-pill' style={{width: '42.5px'}} onClick={handleDownloadBtn}>
                                                <span className='download-icon'></span>
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div className='row'>
                                        <div className='col-1'>
                                        <a href={'/profile?profile='+vidDetail.U_ID}  style={{textDecoration: 'none', color: 'white'}}>
                                            <img src={'data:image/jpeg;base64, ' + vidDetail.U_pro_pic} style={{ width: '50px', borderRadius: '25px' }} />
                                        </a>
                                        </div>
                                        <div className='col-2'>
                                        <a href={'/profile?profile='+vidDetail.U_ID}  style={{textDecoration: 'none', color: 'white'}}>
                                            <h4>{vidDetail.U_name}</h4>
                                            </a>
                                        </div>
                                    </div>
                                <br/>
                                <div className='row'>
                                    <div className='col'>
                                        <div className='card' style={{backgroundColor: 'rgb(108, 108, 108)'}}>
                                            <div className='card-body'>
                                                <div className='row'>
                                                    <h6>view: {vidDetail.V_view}     upload: {vidDetail.V_upload}</h6>
                                                </div>
                                                <br/>
                                                <div className='row'>
                                                    <h6>video description</h6>
                                                    <p>{vidDetail.V_desc}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                </div>
                            </div>
                        </div>
                        <div className='col-3'>
                            <div className='row' style={{ height: '100vh'}}>
                                <div className='' >
                                    <ShowVideos videos={videos} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Sidebar>
        </div>
    )
}

export default WatchPage