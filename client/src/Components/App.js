import React, { Component } from 'react';

class App extends Component {

	state = {projects: []};

	componentDidMount() {
		fetch('/projects')
			.then(res => res.json())
			.then(projects => this.setState({projects}));
	}

	render() {
		return (
			<div className="App">
				<h1>Hello, World!</h1>
				{this.state.projects.map(project => <div>{project.name}</div>)}
			</div>
		)
	}

}

export default App;
