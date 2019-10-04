import React, { Component } from 'react';

import '../Styles/projectButton.css';

import FolderButton from './FolderButton';

class ProjectButton extends Component {
	render() {
		return (
			<React.Fragment>
				<div className="projectButton" id={this.props.project._id} onClick={() => this.props.onClick()}>
					<h4>{this.props.project.name}</h4>
					<p>{this.props.project.description}</p>
				</div>
				{(this.props.openProject == this.props.project._id) &&
					this.props.folders.map(folder => <FolderButton folder={folder} />)
				}
			</React.Fragment>
		);
	}
}

export default ProjectButton;