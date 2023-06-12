import React, { useState } from 'react';
// import { getlocalData, setlocalData } from '../components/localstorage';
import { setSessionData, getlocalData, setlocalData, isSessionSet } from '../components/session';
import './../css/login.css';

const LoginPage = () => {
  if(isSessionSet('isLoggedIn')) {
    window.location.href = '/'
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // login API
  const api = 'http://localhost:8900/login'

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email: email,
      password: password
    };

    var checkbox = document.getElementById('checkBox');

    const jsonData = JSON.stringify(loginData);

    if(email !== '' || password !== '') {
      
      try {
        fetch(api, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: jsonData,
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              console.log('login failed');
            }
          })
          .then((data) => {
            if(data.status === 'success') {
              if(checkbox.checked) {
                setlocalData('session', data.data);
                setlocalData('isLoggedIn', true);
                setlocalData('check', true);
                window.location.href = '/'
                // console.log(data.data)
                // console.log('local');
              }else {
                setSessionData('session', data.data);
                setSessionData('isLoggedIn', true);
                setlocalData('check', false);
                window.location.href = '/'
                // console.log('sesssion');
              }
            }else if(data.status === 'fail') {
              alert('wrong email or password')
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      } catch (error) {
        console.log('Error:', error);
      }

    }else {
      alert('Please fill in all the fields')
    }

    
  };


  return (
    <div className='bgImg'>
      <div className="col-12 my-center" style={{ backgroundColor: 'rgba(38, 38, 38, 0.85)', width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="card mx-auto rounded" style={{ width: '300px', backgroundColor: 'rgb(55, 55, 55)' }}>
          <div className="card-body">
            <h2 style={{ color: 'white', textAlign: 'center' }}>CS Streaming 888</h2>
            <h4 style={{ color: 'white', textAlign: 'center' }}>Login</h4>
            <br />
            <form onSubmit={handleSubmit}>
              <div className="form-group" style={{ marginTop: '10px', marginBottom: '20px' }}>
                <input type="email" className="form-control rounded-pill" name="email" id="email" placeholder="Email" onChange={handleEmailChange}/>
              </div>
              <div className="form-group" style={{ marginTop: '20px', marginBottom: '10px' }}>
                <input type="password" className="form-control rounded-pill" name="password" id="password" placeholder="Password" onChange={handlePasswordChange}/>
              </div>
              <div className="form-group form-check">
                <input type="checkbox" className="form-check-input" id="checkBox" />
                <label className="form-check-label" id="RemMe" htmlFor="chackBox" style={{ color: 'white' }}>Remember Me</label>
              </div>
              <br /><br />
              <div className="div-center">
                <button type="submit" className="btn btn-primary rounded-pill" style={{ width: '150px' }}>Login</button>
              </div>
            </form>
            <div className="div-center">
              <a href="/register">
                <button className="btn btn-success rounded-pill" style={{ marginTop: '10px', width: '100px' }}>Register</button>
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default LoginPage;