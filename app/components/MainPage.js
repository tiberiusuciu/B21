import React, { Component } from 'react';

import ChatPanel from './Panels/ChatPanel';
import TablesPanel from './Panels/TablesPanel';
import PlayersStats from './Panels/PlayersStats';

import styles from '../styles/MainPage.css';

class MainPage extends Component {
	render() {
		return (
			<div className={styles.WindowDimension}>
				<ChatPanel message={this.props.message} messages={this.props.messages} handleChange={this.props.handleChange} handleSubmit={this.props.handleSubmit}/>
				<TablesPanel
					handleAction={this.props.onHandleAction}
					handleBetClick={this.props.handleBetClick}
					users={this.props.users}
					userId={this.props.userId}
					currentUserId={this.props.currentUserId}
					currentPlayer={this.props.currentPlayer}
					dealer={this.props.dealer}
					currentPhase={this.props.currentPhase}
					secondsPassed={this.props.secondsPassed} />
				<PlayersStats users={this.props.users} userId={this.props.userId} currentUserId={this.props.currentUserId} dealer={this.props.dealer} currentPhase={this.props.currentPhase} />
			</div>
		)
	}
};

/*
<div className={styles.TerminalLayout + " col-xs-8"}>
	<TerminalBox
		onUserCurrentInput={this.props.onUserCurrentInput}
		userCurrentInput={this.props.userCurrentInput}
		onSubmitCurrentInput={this.props.onSubmitCurrentInput}
		userInputHistory={this.props.userInputHistory}
		user={this.props.user}
		logs={this.props.logs}
	/>
</div>
<div className={styles.InformationLayout + " col-xs-4"}>
	<div className={styles.CanvasLayout}>
		Test Canvas
	</div>
	<div className={styles.DetailsBox}>
		Test Details
	</div>
</div>
*/

export default MainPage;
