import React, { Component } from 'react';

import '../Styles/projectButton.css';

import FolderList from './FolderList';

class ProjectButton extends Component {
	render() {
		return (
			<React.Fragment>
				<div className="projectButton" id={this.props.project._id} onClick={() => this.props.onClick()}>
					<h4>{this.props.project.name}</h4>
					<p>{this.props.project.description}</p>
				</div>
				{this.props.openProject == this.props.project._id &&
					<FolderList folders={this.props.folders} />
				}
			</React.Fragment>
		);
	}
}

export default ProjectButton;