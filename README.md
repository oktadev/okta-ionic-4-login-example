# Ionic 4 App with Login and Registration

This example shows how to create an Ionic application that uses uses OpenID Connect (OIDC) for login. 

Please read [Tutorial: User Login and Registration in Ionic 4](https://developer.okta.com/blog/2019/06/20/ionic-4-tutorial-user-authentication-and-registration) to see how this application was created.

**Prerequisites:** [Node.js](https://nodejs.org/).

> [Okta](https://developer.okta.com/) has Authentication and User Management APIs that reduce development time with instant-on, scalable user infrastructure. Okta's intuitive API and expert support make it easy for developers to authenticate, manage, and secure users and roles in any application.

* [Getting Started](#getting-started)
* [Links](#links)
* [Help](#help)
* [License](#license)

## Getting Started

To install this example application, run the following commands:

```bash
git clone https://github.com/oktadeveloper/okta-ionic-4-login-example.git ionic-login
cd ionic-login
```

This will get a copy of the project installed locally. Then run the following command to install Ionic CLI.

```
npm install -g ionic@4.12.0
```

Then install the application's dependencies:

```
npm install
```

To integrate Okta's Identity Platform for user authentication, you'll first need to:

* [Register](https://www.okta.com/developer/signup/) and create an OIDC application
* Log in to your Okta account and navigate to **Applications > Add Application** 
* Select **Native** and click **Next**
* Give your application a name (e.g. "Ionic 4 App")
* Add a `http://localhost:8100/implicit/callback` as a Login redirect URI and click **Done**.
* Click **Edit** and add Logout redirect URIs, where the first should be your reversed Okta domain name, followed by `:/logout` and the second is `http://localhost:8100/implicit/logout`. Click **Save**.

After performing these steps, copy your `issuer` and `clientId` into [`src/app/auth/auth.service.ts`](https://github.com/oktadeveloper/okta-ionic-4-login-example/blob/master/src/app/auth/auth.service.ts#L39).

```typescript
const clientId = '{yourClientId}';
const issuer = 'https://{yourOktaDomain}/oauth2/default';
const scopes = 'openid profile offline_access';

if (this.platform.is('cordova')) {
  this.authConfig = {
    identity_client: clientId,
    identity_server: issuer,
    redirect_url: '{yourReversedOktaDomain}:/callback',
    scopes: scopes,
    usePkce: true,
    end_session_redirect_url: '{yourReversedOktaDomain}:/logout',
  };
}
```

Now you should be able to run the app and login.

```
ionic serve
```

## Links

This example uses the following libraries provided by Okta:

* [OktaDev Schematics](https://github.com/oktadeveloper/schematics#readme)

It also uses the following library provided by [Matthew Wieland](https://github.com/wi3land):

* [Ionic AppAuth](https://github.com/wi3land/ionic-appauth#readme)

## Help

Please post any questions on the [associated blog post](https://developer.okta.com/blog/2019/06/20/ionic-4-tutorial-user-authentication-and-registration) or on the [Okta Developer Forums](https://devforum.okta.com/). 

## License

Apache 2.0, see [LICENSE](LICENSE).
