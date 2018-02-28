import React from 'react';
import ReactDOM from 'react-dom';
// import { syncHistoryWithStore } from 'react-router-redux';
// import rootSaga from './sagas';
import { Provider } from 'react-redux';

// import Root from './containers/Root';
import MainPage from './containers/MainPage';

// import { history as historyService } from './services';
// import routes from './routes';
import configureStore from './store/configureStore';
import {createBrowserHistory} from 'history'

const store = configureStore();
// store.runSaga(rootSaga);
// const history = syncHistoryWithStore(createBrowserHistory(), store);

ReactDOM.render(
	<Provider store={store}>
		<MainPage />
	</Provider>,
	document.getElementById('root')
);
