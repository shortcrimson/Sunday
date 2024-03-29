import React, { Component } from 'react';
import Container from "react-bootstrap/Container";

import '../Styles/contentPane.css';

class ContentPane extends Component {

	constructor(props) {
		super(props);
		this.state = this.getDefaultState();
		this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
		this.handleTaskTypeChange = this.handleTaskTypeChange.bind(this);
		this.handlePriorityChange = this.handlePriorityChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidUpdate(prevProps) {
		if (this.props.taskId !== prevProps.taskId && this.props.taskId !== undefined) {
			fetch('/tasks/' + this.props.taskId)
			.then(res => res.json())
			.then(res => this.setState({
				show: true,
				new: false,
				description: res.description,
				task_type: res.task_type,
				priority: res.priority,
				_id: res._id
			}));
		} else if (this.props.newTaskForFolder !== prevProps.newTaskForFolder && this.props.newTaskForFolder !== undefined) {
			this.setState({
				show: true,
				new: true
			});
		}
	}

	handleDescriptionChange(event) {
		this.setState({description: event.target.value});
	}
	handleTaskTypeChange(event) {
		this.setState({task_type: event.target.value});
	}
	handlePriorityChange(event) {
		this.setState({priority: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();

		console.log('Folder - ' + this.props.newTaskForFolder);

		var updateObj = {
			'description': this.state.description,
			'task_type': this.state.task_type,
			'priority': this.state.priority,
		}
		if (this.state.new && this.props.newTaskForFolder !== undefined) {
			updateObj.folder = this.props.newTaskForFolder;
		}

		let url = '/tasks';
		let method = '';
		if (this.state.new) {
			method = 'POST';
		} else {
			url += '/' + this.state._id;
			method = 'PATCH';
		}
		fetch(url, {
			method: method,
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(updateObj)
		})
		.then(res => res.json())
		.then(res => console.log(res));
	}

	//Return the default empty state from a function as we need this in more than one place
	getDefaultState() {
		return {
			show: false,
			new: true,
			description: '',
			task_type: '',
			priority: '',
			_id: ''
		}
	}

	closePane() {
		this.setState(this.getDefaultState());
		this.props.closeFunction();
	}

	render() {
		return (
			<Container className={this.state.show ? 'contentPane' : 'contentPaneHidden'} fluid={true}>
				<div className="closeButton" onClick={() => this.closePane()}>X</div>
				<form onSubmit={this.handleSubmit}>
					<div>
						<label>Name:</label>
						<input type="text" className="nameField" value={this.state.description} onChange={this.handleDescriptionChange}/>
					</div>
					<div>
						<label>Task Type:</label>
						<input type="text" value={this.state.task_type} onChange={this.handleTaskTypeChange}/>
					</div>
					<div>
						<label>Priority:</label>
						<input type="text" value={this.state.priority} onChange={this.handlePriorityChange}/>
					</div>
					<div>
						<input type="submit" value="Save" />
					</div>
				</form>
			</Container>
		)
	}
}

export default ContentPane;