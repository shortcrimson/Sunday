import React, { Component } from 'react';

import '../Styles/folderButton.css';

class FolderButton extends Component {
	render() {
		return (
			<div className="folderButton" onClick={() => this.props.folderOnClick()}>
				<h6>{this.props.name}</h6>
				<div className="taskCount">{this.props.taskCount}</div>
			</div>
		);
	}
}

export default FolderButton;