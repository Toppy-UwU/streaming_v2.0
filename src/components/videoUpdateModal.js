import { useState } from "react"
import { getToken } from "./session";


const VideoUpdateModal = (props) => {
    // desc, title, permit

    const [title, setTitle] = useState(props.title);
    const [desc, setDesc] = useState(props.desc);
    const [permit, setPermit] = useState(props.permit);
    const [isConfirm, setIsConfirm] = useState(false);

    const updateApi = 'http://localhost:8900/update/video/user';
    const deleteApi = 'http://localhost:8900/delete/video/user';

    const handleSubmit = () => {
        // console.log(props.id);
        // console.log(title);
        // console.log(desc);
        // console.log(permit);
        const tmp = ({
            'U_id': props.id,
            'title': title,
            'desc': desc,
            'permit': permit,
            'encode': props.encode
        })
        const token = getToken();

        fetch(updateApi, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(tmp)
        })
            .then(response => {
                if (response.ok) {
                    props.update();
                }else {
                    console.log(response);
                }
            })
            .catch((e) => {
                console.error();
            })
    }

    const handleTitle = (e) => {
        setTitle(e.target.value);
        e.preventDefault();
    }

    const handleDesc = (e) => {
        setDesc(e.target.value);
        e.preventDefault();
    }

    const handlePermit = (e) => {
        setPermit(e.target.value);
    }

    const handleConfirm = () => {
        setIsConfirm(true);
    }

    const cancleConfirm = () => {
        setIsConfirm(false);
    }

    const handleDelete = () => {
        const tmp = {
            'U_id': props.id,
            'U_folder': props.path,
            'V_encode': props.encode
        }
        const token = getToken();

        fetch(deleteApi, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(tmp)
        })
            .then(response => {
                if (response.ok) {
                    window.location.href = '/'
                }
            })
            .catch((e) => {

            })
    }

    return (
        <div className='container-fluid'>
            <div className='row' style={{ color: 'white' }}>
                <div className='col center'><h5>Video Setting</h5></div>
            </div>
            <div className='row'>
                <div className='col' style={{ color: 'white' }}>
                    <form>
                        <h5>
                            <div>
                                <label htmlFor='nameInput'>Video Title</label>
                                <input type="text" className="from-control" id="titleInput" value={title} onChange={handleTitle} style={{ width: '100%' }} />
                            </div>
                            <br />
                            <div>
                                <label htmlFor='mailInput'>Video Description</label>
                                {/* <input type="text" className="from-control" id="descInput" value={desc} onChange={handleDesc} style={{ width: '100%' }} /> */}
                                <textarea className="form-control" value={desc} onChange={handleDesc} rows="4"></textarea>
                            </div>
                        </h5>

                    </form>
                </div>

            </div>
            <div className="row" style={{color: 'white', marginBottom: '10px'}}>
            

                <div className="col">
                    <h5>Video Permission</h5>
                    <input type="checkbox" value={'public'} checked={permit === 'public'} onChange={handlePermit} style={{ marginRight: '5px' }} />
                    <label>Public</label>
                    <br />
                    <input type="checkbox" value={'private'} checked={permit === 'private'} onChange={handlePermit} style={{ marginRight: '5px' }} />
                    <label>Private</label>
                    <br />
                    <input type="checkbox" value={'unlisted'} checked={permit === 'unlisted'} onChange={handlePermit} style={{ marginRight: '5px' }} />
                    <label>Unlisted</label>
                </div>
                <div className="col">
                    <h5>Delete Video</h5>
                    {!isConfirm ? (
                        <button className="btn btn-danger" onClick={handleConfirm}>Delete</button>
                    ) : (
                        <div>
                            <button className="btn btn-primary" onClick={handleDelete} style={{ marginRight: '15px' }}>Confirm</button>
                            <button className="btn btn-danger" onClick={cancleConfirm} >Cancle</button>

                        </div>
                    )}
                </div>
            </div>
            <div className='row'>
                <div className='col center'>
                    <button className='btn btn-primary rounded-pill' onClick={handleSubmit} style={{ margin: '5px' }}>save</button>
                    <button className='btn btn-danger rounded-pill' onClick={props.closeModal} style={{ margin: '5px' }}>cancle</button>
                </div>
            </div>
        </div>
    )
}

export default VideoUpdateModal