import React, { Component } from 'react';

import styles from '../../styles/MainPage.css';

class ChatPanel extends Component {
	handleChange (e) {
		this.props.handleChange(e.target.value);
	}

	handleSubmit (e) {
		if (e.key == 'Enter' && this.props.message.trim() != '') {
			this.props.handleChange('');
			this.props.handleSubmit(this.props.message);
		}
	}

	generateLogs (logs) {
		if (logs.length > 0 ) {
			var reversed = logs.slice().reverse();
			var id = 0;
			return reversed.map((message) => {
				return (<div key={id++} className={styles.MessageLog + (id % 2 == 0 ?  " " + styles.AlternateMessageStyling : "")}><span className={styles.UsernameTitle}>{message.username}</span>: {message.message}</div>)
			})
		}
	}

	render() {
		return (
			<div className={styles.PanelDimensions + " " + styles.ChatPanel}>
        <div className={styles.ChatDimensions}>
          <input value={this.props.message} type="text" placeholder="/help for more information" className={styles.ChatInput} onChange={(e) => {this.handleChange(e);}} onKeyPress={(e) => {this.handleSubmit(e);}}/>
          <div className={styles.ChatMessages}>
						{
							this.generateLogs(this.props.messages)
						}
          </div>
        </div>
			</div>
		)
	}
};

// <div className={styles.MessageLog}><span className={styles.UsernameTitle}>Chris</span>: All in!</div>
// <div className={styles.MessageLog + " " + styles.AlternateMessageStyling}><span className={styles.UsernameTitle}>Cam</span>: No!!! last time I did that I pulled a Camilia!</div>

export default ChatPanel;
