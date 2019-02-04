import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@inject(Lazy.of(HttpClient))
export class Users {

  heading = 'Github Users';
  users = [];

  constructor(getHttpClient) {
    this.getHttpClient = getHttpClient;
  }

  activate() {
    const http = this.http = this.getHttpClient();

    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('https://api.github.com/');
    });

    http.fetch('users')
      .then(response => response.json())
      .then(data => {
        this.users = data;
      });
  }
}
