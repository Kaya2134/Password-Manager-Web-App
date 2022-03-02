import React, { useState } from 'react';
import List from './pages/list';
import { Route, useHistory } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function App() {
	let history = useHistory();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [status, setStatus] = useState('');
	const [auth, setAuth] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post('http://localhost:3001/auth', {
				username: username,
				password: password,
			})
			.then(function (response) {
				if (response.data.auth === true) {
					setAuth(true);
					setStatus('');
					history.push('/list');
				} else {
					setStatus('Wrong Username or Password!');
				}
			});
	};

	if (!auth) {
		return (
			<div className='main-container'>
				<form onSubmit={handleSubmit} className='login-form'>
					<input
						id='username'
						className='login-form-input'
						type='text'
						placeholder='Username'
						onChange={(e) => {
							setUsername(e.target.value);
						}}
					/>

					<input
						id='password'
						className='login-form-input'
						type='password'
						placeholder='Password'
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
					<input className='button' type='submit' value='Login' />
					<span style={{ color: 'red' }}>{status}</span>
				</form>
			</div>
		);
	}

	return (
		<Route
			exact
			path='/list'
			component={() => <List authorized={auth} />}
		/>
	);
}

export default App;
