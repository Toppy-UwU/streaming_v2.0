import React from "react";
import Sidebar from "./../components/sidebar"
import { getlocalData, isSessionSet } from './../components/session';
import './../css/setting.css';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import UserUpdate from '../components/userUpdateModal';
import UpdatePasswordModal from "../components/userPasswordModal";

const SettingPage = () => {
    document.title = "Setting";

    if (isSessionSet('session') && isSessionSet('isLoggedIn')) {
        const expDate = getlocalData('expDate');
        if (Date.now() >= expDate) {
            localStorage.clear();
            window.location.href = '/token-expired';
        } else {
            var session = getlocalData('session');
            var isLoggedIn = getlocalData('isLoggedIn');
        }
    }

    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure to delete your account?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Your account was deleted!', '', 'success')
            } else if (result.isDenied) {
                Swal.fire('Delete fail!', '', 'error')
            }
        })
    }

    console.log(session)

    return (
        <Sidebar>
            <div className="container-fluid">
                <br />

                <div className="PageTitle">
                    <h2><i className="bi bi-gear-fill"></i> Setting</h2>
                    <p>Manage your Account!</p>
                </div>

                <div className="User-Info">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-4 d-flex justify-content-center align-items-center">
                                    <img className="UserImg" src={`data:image/jpeg;base64, ${session.U_pro_pic}`} />
                                </div>
                                <div className="col-5">
                                    <h4 className="card-title">{session.username}</h4>
                                    <p>{session.email}</p>
                                    <p>Type : {session.U_type}</p>
                                    <p>{session.vid} Videos</p>
                                </div>
                                <div className="col-3 d-flex justify-content-center align-items-center">
                                    <Link to={`/profile?profile=${session.U_id}`}><button type="button" class="btn btn-success"><i className="bi bi-person-fill"></i> <span class="sr-only">Profile</span></button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className="Setting-Menu mb-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <Link to="#" className="text-decoration-none" data-bs-toggle="modal" data-bs-target="#UpdateUserModal">
                                    <div className="col-12">
                                        <h4><i className="bi bi-person-fill-gear"></i> Account</h4>
                                        <p>Manage your account information</p>
                                    </div>
                                </Link>
                                <hr className='text-white' />
                                <Link to="#" className="text-decoration-none" data-bs-toggle="modal" data-bs-target="#UpdatePasswordModal">
                                    <div className="col-12">
                                        <h4><i className="bi bi-lock-fill"></i> Password</h4>
                                        <p>Manage your password</p>
                                    </div>
                                </Link>
                                <hr className='text-white' />
                                <div className="col-12" onClick={handleDelete}>
                                    <h4><i className="bi bi-trash3-fill"></i> Delete Account</h4>
                                    <p>Delete all of account and videos</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <UserUpdate data={session} />
                <UpdatePasswordModal />
            </div>
        </Sidebar>
    )
}
export default SettingPage;