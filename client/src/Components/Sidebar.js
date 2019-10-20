import React, { Component } from 'react';

import ProjectButton from './ProjectButton';
import FolderButton from './FolderButton';

import '../Styles/sidebar.css';

class Sidebar extends Component {

	render() {
		return (
			<div className="sidebar">
				{this.props.projects.map(prj => 
					<React.Fragment key={prj._id}>
						<ProjectButton 
							key={prj._id} 
							project={prj} 
							projectOnClick={() => this.props.projectOnClick(prj._id)}
							folders={this.props.folders}
							openProject={this.props.openProject}
						/>
						{this.props.openProjectId === prj._id && this.props.folders.filter(fld => (fld.project === prj._id)).map(fld =>
							<FolderButton
								key={fld._id}
								folder={fld}
								folderOnClick={() => this.props.folderOnClick(fld._id)}
							/>
						)}
					</React.Fragment>
				)}
			</div>
		);
	}

}
//filter(fld => fld.project == prj._id)
export default Sidebar;