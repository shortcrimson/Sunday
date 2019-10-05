import React, { Component } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Sidebar from './Sidebar';
import TaskList from './TaskList';
import ContentPane from './ContentPane';

import '../Styles/app.css';

class App extends Component {

	constructor (props) {
		super(props);
		this.state = {
			title: 'Sunday',
			openProject: {},
			openFolder: {},
			openTask: {},
			projects: [],
			folders: [],
			tasks: []
		};
	}

	componentDidMount() {
		//Review this later - how to handle errors and make this easier to read?
		fetch('/all')
		.then(res => res.json())
		.then(response => this.setState({
			projects: response.projects,
			folders: response.folders,
			tasks: response.tasks
		}));
	}

	projectOnClick(projectId) {
		//Find the object of the selected project by _id element
		const project = this.state.projects.find(prj => prj._id == projectId);
		//If the currently active project is selected, or we can't find a project, clear the selection
		if (this.state.openProject._id == projectId || !project) {
			this.setState({openProject: {}});
		} else {
			//Set the currently open project
			this.setState({openProject: project});
		}
	}

	folderOnClick(folderId) {
		//Find the object of the selected folder by _id element
		const folder = this.state.folders.find(fld => fld._id == folderId);
		//If the currently active folder is selected, or we can't find a folder, clear the selection
		if (this.state.openFolder._id == folderId || !folder) {
			this.setState({openFolder: {}});
		} else {
			//Set the currently open folder
			this.setState({openFolder: folder});
		}
	}

	taskOnClick(taskId) {
		//Find the object of the selected folder by _id element
		const task = this.state.tasks.find(task => task._id == taskId);
		//If the currently active folder is selected, or we can't find a folder, clear the selection
		if (this.state.openTask._id == taskId || !task) {
			this.setState({
				openTask: {},
			});
		//Otherwise fetch tasks
		} else {
			this.setState({
				openTask: task
			});
		}
	}

	isEmptyObject(obj) {
		return Object.keys(obj).length == 0;
	}

	render() {
		return (
			<div className="App">
				<Container fluid={true}>
					<Row noGutters={true}>
						<Col md={3}>
							<Sidebar 
								projects={this.state.projects} 
								folders={this.state.folders} 
								projectOnClick={(projectId) => this.projectOnClick(projectId)}
								folderOnClick={(folderId) => this.folderOnClick(folderId)}
								openProjectId={this.state.openProject._id}
							/>
						</Col>
						<Col md={3}>
							<TaskList 
								taskList={this.state.tasks.filter(task => task.folder == this.state.openFolder._id)}
								folder={this.state.openFolder}
								taskOnClick={(taskId) => this.taskOnClick(taskId)}
								noFolder={this.isEmptyObject(this.state.openFolder)}
							/>
						</Col>
						<Col>
							<ContentPane task={this.state.openTask}/>
						</Col>
					</Row>
				</Container>
			</div>
		)
	}

}

export default App;
