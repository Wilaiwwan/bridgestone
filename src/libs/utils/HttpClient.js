// import store from "redux/store";

export class HttpClient {
  _baseUrl = "";

  _accessToken = "";

  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  setToken(accessToken) {
    this._accessToken = accessToken;
  }

  setBaseUrl(baseUrl) {
    this._baseUrl = baseUrl;
  }

  getAuthorization(token = this._accessToken) {
    return token ? `Bearer ${token}` : "";
  }

  async get(endpoint) {
    try {
      const configs = {
        url: `${this._baseUrl}${endpoint}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: this.getAuthorization(),
        },
        method: "GET",
      };

      console.log("HttpClient request => ", configs);

      const httpResponse = await this.httpRequest(configs);
      const response = await this.handle401(httpResponse, configs);

      console.log("HttpClient response => ", response);

      return response.json();
    } catch (error) {
      console.log("error => ", error);
      return Promise.reject(error);
    }
  }

  async getBlob(endpoint) {
    try {
      const configs = {
        url: `${this._baseUrl}${endpoint}`,
        headers: {
          responseType: "blob",
          Authorization: this.getAuthorization(),
        },
        method: "GET",
      };
      const httpResponse = await this.httpRequest(configs);
      const response = await this.handle401(httpResponse, configs);

      return response.blob();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async post(endpoint, body = {}, isFormData = false) {
    try {
      const configs = {
        url: `${this._baseUrl}${endpoint}`,
        headers: {
          ...(!isFormData && { "Content-Type": "application/json" }),
          Authorization: this.getAuthorization(),
        },
        method: "POST",
        body: isFormData ? body : JSON.stringify({ ...body }),
      };

      console.log("HttpClient request => ", configs);

      const httpResponse = await this.httpRequest(configs);
      const response = await this.handle401(httpResponse, configs);

      console.log("HttpClient response => ", response);

      return response.json();
    } catch (error) {
      console.log("error => ", error);
      return Promise.reject(error);
    }
  }

  // async handle401(res, req) {
  //   if (res.status !== 401) return res;

  //   // const { dispatch, getState } = store;

  //   try {
  //     // await dispatch(refreshToken(false));
  //     const newAccessToken = getState().auth.accessToken;
  //     const response = await this.httpRequest({
  //       ...req,
  //       headers: {
  //         ...req.headers,
  //         Authorization: this.getAuthorization(newAccessToken),
  //       },
  //     });
  //     return response;
  //   } catch (error) {
  //     return Promise.reject("Session expired!!", "Please try to login again.");
  //   }
  // }

  async httpRequest(req) {
    const response = await fetch(req.url, {
      headers: req.headers,
      method: req.method,
      body: req.body,
    });

    return response;
  }

  getNewInstant() {
    const newInstant = new HttpClient();
    newInstant.setBaseUrl(this._baseUrl);
    newInstant.setToken(this._accessToken);
    return newInstant;
  }
}

const httpClientInstants = new HttpClient();

export default httpClientInstants;
