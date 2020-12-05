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

	setUserInfo(data) {
		this._userName.textContent = data.name;
		this._userInfo.textContent = data.about;
	}

	setUserAvatar(newAvatar) {
		this._userAvatar.src = newAvatar;
	}
}