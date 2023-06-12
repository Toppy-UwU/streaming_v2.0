import './css/App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'react-bootstrap'


import Home from "./page/Home"
import About from "./page/About"
import Contact from "./page/Contact"
import LoginPage from "./page/LoginPage"
import RegisterPage from "./page/RegisterPage" 
import ProfilePage from './page/profilePage';
import AdminPage from './page/AdminPage';
import UploadPage from './page/uploadPage';

function App() {

	return (
		<Router>
			<Routes>
				<Route path="/contact" element={<Contact />} />
				
				{/* login/register page */}
				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} />

				{/* main page */}
				<Route path="/" element={<Home />} />
				<Route path='/profile' element={<ProfilePage />} />
				<Route path='/upload' element={<UploadPage />} />
				<Route path='/admin' element={<AdminPage />} />

			</Routes>
		</Router>
	);
}

export default App;
