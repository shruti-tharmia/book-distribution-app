class Http {
  baseURL = "http://192.168.1.202:3000/";
  jwtToken = "";
  async send(url, option = {}) {
    const response = await fetch(`${this.baseURL}${url}`, option);
    console.log(response);
    const data = await response.json();
    console.log(data);

    // console.log(token)
    if (data.data) {
      if (data.data.token) {
        this.jwtToken = data.data.token;
      }
    } else {
      console.log(data);
    }
    return data;
  }
  get(url) {
    return this.send(url, {
      headers: {
        Authorization: `${this.jwtToken}`,
      },
    });
  }
  post(url, data) {
    if (data.data) {
      if (data.data.token) {
        return this.send(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      }
    } else {
      return this.send(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${this.jwtToken}`,
        },
        body: JSON.stringify(data),
      });
    }
  }
  delete(url) {
    return this.send(url, {
      method: "DELETE",
      headers: {
        Authorization: `${this.jwtToken}`,
      },
    });
  }
  put(url, data) {
    if (data.data) {
      if (data.data.token) {
        return this.send(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${this.jwtToken}`,
          },
          body: JSON.stringify(data),
        });
      }
    } else {
      return this.send(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${this.jwtToken}`,
        },
        body: JSON.stringify(data),
      });
    }
  }
}
export const http = new Http();
