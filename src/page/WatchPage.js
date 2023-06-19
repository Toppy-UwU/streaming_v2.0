
import Sidebar from '../components/sidebar';

const WatchPage = () => {
    const param = new URLSearchParams(window.location.search);
    
    const user = param.get('u')
    const video = param.get('v')

    console.log(user + '|' +video);
}

export default WatchPage