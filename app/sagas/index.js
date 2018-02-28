import { put, takeEvery } from 'redux-saga/effects';
import config from '../config.js';
// import { TEST, PAY_REFERER, VERIFY_EMAIL, setLoadingOffset, setEnergyProduction, navigate, changeFormIndex, onFormReset, LOGIN, SET_DRAWID, SET_IMAGE, SET_RATE,
// 	GET_RATE, EXPORT_RESULT, SET_ANALYSIS, SET_USAGE, SET_LOADING_RESULTS, SET_PANELS, SET_DRAWING, SET_INFO, GET_PROJECT,
// 	SET_ADDRESS, SET_MONTHLY_BILL, SET_USER, GET_REFERRED_USERS, SET_REFERRED_USERS, SEND_REFERRED_USER, ADD_REFERRED_USER,
// 	UPDATE_USER_INFO, SEND_LEAD, ADD_ALERT, UPLOAD_AVATAR, SEND_BANKS, SUBMIT_LOAN_FORM, SUBMIT_UTILITY_FORM, LIGHTSTRAM_RESULT, LIGHTSTREAM_ERROR, GET_ALL_USERS,
// 	USERS_LIST, GET_SPECIFIC_USER, SPECIFIC_USER_REFERRALS,
// } from '../actions';
import { cloneDeep } from 'lodash';

// service
// import financialCalls from '../services/financialCalls.js';
// import drawingCalls from '../services/drawingCalls.js';
// import generateState from '../services/generateState.js';
// import accountCalls from '../services/accountCalls.js';
// import referalCalls from '../services/referalCalls.js';
// import leadsCall from '../services/leadsCalls';
// import paypalCalls from '../services/paypalCalls';
// import banksCalls from '../services/banksCalls';
// import utilityCalls from '../services/utilityCalls';
// import adminCalls from '../services/adminCalls';

