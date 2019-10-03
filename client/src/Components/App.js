import React, { Component } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ProjectButton from './ProjectButton';
import FolderList from './FolderList';
import Sidebar from './Sidebar';

import '../Styles/app.css';

class App extends Component {

	constructor (props) {
		super(props);
		this.state = {
			title: 'Sunday',
			openProject: '',
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
		if (this.state.openProject == projectId) {
			this.setState({
				openProject: '',
				folders: []
			});
		} else {
			fetch('/folders?project=' + projectId)
			.then(res => res.json())
			.then(folders => this.setState({
				openProject: projectId,
				folders
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
								onClick={(projectId) => this.projectOnClick(projectId)}
								openProject={this.state.openProject}
							/>
						</Col>
						<Col>
							<p className="contentPane">{this.state.openProject}</p>
						</Col>
					</Row>
				</Container>
			</div>
		)
	}

}

export default App;
