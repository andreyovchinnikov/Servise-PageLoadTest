class AuthFormModel {
  constructor() {
    this.statusCode = null;
  }

  /**
   * @public
   */
  sendRequest(formData) {
    ajaxPost(FILE_AUTH, this.constructor.getQueryString(formData), this.constructor.getStatus.bind(this));
  }

  /**
   * @private
   */
  static getStatus(response) {
    if ('response' in response) {
      switch (parseInt(response.response)) {
        case SUCCESS_STATUS:
          this.statusCode = SUCCESS_STATUS;
          break;
        case LOGIN_PASSWORD_INCORRECT:
          this.statusCode = LOGIN_PASSWORD_INCORRECT;
          break;
      }
    }
  }

  static getQueryString(formData) {
    let pairs = [];
    for (let [key, value] of formData.entries()) {
      pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
    }
    return pairs.join('&');
  }
}