// export function* getRate(action) {
// 	try {
// 		let rate;
// 		if (action.state.address.country_code === 'US') {
//
// 			rate = yield financialCalls.calculateRate(action.state.address.label);
//
// 			const usage = action.state.monthlyBill / rate;
//
// 			yield put({ type:SET_USAGE, value:usage });
// 		}
// 		else if (action.state.address.country_code === 'CA') {
// 			rate = config.enum.CanadaRates[action.state.address.region_code];
// 			const usage = action.state.monthlyBill / rate;
// 			yield put({ type:SET_USAGE, value:usage });
// 		}
// 		else {
// 			rate = action.state.monthlyBill / action.state.usage;
// 		}
// 		yield put({ type:SET_RATE, value:rate });
//
// 		return rate;
// 	}
// 	catch (error) {
// 		yield put({ type: ADD_ALERT, alert: {
// 			type: config.enum.alerts.types.error,
// 		} });
// 	}
// }
//
// export function* exportResult(action) {
// 	try {
// 		let staticUrl;
// 		if (config.mapProvider === 'google') {
// 			staticUrl = config.createStaticGMapsUrl(action.address.lat, action.address.lng);
// 		}
// 		else if (config.mapProvider === 'Microsoft') {
// 			staticUrl = config.createStaticBingMapsUrl(action.address.lat, action.address.lng);
// 		}
// 		const drawing = yield drawingCalls.postDrawing({
// 			rawData: action.rawData,
// 			image: action.image ? action.image : null,
// 			static_url: staticUrl,
// 			monthly_bill: action.state.project.Settings.Pricing.ProjectConnection.Bills[0].amount,
// 			Address: {
// 				address: action.address.label,
// 				latitude: action.address.lat,
// 				longitude: action.address.lng,
// 				region_code: action.address.region_code,
// 				country_code: action.address.country_code,
// 				postal_code: action.address.postal_code,
// 			},
// 		});
// 		drawing.rawData = action.rawData;
// 		yield put({ type:SET_DRAWING, drawing:drawing });
//
// 		const projectAnalysis = yield financialCalls.getProjectAnalysis(action.state);
// 		yield put({ type:SET_ANALYSIS, project:projectAnalysis });
// 		yield put({ type:SET_LOADING_RESULTS, value:false });
// 		yield put({ type:SET_INFO, value:action.imgInfo });
// 		yield put({ type:SET_DRAWID, id:drawing.id });
// 	}
// 	catch (error) {
// 		yield put({ type: ADD_ALERT, alert: {
// 			type: config.enum.alerts.types.error,
// 		} });
// 	}
// }
//
// export function* loadOffet(action) {
// 	try {
// 		put({ type:SET_LOADING_RESULTS, value:true });
// 		put(setLoadingOffset(true));
//
// 		if (action.project) {
// 			let project = cloneDeep(action.project);
// 			project.Panels = action.panelGroups;
//
// 			// TODO: cancel previous queries when changing a lot of things at the same time
// 			// TODO: debounce
// 			const production = yield financialCalls.getEnergyProduction(project);
// 			yield put(setEnergyProduction(production.energy_production_ac));
// 		}
// 	}
// 	catch (error) {
// 		yield put({ type: ADD_ALERT, alert: {
// 			type: config.enum.alerts.types.error,
// 		} });
// 	}
// }
//
// export function* makeResults(action) {
// 	try {
// 		const drawing = yield drawingCalls.getDrawingById(action.drawingId);
// 		drawing.rawData = yield drawingCalls.getDrawingData(drawing.drawingUrl);
// 		yield put({ type:SET_DRAWID, id:action.drawingId });
// 		yield put({ type:SET_DRAWING, drawing:drawing });
// 		yield put({ type:SET_IMAGE, value:drawing.image });
//
// 		let state = config.defaults.defaultState;
// 		yield put({ type:SET_ADDRESS, address:drawing.Address });
// 		state = generateState.setAddress(state, drawing.Address);
//
// 		yield put({ type:SET_MONTHLY_BILL, value:drawing.monthly_bill });
// 		state = generateState.setMonthlyBill(state, drawing.monthly_bill);
//
// 		let rate;
//
// 		if (state.address.country_code === 'US') {
//
// 			rate = yield financialCalls.calculateRate(state.address.label);
//
// 			const usage = state.monthlyBill / rate;
//
// 			yield put({ type:SET_USAGE, value:usage });
// 		}
// 		else if (state.address.country_code === 'CA') {
// 			rate = config.enum.CanadaRates[action.state.address.region_code];
// 			const usage = state.monthlyBill / rate;
// 			yield put({ type:SET_USAGE, value:usage });
// 		}
// 		else {
// 			rate = state.monthlyBill / state.usage;
// 		}
// 		yield put({ type:SET_RATE, value:rate });
//
// 		state = generateState.setRate(state, rate);
//
// 		state = generateState.setUsage(state, drawing.monthly_bill / rate);
// 		yield put({ type:SET_USAGE, value:drawing.monthly_bill / rate });
//
// 		yield put({ type:SET_RATE, value:rate });
//
// 		const panelGroup = generateState.getPanels(drawing.rawData);
// 		yield put({ type:SET_PANELS, panelGroups:panelGroup });
// 		state = generateState.setPanels(state, panelGroup);
// 		const projectAnalysis = yield financialCalls.getProjectAnalysis(state);
// 		yield put({ type:SET_ANALYSIS, project:projectAnalysis });
// 	}
// 	catch (error) {
// 		yield put({ type: ADD_ALERT, alert: {
// 			type: config.enum.alerts.types.error,
// 		} });
// 	}
// }
//
// export function* login(action) {
// 	try {
// 		const user = yield accountCalls.userLogin(action.accessToken);
// 		yield put({ type:SET_USER, user:user });
// 		yield put(navigate('/referal/dashboard'));
//
// 	}
// 	catch (error) {
// 		yield put({ type: ADD_ALERT, alert: {
// 			type: config.enum.alerts.types.error,
// 		} });
// 		yield put(navigate('/'));
// 	}
// }
//
// export function* verifyEmail(action) {
// 	try {
// 		const user = yield accountCalls.verifyEmail(action.accessToken);
// 		if (user.status === config.enum.user.status.registered) {
// 			yield put({ type:SET_USER, user:user });
// 		}
// 	}
// 	catch (error) {
// 		yield put({ type: ADD_ALERT, alert: {
// 			type: config.enum.alerts.types.error,
// 		} });
// 	}
// }
//
// export function* updateUserInfo(action) {
// 	try {
// 		const user = yield accountCalls.sendConfirmedAccount(action.accessToken, action.updatedUserInfo);
// 		yield put({ type:SET_USER, user:user });
// 		yield put(navigate('/referal/dashboard'));
// 	}
// 	catch (error) {
// 		yield put({ type: ADD_ALERT, alert: {
// 			type: config.enum.alerts.types.error,
// 		} });
// 	}
// }
//
// export function* getReferredUsers(action) {
// 	try {
// 		const referredUsers = yield referalCalls.getReferredUsers(action.accessToken);
// 		if (referredUsers) {
// 			yield put({ type:SET_REFERRED_USERS, referredUsers:referredUsers });
// 		}
// 	}
// 	catch (error) {
// 		yield put({ type: ADD_ALERT, alert: {
// 			type: config.enum.alerts.types.error,
// 		} });
// 	}
// }
//
// export function* sendReferredUser(action) {
// 	try {
// 		const newReferredUser = yield referalCalls.sendReferredUser(action.accessToken, action.referredUser);
// 		yield put({ type:ADD_REFERRED_USER, referredUser:newReferredUser });
// 	}
// 	catch (error) {
// 		yield put({ type: ADD_ALERT, alert: {
// 			type: config.enum.alerts.types.error,
// 		} });
// 	}
// }
//
// export function* savePayment(action) {
// 	try {
// 		yield referalCalls.savePayment(action.accessToken, action.information);
// 		yield referalCalls.setMoneySent(action.accessToken, action.information);
// 		yield paypalCalls.makePayout(action.accessToken, action.information);
// 	}
// 	catch (error) {
// 		yield put({ type: ADD_ALERT, alert: {
// 			type: config.enum.alerts.types.error,
// 		} });
// 	}
// }
//
// export function* sendLead(action) {
// 	try {
// 		const response = yield leadsCall.sendLeads(action.lead);
// 		if (response.success) {
// 			yield put({ type: ADD_ALERT, alert: {
// 				title: 'Awesome!',
// 				msg: 'The top local installers will be in touch soon to give you the best available deals tailor-made for your home.',
// 				type: config.enum.alerts.types.success,
// 			} });
// 		}
// 		else {
// 			yield put({ type: ADD_ALERT, alert: {
// 				type: config.enum.alerts.types.error,
// 			} });
// 		}
// 	}
// 	catch (error) {
// 		yield put({ type: ADD_ALERT, alert: {
// 			type: config.enum.alerts.types.error,
// 		} });
// 	}
// }
//
// export function* uploadAvatar(action) {
// 	try {
// 		const user = yield accountCalls.uploadAvatar(action.accessToken, action.file);
// 		yield put({ type:SET_USER, user:user });
// 	}
// 	catch (error) {
// 		if (error.status === 400) {
// 			yield put({ type: ADD_ALERT, alert: {
// 				title: error.response.body.error.message,
// 				msg: error.response.body.error.description,
// 				type: config.enum.alerts.types.error,
// 			} });
// 		}
// 		else {
// 			yield put({ type: ADD_ALERT, alert: {
// 				type: config.enum.alerts.types.error,
// 			} });
// 		}
// 	}
// }
//
// export function* paypalTest() {
// 	try {
// 		yield paypalCalls.testCall();
// 	}
// 	catch (error) {
// 		yield put({
// 			type: ADD_ALERT, alert: {
// 				type: config.enum.alerts.types.error,
// 			},
// 		});
// 	}
// }
//
// export function* sendLoanForm(action) {
// 	try {
// 		const lightStreamResult = yield financialCalls.postLightStreamLoanApplication(action.loanFormInfo);
// 		yield put({ type:LIGHTSTRAM_RESULT, lightStreamResult:lightStreamResult });
// 	}
// 	catch (error) {
// 		if (error.status === 400) {
// 			yield put({ type: ADD_ALERT, alert: {
// 				title: error.response.body.error.message,
// 				msg: error.response.body.error.description,
// 				type: config.enum.alerts.types.error,
// 			} });
// 			yield put({ type:LIGHTSTREAM_ERROR });
// 		}
// 		else {
// 			yield put({ type: ADD_ALERT, alert: {
// 				type: config.enum.alerts.types.error,
// 			} });
// 			yield put(navigate('/'));
// 			yield put(changeFormIndex(0));
// 			yield put(onFormReset('applyForLoanForm'));
// 		}
// 	}
// }
//
// export function* sendBanksInfo(action) {
// 	try {
// 		yield banksCalls.sendBanksInfo(action.banksInfo);
// 	}
// 	catch (error) {
// 		yield put({ type: ADD_ALERT, alert: {
// 			type: config.enum.alerts.types.error,
// 		} });
// 	}
// }
//
// export function* sendUtilityInfo(action) {
// 	try {
// 		yield utilityCalls.sendUtilityInfo(action.utilityInfo);
// 	}
// 	catch (error) {
// 		yield put({
// 			type: ADD_ALERT, alert: {
// 				type: config.enum.alerts.types.error,
// 			},
// 		});
// 	}
// }
//
// export function* getAllUsers(action) {
// 	try {
// 		const usersList = yield adminCalls.getAllUsers(action.accessToken);
// 		yield put({ type:USERS_LIST, usersList:usersList });
// 	}
// 	catch (error) {
// 		yield put({
// 			type: ADD_ALERT, alert: {
// 				type: config.enum.alerts.types.error,
// 			},
// 		});
// 	}
// }
//
// export function* getSpecificUser(action) {
// 	try {
// 		const specificUserReferrals = yield adminCalls.getAllReferredUserByAuthId(action.accessToken, action.targetAuth0UserId);
// 		yield put({ type:SPECIFIC_USER_REFERRALS, specificUserReferrals:specificUserReferrals });
// 	}
// 	catch (error) {
// 		yield put({
// 			type: ADD_ALERT, alert: {
// 				type: config.enum.alerts.types.error,
// 			},
// 		});
// 	}
// }

