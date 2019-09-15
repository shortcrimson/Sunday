import React, { Component } from 'react';

import '../Styles/app.css';

import ProjectButton from './ProjectButton';
import FolderList from './FolderList';

class App extends Component {

	constructor (props) {
		super(props);
		this.state = {
			title: 'Sunday',
			projects: [],
			folders: []
		};
	}

	componentDidMount() {
		//Review this later - how to handle errors and make this easier to read?
		fetch('/projects')
		.then(res => res.json())
		.then(projects => this.setState({projects}));
	}

	projectOnClick(projectId) {
		fetch('/folders?project=' + projectId)
		.then(res => res.json())
		.then(folders => this.setState({folders}));
	}

	render() {
		return (
			<div className="App">
				<h1>{this.state.title}</h1>
	{this.state.projects.map(prj => <ProjectButton key={prj._id} project={prj} onClick={() => this.projectOnClick(prj._id)}/>)}
			<FolderList folders={this.state.folders}/>
			</div>
		)
	}

}

export default App;
