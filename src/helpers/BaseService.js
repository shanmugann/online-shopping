import Vue from 'vue';

class BaseService {

  constructor(endpoint, parameters = {}) {
    this.endpoint = endpoint;
    this.parameters = parameters;
  }


  submit(requestType, url, data = null) {
    return new Promise((resolve, reject) => {
      Vue.$http[requestType](url + this.getParameterString(), data)
        .then((response) => {
          if(response) {
            resolve(response);
          } else {
            reject(response)
          }
        })
        .catch(({ response }) => {
          if (response) {
            reject(response);
          } else {
            reject();
          }
        });
    });
  }
  
  getParameterString() {
    const keys = Object.keys(this.parameters);

    const parameterStrings = keys
      .filter((key) => !!this.parameters[key])
      .map((key) => `${key}=${this.parameters[key]}`);

    return parameterStrings.length === 0 ? '' : `?${parameterStrings.join('&')}`;
  }
}

export default BaseService;
