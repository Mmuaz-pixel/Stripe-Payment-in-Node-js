import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Payment from './Payment';
import Success from './Success';

function App() {
	return (
		<Router>
			<Routes>
				<Route exact path="/" element={<Payment />} />
				<Route exact path="/success" element={<Success />} />
			</Routes>
		</Router>
	);
}

export default App;
