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

function App() {

	return (
		<Router>
			<Routes>
				<Route path="/contact" element={<Contact />} />
				<Route path="/" element={<Home />} />
				<Route path="" element={<Home />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} />
				<Route path='/profile' element={<ProfilePage />} />
				<Route path='/admin' element={<AdminPage />} />
			</Routes>
		</Router>
	);
}

export default App;
