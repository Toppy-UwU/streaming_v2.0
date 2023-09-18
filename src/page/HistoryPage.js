import { useEffect, useState } from "react"
import Sidebar from "../components/sidebar"
import { getToken, getUser } from "../components/session"
import ReactModal from "react-modal";
import Swal from "sweetalert2";
import '../config'

const HistoryPage = () => {
    const [histories, setHistories] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const ip = global.config.ip.ip;

    const u = getUser();
    const api = ip + '/get/histories?u=' + u;

    const clearApi = ip + '/delete/histories';
    document.title = "History";

    useEffect(() => {
        fetch(api)
            .then(response => response.json())
            .then(data => {
                setHistories(data);
                console.log(data);
            })
            .catch(() => { });
    }, [api])

    const handleBtn = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "All of your history will be deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Clear'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your history has been deleted.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    handleClear();
                    window.location.reload();
                });
            }
        });
    }

    const handleClear = () => {
        const token = getToken();
        const user = getUser();
        const tmp = {
            'user': user
        }

        fetch(clearApi, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(tmp)
        }).then(response => {
            if (!response.ok) {
                throw new Error('Clearing failed');
            }
        }).catch(() => { });
    }


    if (histories !== null) {
        return (
            <Sidebar>
                <div className="container-fluid">
                    <br />
                    <div className="row d-flex justify-content-between align-items-center">
                        <div style={{ flex: 1, marginRight: '20px' }}>
                            <h3 className="text-white">Watch History</h3>
                        </div>
                        {histories.length > 0 && (
                            <div style={{ flex: 0 }}>
                                <button type="button" class="btn btn-danger" onClick={handleBtn}><i class="bi bi-trash3"></i></button>
                            </div>
                        )}
                    </div>
                    <table class="table table-dark table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Thumbnail</th>
                                <th scope="col">Title</th>
                                <th scope="col">Watch Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {histories.length > 0 ? (
                                histories.map(history => (
                                    <tr key={history.H_ID}>
                                        <td> <img className="card-img-top" src={'data:image/jpeg;base64,' + history.V_pic} style={{ borderRadius: '20px', maxHeight: '200px', maxWidth: '200px' }} alt={history.V_title + ' thumbnail'} /></td>
                                        <td><a className="href-noline-in" href={'/watch?u=' + history.U_folder + '&v=' + history.V_encode}>{history.V_title}</a></td>
                                        <td>{history.H_watchDate}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colspan="3" className="text-center text-white">- No Watch History! -</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Sidebar>
        )
    } else {
        return (
            <Sidebar>
                <div className="center">
                    <div className="loading" />
                </div>
            </Sidebar>
        )
    }


}

export default HistoryPage