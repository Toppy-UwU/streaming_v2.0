import { useEffect, useState } from "react"
import Sidebar from "../components/sidebar"
import ShowVideos from "../components/showVideo";
import ShowUsers from "../components/showUser";
import '../config';


const SearchPage = () => {
    const param = new URLSearchParams(window.location.search);
    const search = param.get('search');

    const [videos, setVideos] = useState(null);
    const [users, setUsers] = useState(null);

    const ip = global.config.ip.ip;
    document.title = search + " | Search";

    const api = ip + '/get/videos/search?s=' + search;
    const api_users = ip + '/get/users/search?u=' + search;

    useEffect(() => {
        fetch(api)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setVideos(data);
            })
    }, [api])

    useEffect(() => {
        fetch(api_users)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setUsers(data);
            })
    }, [api_users])

    if (videos) {
        if (Object.keys(videos).length !== 0) {
            return (
                <div>
                    <Sidebar>
                        <div>
                            <div style={{ marginTop: '20px' }}>
                                <ShowVideos videos={videos} />
                            </div>
                        </div>
                    </Sidebar>
                </div>
            )
        } else {
            return (
                <Sidebar>
                    <div style={{ marginTop: '20px' }}>
                        <h3 className="text-white align-items-center">results {search} doesn't exist right now..</h3>
                    </div>
                </Sidebar>
            )
        }
    }
}

export default SearchPage