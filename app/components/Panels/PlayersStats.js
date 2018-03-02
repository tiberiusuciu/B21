import React, { Component } from 'react';

import PlayerTab from './PlayerTab';

import styles from '../../styles/MainPage.css';

class PlayersStats extends Component {
	render() {
		return (
			<div className={styles.PanelDimensions + " " + styles.PlayersStats}>
				<PlayerTab dealer={this.props.dealer} isDealer currentUserId={this.props.currentUserId} userId={this.props.userId} />
				{
					this.props.users ?
						this.props.users.map ((user) => {
							return (
								<PlayerTab user={user} key={user.id} currentUserId={this.props.currentUserId} userId={this.props.userId}/>
							);
						})
					 : null
				}
			</div>
		)
	}
};

export default PlayersStats;