// export function* watchSubmitLoanForm() {
// 	yield takeEvery(SUBMIT_LOAN_FORM, sendLoanForm);
// }
//
// export function* watchEmailVerification() {
// 	yield takeEvery(VERIFY_EMAIL, verifyEmail);
// }
//
// export function* watchMonthlyBill() {
// 	yield takeEvery(GET_RATE, getRate);
// }
//
// export function* watchExport() {
// 	yield takeEvery(EXPORT_RESULT, exportResult);
// }
//
// export function* watchPanels() {
// 	yield takeEvery(SET_PANELS, loadOffet);
// }
//
// export function* watchResults() {
// 	yield takeEvery(GET_PROJECT, makeResults);
// }
//
// export function* watchLogin() {
// 	yield takeEvery(LOGIN, login);
// }
//
// export function* watchGetReferredUsers() {
// 	yield takeEvery(GET_REFERRED_USERS, getReferredUsers);
// }
//
// export function* watchSendReferredUser() {
// 	yield takeEvery(SEND_REFERRED_USER, sendReferredUser);
// }
//
// export function* watchUpdateUserInfo() {
// 	yield takeEvery(UPDATE_USER_INFO, updateUserInfo);
// }
//
// export function* watchPay() {
// 	yield takeEvery(PAY_REFERER, savePayment);
// }
// export function* watchSendLead() {
// 	yield takeEvery(SEND_LEAD,sendLead);
// }
//
// export function* watchUploadAvatar() {
// 	yield takeEvery(UPLOAD_AVATAR, uploadAvatar);
// }
//
// export function* watchTest() {
// 	yield takeEvery(TEST, paypalTest);
// }
//
// export function* watchSendBanks() {
// 	yield takeEvery(SEND_BANKS, sendBanksInfo);
// }
//
// export function* watchSubmitUtilityForm() {
// 	yield takeEvery(SUBMIT_UTILITY_FORM, sendUtilityInfo);
// }
//
// export function* watchGetAllUsers() {
// 	yield takeEvery(GET_ALL_USERS, getAllUsers);
// }
//
// export function* watchGetSpecificUser() {
// 	yield takeEvery(GET_SPECIFIC_USER, getSpecificUser);
// }


export function *watchTest() {
	yield takeEvery('test', doNothing);
}

export function* doNothing(action) {
	console.log('test');
}

export default function* rootSaga() {
	yield [
		watchTest(),
	];
}
