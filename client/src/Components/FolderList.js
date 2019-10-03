import React, { Component } from 'react';

class FolderList extends Component {
	render() {
		return (
			<div className="folderList">
				{this.props.folders.map(fld => <p>{fld.name}</p>)}
			</div>
		);
	}
}

export default FolderList;