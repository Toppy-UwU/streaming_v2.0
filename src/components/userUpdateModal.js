import React, { useState } from 'react';
import { getToken } from "./session";
import '../config';

const UserUpdate = (props) => {
    const session = props.data;
    const [username, setUsername] = useState(session.U_name);
    const [email, setEmail] = useState(session.U_mail);
    const [propic, setPropic] = useState(null);
    const [bannerpic, setBannerpic] = useState(null);
    const ip = global.config.ip.ip;

    const api = ip + '/update/user/user';

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePropic = (e) => {
        setPropic(e.target.files[0]);
    }

    const handleBanner = (e) => {
        setBannerpic(e.target.files[0]);
    }

    const sendRequest = () => {
        const formData = new FormData();
        const data = {
            'U_id': session.U_ID,
            'username': username,
            'email': email
        }

        formData.append('data', JSON.stringify(data));
        formData.append('pro', propic);
        formData.append('banner', bannerpic);

        const token = getToken();

        fetch(api, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            body: formData
        })
        .then((response) => {
            if (response.ok) {
                props.update();
            }
        })
        .catch((e) => {
            console.error(e);
        })
        {console.log(data)}
    }

    return (
        <div className='container' style={{maxWidth : "700px" , margin : "0 auto" , padding : "20px"}}>
            <div className='card'>
                <div className='card-header'>
                    <h5>User Settings</h5>
                </div>
                <div className='card-body'>
                    <form>
                        <div className='form-group'>
                            <label htmlFor='bannerInput'>Banner Image</label>
                            <input type='file' className='form-control' accept='image/*' id='bannerInput' onChange={handleBanner} />
                            {bannerpic && <img src={URL.createObjectURL(bannerpic)} alt='Banner' style={{ width: '100%', maxHeight: '200px' }} />}
                        </div>
                        <div className='form-group'>
                            <label htmlFor='imgInput'>User Profile Image</label>
                            <input type='file' className='form-control' accept='image/*' id='imgInput' onChange={handlePropic} />
                            {propic && <img src={URL.createObjectURL(propic)} alt='Profile' style={{ width: '50%', maxHeight: '50%' }} />}
                        </div>
                        <div className='form-group'>
                            <label htmlFor='nameInput'>User Name</label>
                            <input type='text' className='form-control' id='nameInput' value={username} onChange={handleUsername} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='mailInput'>Email</label>
                            <input type='email' className='form-control' id='mailInput' value={email} onChange={handleEmail} />
                        </div>
                    </form>
                </div>
                <div className='card-footer'>
                    <button className='btn btn-primary' onClick={sendRequest}>Save</button>
                    <button className='btn btn-secondary' onClick={props.closeModal}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default UserUpdate;
