
// get API
const getUserAPI = 'http://localhost:8900/getUsers';
const getServerAPI = 'http://localhost:8900/server_resource';
const getVideosPublic = 'http://localhost:8900/getVideos/public';

// post API


export const getAPI = (call_api) => {
  let api = '';
  if (call_api === 'users') {
    api = getUserAPI;
  }else if (call_api === 'serverRes') {
    api = getServerAPI
  }else if (call_api === 'videosPublic') {
    api = getVideosPublic
  }

  return fetch(api)
      .then(response => response.json())
      .then(data => {
        //   console.log(data);
        return data
      })
      .catch(error => {
        console.error('Error:', error);
      });
}

