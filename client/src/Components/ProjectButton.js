import React, { Component } from 'react';

import '../Styles/projectButton.css';

import FolderButton from './FolderButton';

class ProjectButton extends Component {
	render() {
		return (
			<React.Fragment>
				<div className="projectButton" id={this.props.project._id} onClick={() => this.props.projectOnClick()}>
					<h4>{this.props.project.name}</h4>
					<p>{this.props.project.description}</p>
				</div>
				{(this.props.openProject == this.props.project._id) &&
					this.props.folders.map(folder => <FolderButton 
														name={folder.name}
														taskCount={folder.task_count}
														folderOnClick={() => this.props.folderOnClick(folder._id)}
													/>)
				}
			</React.Fragment>
		);
	}
}

export default ProjectButton;