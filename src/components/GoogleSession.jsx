import React, {Component} from 'react';

export default class GoogleSession extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    this.loadGoogleApi(() => {
      const {clientId} = this.props;

      window.gapi.load('auth2', () => {
        this.setState({disabled: false});

        const authInstance = window.gapi.auth2.getAuthInstance();
        if(!authInstance) {
          const successInit = result => {
            if(result.isSignedIn.get()) {
              this.handleSigninSuccess(result.currentUser.get())
            }
          };
          const failureInit = err => onFailure(err);

          window.gapi.auth2.init({
            client_id: clientId
          }).then(successInit, failureInit);
        }
      })
    });
  }

  handleSigninSuccess(res) {
    const basicProfile = res.getBasicProfile();
    const authResponse = res.getAuthResponse();

    res.googleId = basicProfile.getId();
    res.tokenObj = authResponse;
    res.tokenId  = authResponse.id_token;
    res.accessToken = authResponse.access_token;
    res.profileObj = {
      googleId: basicProfile.getId(),
      imageUrl: basicProfile.getImageUrl(),
      email: basicProfile.getEmail(),
      name: basicProfile.getName(),
      givenName: basicProfile.getGivenName(),
      familyName: basicProfile.getFamilyName(),
    };

    this.setState({loggedIn: true});

    const {onSuccess} = this.props;
    onSuccess && onSuccess(res);
  }

  loadGoogleApi(onload) {
    const id = 'google-login';
    const tagName = 'script';
    const element = document.getElementsByTagName(tagName)[0];
    const gapiElement = document.createElement(tagName);
    gapiElement.id = id;
    gapiElement.src = '//apis.google.com/js/client:platform.js';
    element.parentNode.insertBefore(gapiElement, element);
    gapiElement.onload = onload;
  }

  signIn(event) {
    event.preventDefault();
    if(!this.state.disabled) {
      const {onFailure} = this.props;

      const authInstance = window.gapi.auth2.getAuthInstance();
      const options = {};
      const successSignin = res => this.handleSigninSuccess(res);
      const failureSignin = err => onFailure(err);
      authInstance.signIn(options).then(successSignin, failureSignin);
    }
  }

  signOut(event) {
    event.preventDefault();
    const authInstance = window.gapi.auth2.getAuthInstance();
    if(authInstance) {
      const {onSuccessLogout} = this.props;
      authInstance.signOut().then(() => {
        this.setState({loggedIn: false});
        onSuccessLogout && onSuccessLogout();
      });
    }
  }

  render() {
    const {loggedIn} = this.state;
    return (
      <span>
        {!loggedIn && <a href='#' onClick={this.signIn}>Login</a>}
        {loggedIn && <a href='#' onClick={this.signOut}>Logout</a>}
      </span>
    );
  }
}
