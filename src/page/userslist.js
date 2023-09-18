import { useEffect, useState } from "react"
import AdminSidebar from "../components/AdminSidebar";
import { getAPI } from '../components/callAPI';
import Swal from "sweetalert2";
import '../config'
import "../css/admin.css"

const UserListPage = () => {
    const [users, setUsers] = useState(null);
    document.title = "Users | Administration";

    useEffect(() => {
        getAPI('users')
            .then(response => {
                setUsers(response);
            });
    }, []);

    if (users) {
        return (
            <AdminSidebar>
                <div className="container-fluid content">
                    <div className='PageTitle'>
                        <h2>Users</h2>
                    </div>

                    <div className='user-table'>
                        <div className='table-responsive'>
                            <table class="table table-dark table-hover">
                                <thead>
                                    <tr>
                                        <th scope='col'>UID</th>
                                        <th scope='col'>Name</th>
                                        <th scope='col'>E-mail</th>
                                        <th scope='col'>Upload Permit</th>
                                        <th scope='col'>Role</th>
                                        <th scope='col'>Videos</th>
                                        <th scope='col'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.U_id}>
                                            <td>{user.U_id}</td>
                                            <td>{user.U_name}</td>
                                            <td>{user.U_mail}</td>
                                            <td>{user.U_permit === 1 ? "Yes" : "No"}</td>
                                            <td>{user.U_type.toUpperCase()}</td>
                                            <td>{user.U_vid}</td>
                                            <td><button type="button" class="btn btn-secondary"><i className="bi bi-gear"></i></button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </AdminSidebar>
        )
    } else {
        <AdminSidebar>
            <div className="center">
                <div className="loading" style={{ marginTop: '25%' }}></div>
            </div>
        </AdminSidebar>
    }
}

export default UserListPage;