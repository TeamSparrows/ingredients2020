import auth0 from 'auth0-js';
import history from '../components/history';
import $ from 'jquery';
import {bindAll} from 'lodash';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: process.env.REACT_APP_DOMAIN,
    clientID: process.env.REACT_APP_CLIENTID,
    redirectUri: process.env.REACT_APP_REDIRECTURI,
    audience: process.env.REACT_APP_AUDIENCE,
    responseType: 'token id_token',
    scope: 'openid email'
  });


  constructor(props) {
    bindAll(this, 'login', 'logout', 'handleAuthentication', 'isAuthenticated','getEmailFromAuth0','findOrCreateUser', 'getAccessToken');
  }
  findOrCreateUser(err, email) {
    $.post('/api/findOrCreateUser', email)
     .done((username) => {
       localStorage.setItem('username', username);
     })
     .fail(() => {
       console.log('couldnt find or create user!!!');
     })
  }

  getAccessToken () {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    return accessToken;
  }

  getEmailFromAuth0(cb) {
    let accessToken = this.getAccessToken();
    this.auth0.client.userInfo(accessToken, (err, email) => {
      if (email) {
        cb(err, email);
      }
    });
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        this.getEmailFromAuth0(this.findOrCreateUser);
        history.replace('/dashboard');
      } else if (err) {
        history.replace('/dashboard');
        console.log(err);
      }
    });
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    history.replace('/dashboard');
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    history.replace('/');
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    let returnVal = new Date().getTime() < expiresAt;
    return returnVal;
  }
}
