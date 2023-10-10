import { useEffect, useState } from "react"
import Sidebar from "../components/sidebar"
import { getToken, getUser } from "../components/session"
import Swal from "sweetalert2";
import moment from "moment";
import '../config'
import "./../css/table.css"
import { Link } from "react-router-dom";

const HistoryPage = () => {
    const [histories, setHistories] = useState(null);
    const ip = global.config.ip.ip;

    const user = getUser();
    const api = ip + '/get/histories?u=' + user;
    const token = getToken();

    const clearApi = ip + '/delete/histories';
    document.title = "History";

    const fetchHistory = async () => {
        try {
            const response = await fetch(api);
            if (response.ok) {
                const data = await response.json();
                if (data.length > 0) {
                    setHistories(data);
                }
            } else {
                throw new Error('Failed to fetch history data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

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

    const handleClear = async () => {
        const tmp = {
            'user': user
        }

        try {
            const response = await fetch(clearApi, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(tmp)
            });

            if (!response.ok) {
                throw new Error('Clearing failed');
            }

        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        fetchHistory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (histories !== null) {
        return (
            <Sidebar>
                <div className="container-fluid">
                    <br />
                    <div className="row d-flex justify-content-between align-items-center">
                        <div style={{ flex: 1, marginRight: '20px' }}>
                            <h3 className="text-white fw-bold">Watch History</h3>
                        </div>
                        {histories.length > 0 && (
                            <div style={{ flex: 0 }}>
                                <button type="button" class="btn btn-danger" onClick={handleBtn}><i class="bi bi-trash3"></i></button>
                            </div>
                        )}
                    </div>

                    {console.log(histories)}

                    {console.log(new Date() === histories[0].H_watchDate)}
                    <div className="showHistoryData">
                        {histories.map((history) => (
                            <div className="showHistory">
                                <Link to={'/watch?u=' + history.U_folder + '&v=' + history.V_encode}><img src={`data:image/jpeg;base64, ${history.V_pic}`} alt={history.V_title + ' thumbnail'} /></Link>
                                <div class="history-text">
                                    <Link to={'/watch?u=' + history.U_folder + '&v=' + history.V_encode} className="noLink"><h4>{history.V_title}</h4></Link>
                                    <Link to={`/profile?profile=${history.U_ID}`} className="noLink"><p><span><i className="bi bi-person-fill"></i> </span>{history.U_name}</p></Link>
                                    <Link to={'/watch?u=' + history.U_folder + '&v=' + history.V_encode} className="noLink"><p><span><i class="bi bi-clock"></i> </span>{moment.utc(history.H_watchDate).format("DD MMMM YYYY : HH:mm:ss")}</p></Link>
                                </div>
                            </div>
                        ))}

                    </div>


                    {/* <div className="row">
                        <div className="col-12 col-lg-8 col-xxl-12 d-flex">
                            <div className="card flex-fill">
                                <div className="card-header">
                                    <h5 class="card-title mb-0">Latest Watch</h5>
                                </div>
                                <table class="table dark-bg table-borderless my-0">
                                    <thead>
                                        <tr>
                                            <th>Thumbnail</th>
                                            <th>Title</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {histories.length > 0 ? (
                                            histories.map(history => (
                                                <tr key={history.H_ID}>
                                                    <td> <img className="card-img-top" src={'data:image/jpeg;base64,' + history.V_pic} style={{ borderRadius: '20px', maxHeight: '200px', maxWidth: '200px' }} alt={history.V_title + ' thumbnail'} /></td>
                                                    <td><a className="text-decoration-none" href={'/watch?u=' + history.U_folder + '&v=' + history.V_encode}>{history.V_title}</a></td>
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
                        </div>
                    </div> */}
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