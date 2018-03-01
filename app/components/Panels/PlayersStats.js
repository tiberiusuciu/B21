import React, { Component } from 'react';

import PlayerTab from './PlayerTab';

import styles from '../../styles/MainPage.css';

class PlayersStats extends Component {
	render() {
		return (
			<div className={styles.PanelDimensions + " " + styles.PlayersStats}>
				{
					this.props.users ?
						this.props.users.map ((user) => {
							return (
								<PlayerTab user={user} key={user.id}/>
							);
						})
					 : null
				}
			</div>
		)
	}
};

export default PlayersStats;
