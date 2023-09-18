import { useEffect, useState } from "react"
import AdminSidebar from "../components/AdminSidebar";
import { getToken, getUser } from "../components/session"
import Swal from "sweetalert2";
import '../config'

const AdminTag = () => {
    document.title = "Tags | Administration";
    return (
        <AdminSidebar>
            <div className="container-fluid content">
                <div className='PageTitle'>
                    <h2>Tags</h2>
                </div>
            </div>
        </AdminSidebar>
    )
}

export default AdminTag;