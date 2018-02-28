import React, { Component } from 'react';

import styles from '../../styles/MainPage.css';

class ChatPanel extends Component {
	render() {
		return (
			<div className={styles.PanelDimensions + " " + styles.ChatPanel}>
        <div className={styles.ChatDimensions}>
          <input type="text" placeholder="/help for more information" className={styles.ChatInput} />
          <div className={styles.ChatMessages}>
            <div className={styles.MessageLog}><span className={styles.UsernameTitle}>Chris</span>: All in!</div>
            <div className={styles.MessageLog + " " + styles.AlternateMessageStyling}><span className={styles.UsernameTitle}>Cam</span>: No!!! last time I did that I pulled a Camilia!</div>
          </div>
        </div>
			</div>
		)
	}
};

export default ChatPanel;
