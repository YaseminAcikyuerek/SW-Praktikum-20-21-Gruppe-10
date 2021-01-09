import React from 'react';
class Header extends React.Component {

	state = {
		count: 0,
		tags: ['t1', 't2','t3']

	};




	render() {

		return(
			<div>

				<ul>
					{this.state.tags.map(t => <li key={t}>{t}</li>)}
				</ul>
			</div>

		);
	}





}

export default Header;