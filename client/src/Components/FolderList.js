import React, { Component } from 'react';

class FolderList extends Component {

	constructor (props) {
		super (props);
	}

	render() {
		return (
			this.props.folders.map(fld => <p1>{fld.name}</p1>)
		);
	}
}

export default FolderList;