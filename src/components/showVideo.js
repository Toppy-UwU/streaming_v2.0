import '../css/video.css'
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

function formatTimeDifference(pastTime) {
    const currentTime = new Date();
    const timeDifferenceInSeconds = Math.floor((currentTime - pastTime) / 1000);

    if (timeDifferenceInSeconds < 60) {
        return 'just now';
    } else if (timeDifferenceInSeconds < 3600) {
        const minutes = Math.floor(timeDifferenceInSeconds / 60);
        return `${minutes} min ago`;
    } else if (timeDifferenceInSeconds < 86400) {
        const hours = Math.floor(timeDifferenceInSeconds / 3600);
        return `${hours} hour ago`;
    } else if (timeDifferenceInSeconds < 604800) {
        const days = Math.floor(timeDifferenceInSeconds / 86400);
        return `${days} day ago`;
    } else if (timeDifferenceInSeconds < 2419200) {
        const weeks = Math.floor(timeDifferenceInSeconds / 604800);
        return `${weeks} week ago`;
    } else if (timeDifferenceInSeconds < 29030400) {
        const months = Math.floor(timeDifferenceInSeconds / 2419200);
        return `${months} month ago`;
    } else {
        const years = Math.floor(timeDifferenceInSeconds / 29030400);
        return `${years} year ago`;
    }
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    let formattedTime = '';
    if (hours > 0) {
        formattedTime += `${hours}:`;
    }
    formattedTime += `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    return formattedTime;
}

const handleClick = () => {
    console.log('clicked');
    Swal.fire({
        icon: 'question',
        title: 'Try Again!',
        text: 'Please Enter Your Keyword to Search!',
    })
}

function ShowVideos(props) {
    try {
        return (
            <div className="container-fluid">
                <div className="row">
                    {props.videos.map((video) => (
                        <div className="col-lg-3 col-md-4 col-sm-6 mb-3" key={video.V_ID}>
                            <div className="video-card">
                                <Link to={'/watch?u=' + video.U_folder + '&v=' + video.V_encode} style={{ textDecoration: 'none', color: 'white' }}>
                                    <div style={{ position: 'relative' }}>
                                        <img className="card-img-top" src={'data:image/jpeg;base64,' + video.V_pic} style={{ borderRadius: '20px', aspectRatio: '16/9' }} alt={video.V_title + ' thumbnail'} />
                                        <div style={{ position: 'absolute', bottom: '8px', right: '8px', backgroundColor: 'black', borderRadius: '4px', padding: '4px' }}>
                                            <h6 style={{ margin: 0, color: 'white', textAlign: 'right' }}>{formatTime(video.V_length)}</h6>
                                        </div>
                                    </div>
                                    <div style={{ marginLeft: '8px', marginRight: '8px', marginTop: '10px' }}>
                                        <div>
                                            <div className='row'>
                                                <div className='col-10'>
                                                    <h5>{video.V_title}</h5>
                                                </div>
                                                <div className='col-2'>
                                                    <i class="bi bi-three-dots-vertical"></i>
                                                </div>
                                            </div>
                                            <div className='row' style={{ opacity: '60%' }}>
                                                <div className='col-12'>
                                                    <a href={'/profile?profile=' + video.U_ID} className='href-noline-w'>
                                                        <h6>{video.U_name}</h6>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className='row' style={{ opacity: '60%' }}>
                                                <div className='col-12'>
                                                    <h6>{video.V_view} views • {formatTimeDifference(new Date(video.V_upload))}</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>



            // <div className="container-fluid">
            //     <div className="row">
            //         {props.videos.map((video) => (
            //             <div className="col-lg-3 col-md-4 col-sm-6 mb-3" key={video.V_ID}>
            //                 <div className="video-card">
            //                     <a href={'/watch?u=' + video.U_folder + '&v=' + video.V_encode} style={{ textDecoration: 'none', color: 'white' }}>
            //                         <img className="card-img-top" src={'data:image/jpeg;base64,' + video.V_pic} style={{ borderRadius: '20px', aspectRatio: '16/9' }} alt={video.V_title + ' thumbnail'} />
            //                         <div style={{ marginLeft: '8px', marginRight: '8px', marginTop: '10px' }}>
            //                             <div>
            //                                 <div className='row'>
            //                                     <div className='col-7'>
            //                                         <h5 className='fs-5'>{video.V_title}</h5>
            //                                     </div>
            //                                     <div className='col-4' style={{ textAlign: 'right' }}>
            //                                         <h6>{formatTime(video.V_length)}</h6>
            //                                     </div>
            //                                     <div className='col-1' style={{ textAlign: 'right' }}>
            //                                         <i class="bi bi-three-dots-vertical"></i>
            //                                     </div>
            //                                 </div>
            //                                 <div className='row' style={{ opacity: '60%' }}>
            //                                     <div className='col-12'>
            //                                         <a href={'/profile?profile=' + video.U_ID} className='href-noline-w'>
            //                                             <h6>{video.U_name}</h6>
            //                                         </a>
            //                                     </div>
            //                                 </div>
            //                                 <div className='row' style={{ opacity: '60%' }}>
            //                                     <div className='col-12'>
            //                                         <h6>{video.V_view} views • {formatTimeDifference(new Date(video.V_upload))}</h6>
            //                                     </div>
            //                                 </div>
            //                             </div>
            //                         </div>
            //                     </a>
            //                 </div>
            //             </div>
            //         ))}
            //     </div>
            // </div>
        )
    } catch (error) {
        return (
            <div className='center'>
                <div className='loading' />
            </div>
        )
    }




}

export default ShowVideos;