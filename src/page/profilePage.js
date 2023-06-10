import React from 'react';

import Sidebar from '../components/sidebar';


const ProfilePage = () => {

    const param = new URLSearchParams(window.location.search);
    const U_id = param.get('profile');

  return (

    <div>
      <Sidebar>
        <h1>profile {U_id}</h1>
        
      </Sidebar>
    </div>

  );
};

export default ProfilePage;