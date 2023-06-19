import '../css/video.css'


function ShowVideos(props) {

    return (
        <div className="container-fluid" style={{ flexWrap: 'wrap' }}>
            <div className="row">
                {props.videos.map((video) => ( 
                    <div className="card video-card " style={{ width: '300px' }} key={video.V_ID}>
                        <a href={'/watch?u=' + video.U_folder + '&v=' + video.V_encode} style={{textDecoration: 'none', color: 'black'}}>
                            <img className="card-img-top " src={'data:image/jpeg;base64,' + video.V_pic} />
                            <div className="card-body ">
                                <h4>
                                    {video.V_title}
                                </h4>
                            </div>
                        </a>
                    </div>

                ))}
            </div>
        </div>
    )
}

export default ShowVideos;