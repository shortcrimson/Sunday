import React, { Component } from 'react';

import '../Styles/folderButton.css';

class FolderButton extends Component {
	render() {
		return (
			<div className="folderButton">
				<h6>{this.props.folder.name}</h6>
				<div className="taskCount">{this.props.folder.task_count}</div>
			</div>
		);
	}
}

export default FolderButton;