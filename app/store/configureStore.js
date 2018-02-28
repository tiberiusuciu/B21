import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
// import api from '../middleware/api';
import rootReducer from '../reducers';
import config from '../config.js';

import socketIO from 'socket.io-client';
import socketIoMiddleware from 'redux-socket.io-middleware';
// import createSagaMiddleware from 'redux-saga';

// function customSerialize(subset) {
// 	let state = subset;
// 	if (subset.newProject) {
// 		state = config.defaults.defaultState;
// 		state.address = subset.address;
// 	}
// 	return JSON.stringify(state);
// }
//
// // serialized moments seemed to be stored as strings
// // so when we get from localstorage we need to reconvert to moment
// function customDeserialize(serializedData) {
// 	return JSON.parse(serializedData);
// }
//
// const stateConfig = { serialize:customSerialize, deserialize:customDeserialize };

// Removed localhost address... seems like recent socket.io doesnt take this any longer
var io = socketIO.connect();

const configureStore = () => {
	// const sagaMiddleware = createSagaMiddleware();
	const store = createStore(
		rootReducer,
		config.defaults.defaultState,
		compose(
			applyMiddleware(
				createLogger(),
				socketIoMiddleware(io),
			),
		)
	);

	if (module.hot) {
    // Enable Webpack hot module replacement for reducers
		module.hot.accept('../reducers', () => {
			const nextRootReducer = require('../reducers').default;
			store.replaceReducer(nextRootReducer);
		});
	}

	// store.runSaga = sagaMiddleware.run;

	return store;
};

export default configureStore;
