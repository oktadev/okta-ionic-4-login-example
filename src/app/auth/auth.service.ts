import { Platform } from '@ionic/angular';
import { Injectable, NgZone } from '@angular/core';
import { IonicAuth, IonicAuthorizationRequestHandler } from 'ionic-appauth';
import { BrowserService } from './browser.service';
import { CordovaRequestorService } from './cordova-requestor.service';
import { SecureStorageService } from './secure-storage.service';
import { StorageService } from './storage.service';
import { RequestorService } from './requestor.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService extends IonicAuth {

  constructor(requestor: RequestorService, cordovaRequestor: CordovaRequestorService,
              storage: StorageService, secureStorage: SecureStorageService, browser: BrowserService,
              private platform: Platform, private ngZone: NgZone) {
      super((platform.is('cordova')) ? browser : undefined,
        (platform.is('cordova')) ? secureStorage : storage,
        (platform.is('cordova')) ? cordovaRequestor : requestor);

    this.addConfig();
  }

  public async startUpAsync() {
    if (this.platform.is('cordova')) {
      (<any>window).handleOpenURL = (callbackUrl) => {
        this.ngZone.run(() => {
          this.handleCallback(callbackUrl);
        });
      };
    }

    super.startUpAsync();
  }

  private addConfig() {
    const clientId = '0oakiqeld0yTtNAxW356';
    const issuer = 'https://dev-133320.okta.com/oauth2/default';
    const scopes = 'openid profile offline_access';

    if (this.platform.is('cordova')) {
      this.authConfig = {
        identity_client: clientId,
        identity_server: issuer,
        redirect_url: 'com.okta.dev-133320:/callback',
        scopes: scopes,
        usePkce: true,
        end_session_redirect_url: 'com.okta.dev-133320:/logout',
      };
    } else {
      this.authConfig = {
        identity_client: clientId,
        identity_server: issuer,
        redirect_url: 'http://localhost:8100/implicit/callback',
        scopes: scopes,
        usePkce: true,
        response_type: 'code',
        end_session_redirect_url: 'http://localhost:8100/implicit/logout',
      };
    }
  }

  private handleCallback(callbackUrl: string): void {
    if ((callbackUrl).indexOf(this.authConfig.redirect_url) === 0) {
      this.AuthorizationCallBack(callbackUrl).catch((error: string) => {
        console.error(`Authorization callback failed! ${error}`);
      });
    }

    if ((callbackUrl).indexOf(this.authConfig.end_session_redirect_url) === 0) {
      this.EndSessionCallBack().catch((error: string) => {
        console.error(`End session callback failed! ${error}`);
      });
    }
  }
}
