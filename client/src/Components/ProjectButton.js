import React, { Component } from 'react';

import '../Styles/projectButton.css';

class ProjectButton extends Component {
	render() {
		return (
			<div className="projectButton" id={this.props.project._id} onClick={() => this.props.onClick()}>
				<h4>{this.props.project.name}</h4>
				<p>{this.props.project.description}</p>
			</div>
		);
	}
}

export default ProjectButton;