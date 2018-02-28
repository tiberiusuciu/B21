import React, { Component } from 'react';

import styles from '../styles/TerminalBox.css';
import TerminalLogs from './TerminalLogs';
import TerminalInput from './TerminalInput';

class TerminalBox extends Component {
	render() {
		return (
			<div>
				<div className={styles.terminalLogs} style={{overflowY: 'auto'}}>
					<TerminalLogs
						userInputHistory={this.props.userInputHistory}
						logs={this.props.logs}
					/>
				</div>
				<div className={styles.terminalInput}>
					<TerminalInput
						onUserCurrentInput={this.props.onUserCurrentInput}
						userCurrentInput={this.props.userCurrentInput}
						onSubmitCurrentInput={this.props.onSubmitCurrentInput}
						userInputHistory={this.props.userInputHistory}
						user={this.props.user}
					/>
				</div>
			</div>
		)
	}
};

export default TerminalBox;
