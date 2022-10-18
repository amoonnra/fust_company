const TOKEN_KEY = 'jwt-token';
const REFRESH_KEY = 'jwt-refresh-token';
const EXPIRES_KEY = 'jwt-expires';
const USER_ID_KEY = 'jwt-user-id';

function setTokens({ refreshToken, accessToken, userId, expiresIn = 3600 }) {
	const expireDate = new Date().getTime() + +expiresIn * 1000;
	localStorage.setItem(TOKEN_KEY, accessToken);
	localStorage.setItem(REFRESH_KEY, refreshToken);
	localStorage.setItem(EXPIRES_KEY, expireDate);
	localStorage.setItem(USER_ID_KEY, userId);
}
function removeAccessTokens() {
	localStorage.removeItem(TOKEN_KEY);
	localStorage.removeItem(REFRESH_KEY);
	localStorage.removeItem(EXPIRES_KEY);
	localStorage.removeItem(USER_ID_KEY);
}
function getAccessToken() {
	return localStorage.getItem(TOKEN_KEY);
}
function getRefreshToken() {
	return localStorage.getItem(REFRESH_KEY);
}
function getTokenExpiresDate() {
	return localStorage.getItem(EXPIRES_KEY);
}
function getUserID() {
	return localStorage.getItem(USER_ID_KEY);
}
const localStorageService = {
	setTokens,
	getAccessToken,
	getRefreshToken,
	getTokenExpiresDate,
	getUserID,
	removeAccessTokens,
};

export default localStorageService;
