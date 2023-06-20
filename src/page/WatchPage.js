
import Sidebar from '../components/sidebar';

import VideoPlayer from '../components/player';

import 'video.js/dist/video-js.css';

const WatchPage = () => {
    const param = new URLSearchParams(window.location.search);
    
    const user = param.get('u');
    const video = param.get('v');

    const url = 'http://localhost:80/hls/upload/'+user+'/'+video+'/'+video+'.m3u8';

    return (
        <div>
            <Sidebar>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-9'>
                        <div className='row'>
                        <VideoPlayer source={url} />
                        </div>
                        <div className='row test-bg-blue'>
                            <div className='col'>
                                <h3>Video title & infomation</h3>
                            </div>
                        </div>
                        </div>
                        <div className='col-3'>
                            <div className='row' style={{height: '100vh'}}>
                            <div className='test-bg-green'>
                                <h5>relate video show up here</h5>
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