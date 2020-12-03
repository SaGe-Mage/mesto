export default class UserInfo {
	constructor({userNameSelector, userInfoSelector, userAvatarSelector}) {
		this._userName = document.querySelector(userNameSelector);
		this._userInfo = document.querySelector(userInfoSelector);
		this._userAvatar = document.querySelector(userAvatarSelector);
	}

	getUserInfo() {
		const info = {};

		info.userName = this._userName.textContent;
		info.userInfo = this._userInfo.textContent;

		return info;
	}

	setUserInfo(newName, newInfo) {
		this._userName.textContent = newName;
		this._userInfo.textContent = newInfo;
	}

	setUserAvatar(newAvatar) {
		this._userAvatar.src = newAvatar;
	}
}