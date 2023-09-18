import React, { useState } from 'react';
import { setlocalData, isSessionSet } from '../components/session';
import './../css/login.css';
import '../config';

const LoginPage = () => {
  const ip = global.config.ip.ip;
  if (isSessionSet('isLoggedIn')) {
    window.location.href = '/';
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  document.title = "Login";
  // login API
  const api = ip+'/login';

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var checkbox = document.getElementById('checkBox');
    const loginData = {
      email: email,
      password: password,
      check: (checkbox.checked ? 1 : 0)
    };

    

    const jsonData = JSON.stringify(loginData);

    if (email !== '' || password !== '') {
      const expDate = new Date();
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
            console.log(data);
            if (data.status === 'success') {
              if (checkbox.checked) {
                expDate.setDate(expDate.getDate() + 30);
              } else {
                expDate.setSeconds(expDate.getSeconds() + 86400);
              }
              
              setlocalData('session', data.data);
              setlocalData('isLoggedIn', true);
              setlocalData('token', data.token);
              setlocalData('expDate', expDate.getTime());

             
              window.location.href = '/';

            } else if (data.status === 'fail') {
              alert('wrong email or password')
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      } catch (error) {
        console.log('Error:', error);
      }

    } else {
      alert('Please fill in all the fields')
    }


  };


  return (
    <div className='bgImg'>
      <div className="col-12 my-center" style={{ backgroundColor: 'rgba(38, 38, 38, 0.85)', width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="card mx-auto rounded" style={{ width: '300px', backgroundColor: 'rgb(55, 55, 55)' }}>
          <div className="card-body">
            <h2 style={{ color: 'white', textAlign: 'center' }}>CS HUB</h2>
            <h4 style={{ color: 'white', textAlign: 'center' }}>Login</h4>
            <br />
            <form onSubmit={handleSubmit}>
              <div className="form-group" style={{ marginTop: '10px', marginBottom: '20px' }}>
                <input type="email" className="form-control rounded-pill" name="email" id="email" placeholder="Email" onChange={handleEmailChange} />
              </div>
              <div className="form-group" style={{ marginTop: '20px', marginBottom: '10px' }}>
                <input type="password" className="form-control rounded-pill" name="password" id="password" placeholder="Password" onChange={handlePasswordChange} />
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