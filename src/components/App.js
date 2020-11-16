import React, { Component } from 'react';
import CatImg from '@images/cat.jpg';
import '@styles/main.sass';

class App extends Component {
	render() {
		return (
			<div className='container'>
				<h1 className='h1'>react webpack template by chunaixxx</h1>

				<div className='img-wrapper'>
					<img className='img' src={ CatImg }></img>
				</div>
			</div>
		);
	}
}

export default App;
