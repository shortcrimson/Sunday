import React, { Component } from 'react';

import '../Styles/taskList.css';

class TaskList extends Component {

	render() {
		return (
			<div className="taskList">
				{
					(!this.props.folder) && 
					<h6>Select a folder to see tasks here</h6>
				}
				{
					(this.props.folder) && 
					<h6>{this.props.folder}</h6>
				}
				{
					(this.props.folder && this.props.taskList.length == 0) &&
					<h6>No tasks in this folder!</h6>
				}
				{
					(this.props.folder && this.props.taskList.length > 0) &&
					this.props.taskList.map(task => <div className="taskButton"><p>{task.description}</p></div>)
				}
			</div>
		);
	}

}

export default TaskList;