export default class UserInfo {
  constructor({userNameSelector, userInfoSelector}){
    this._userName = document.querySelector(userNameSelector);
    this._userInfo = document.querySelector(userInfoSelector);
  }

  getUserInfo(){
    const info = {};

    info.userName = this._userName.textContent;
    info.userInfo = this._userInfo.textContent;

    return info;
  }

  setUserInfo(newName, newInfo){
    this._userName.textContent = newName;
    this._userInfo.textContent = newInfo;
  }
}