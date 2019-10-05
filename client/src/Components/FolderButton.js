import React, { Component } from 'react';

import '../Styles/folderButton.css';

class FolderButton extends Component {
	render() {
		return (
			<div className="folderButton" id={this.props.folder._id} onClick={() => this.props.folderOnClick()}>
				<h6>{this.props.folder.name}</h6>
				<div className="taskCount">{this.props.folder.taskCount}</div>
			</div>
		);
	}
}

export default FolderButton;