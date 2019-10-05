import React, { Component } from 'react';

import '../Styles/contentPane.css';

class ContentPane extends Component {
	render() {
		return (
			<div className="contentPane">
				<h4>This is a content pane</h4>
				<p>{this.props.task.description}</p>
			</div>
		)
	}
}

export default ContentPane;