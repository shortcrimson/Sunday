import React, { Component } from 'react';

import ProjectButton from './ProjectButton';


import '../Styles/sidebar.css';

class Sidebar extends Component {

	render() {
		return (
			<div className="sidebar">
				<div className="title">
					<h4>{this.props.title}</h4>
				</div>
				<div>
					{this.props.projects.map(
						prj => 
							<ProjectButton 
								key={prj._id} 
								project={prj} 
								projectOnClick={() => this.props.projectOnClick(prj._id)}
								folders={this.props.folders}
								folderOnClick={(folderId) => this.props.folderOnClick(folderId)}
								openProject={this.props.openProject}
							/>
					)}
				</div>
				<div>
					
				</div>
			</div>
		);
	}

}

export default Sidebar;