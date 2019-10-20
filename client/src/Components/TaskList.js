import React, { Component } from 'react';

import '../Styles/taskList.css';

class TaskList extends Component {

	render() {
		return (
			<div className="taskList">
				{
					(this.props.noFolder) && 
					<h6>Select a folder to see tasks here</h6>
				}
				{
					(!this.props.noFolder) && 
					<React.Fragment>
						<h6>{this.props.folder.name}</h6>
						<button className="newTaskBtn" onClick={() => this.props.toggleNewTaskClick(this.props.folder._id)}>+</button>
					</React.Fragment>
				}
				{
					(!this.props.noFolder && this.props.taskList.length === 0) &&
						<h6>No tasks in this folder!</h6>
				}
				{
					(!this.props.noFolder && this.props.taskList.length > 0) &&
					this.props.taskList.map(task => <div className="taskButton" key={task._id} onClick={() => this.props.taskOnClick(task._id)}><p>{task.description}</p></div>)
				}
			</div>
		);
	}

}

export default TaskList;