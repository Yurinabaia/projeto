export class FetchApi 
{
  async postApi(url, body, token) {
      return new Promise((resolve, reject) => {
          fetch(url, {
              method: "POST",
              body: body,
              headers: {
                  "Content-type": "application/json; charset=UTF-8",
                  "Authorization": "Bearer "+token
              }
          }).then(response => response.json())
              .then(json => resolve(json));
      });
  }


  async getApi(url,token) {

      return new Promise((resolve, reject) => {
          fetch(url, {
              method: "GET",
              headers: {
                  "Content-type": "application/json; charset=UTF-8",
                  "Authorization": "Bearer "+token
              }
          }).then(response => response.json())
              .then(json => resolve(json));
      });
  }

  async putApi(url, body, token) {
      return new Promise((resolve, reject) => {
          fetch(url, {
              method: "PUT",
              body: body,
              headers: {
                  "Content-type": "application/json; charset=UTF-8",
                  "Authorization": "Bearer "+token

              }
          }).then(response => response.json())
              .then(json => resolve(json));
      });
  }

  async pathApi(url, body, token) {
      return new Promise((resolve, reject) => {
          fetch(url, {
              method: "PATH",
              body: body,
              headers: {
                  "Content-type": "application/json; charset=UTF-8",
                  "Authorization": "Bearer "+token
              }
          }).then(response => response.json())
              .then(json => resolve(json));
      });
  }
}