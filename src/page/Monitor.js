import { useEffect, useState } from "react"
import AdminSidebar from "../components/AdminSidebar";
import { getAPI } from "../components/callAPI";
import Swal from "sweetalert2";
import '../config'

const Monitor = () => {
    document.title = "Server Monitor | Administration";
    const [serverRes, setServerRes] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAPI('serverRes');
                setServerRes(response);
            } catch (error) {
                // Handle error if the API request fails
                console.error(error);
            }
        };

        fetchData();
        // set timer every 10 sec
        const interval = setInterval(fetchData, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <AdminSidebar>
            <div className="container-fluid content">
                <div className='PageTitle'>
                    <h2>Server Monitor</h2>
                    <h2>{console.log(serverRes)}</h2>
                    <h2>CPU : {serverRes.CPU_Used}</h2>
                    <h2>Disk Free : {serverRes.Disk_Free}</h2>
                    <h2>Disk Total : {serverRes.Disk_Total}</h2>
                    <h2>Disk Used : {serverRes.Disk_Used}</h2>
                    <h2>Disk Used % :{serverRes.Disk_Used_Percent}</h2>
                    <h2>Memory Used : {serverRes.Memory_Used}</h2>
                    <h2>Network Download : {serverRes.Network_Download}</h2>
                    <h2>Network Upload : {serverRes.Network_Upload}</h2>
                </div>
            </div>
        </AdminSidebar>
    )
}

export default Monitor;