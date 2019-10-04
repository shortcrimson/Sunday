import React, { Component } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Sidebar from './Sidebar';
import TaskList from './TaskList';

import '../Styles/app.css';

class App extends Component {

	constructor (props) {
		super(props);
		this.state = {
			title: 'Sunday',
			openProject: '',
			openFolder: '',
			openTask: '',
			projects: [],
			folders: [],
			tasks: []
		};
	}

	componentDidMount() {
		//Review this later - how to handle errors and make this easier to read?
		fetch('/projects')
		.then(res => res.json())
		.then(projects => this.setState({projects}));
	}

	projectOnClick(projectId) {
		//Find the object of the selected project by _id element
		const project = this.state.projects.find(prj => prj._id == projectId);
		//If the currently active project is selected, or we can't find a project, clear the selection
		if (this.state.openProject._id == projectId || !project) {
			this.setState({
				openProject: '',
				folders: []
			});
		//Otherwise fetch folders
		} else {
			fetch('/folders?project=' + projectId)
			.then(res => res.json())
			.then(folders => this.setState({
				//Set the current open project
				openProject: project,
				folders
			}));
		}
	}

	folderOnClick(folderId) {
		//Find the object of the selected folder by _id element
		const folder = this.state.folders.find(fld => fld._id == folderId);
		//If the currently active folder is selected, or we can't find a folder, clear the selection
		if (this.state.openFolder._id == folderId || !folder) {
			this.setState({
				openFolder: '',
				tasks: []
			});
		//Otherwise fetch tasks
		} else {
			fetch('/tasks?folder=' + folderId)
			.then(res => res.json())
			.then(tasks => this.setState({
				//Set the current open folder
				openFolder: folder,
				tasks
			}));
		}
	}

	render() {
		return (
			<div className="App">
				<Container fluid={true}>
					<Row noGutters={true}>
						<Col md={3}>
							<Sidebar 
								title={this.state.title} 
								projects={this.state.projects} 
								folders={this.state.folders} 
								projectOnClick={(projectId) => this.projectOnClick(projectId)}
								folderOnClick={(folderId) => this.folderOnClick(folderId)}
								openProject={this.state.openProject._id}
							/>
						</Col>
						<Col md={3}>
							<TaskList 
								taskList={this.state.tasks}
								folder={this.state.openFolder.name}
							/>
						</Col>
						<Col>
							<p className="contentPane">{this.state.openProject._id}</p>
						</Col>
					</Row>
				</Container>
			</div>
		)
	}

}

export default App;
