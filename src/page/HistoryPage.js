import { useEffect, useState } from "react"
import Sidebar from "../components/sidebar"
import { getUser } from "../components/session"

const HistoryPage = () => {
    const [ histories, setHistories ] = useState(null);
    const u = getUser();
    const api = 'http://localhost:8900/get/histories?u=' + u;

    useEffect(() => {
        fetch(api)
        .then(response => response.json())
        .then(data => {
            setHistories(data);
            console.log(data);
        })
        .catch(() => {});
    }, [api])

    if(histories !== null ) {
        return (
            <Sidebar>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col" style={{margin: '15px', borderRadius: '25px'}}>
                            <div>
                                <table className="table table-striped table-dark" style={{borderRadius: '25px'}}>
                                <tbody >
                                    {histories.map(history => (
                                        <tr key={history.H_ID}>
                                            <th className="">
                                            <a className="href-noline-in" href={'/watch?u='+ history.U_folder + '&v=' + history.V_encode}>
                                                <div className="row">
                                                    <div className="col-2">
                                                        <img className="card-img-top " src={'data:image/jpeg;base64,' + history.V_pic} style={{marginBottom: '5px', borderRadius: '20px'}} alt={history.V_title+' thumbnail'} />

                                                    </div>
                                                    <div className="col">
                                                        <div><h3>{history.V_title}</h3>  </div>  
                                                        <div><h3>{history.H_watchDate}</h3>  </div>  
                                                    </div>                                                   
                                                </div>
                                            </a>
                                            </th>
                                        </tr>
                                    ))}
                                </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </Sidebar>
        )
    }else {
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