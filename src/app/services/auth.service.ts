import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {AuthData} from '../models/auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.baseUrl;
  // userChange = new Subject<UserInfo>();
  private isAuthenticated = false;
  // loggedUser: UserInfo;

  constructor(private router: Router,
              private httpClient: HttpClient) {}

  registerUser(authData: AuthData) {
    this.httpClient.post(this.baseUrl + '/signup', authData)
      .subscribe(user => {
      //this.uiService.isLoadingChanged.next(false);
      // this.uiService.openSnackBar('Register successfully, please Login', null, 5000);
      //this.uiService.isLoginChanged.next(true);
    }, err => {
      // this.uiService.openSnackBar(err.error.message, null, 5000);
      //this.uiService.isLoadingChanged.next(false);
    });
  }

  login(authData: AuthData) {
    this.getToken(authData);
  }

  private getToken(authData: AuthData) {

    this.httpClient.post(this.baseUrl + '/login', authData, {observe: 'response'})
      .subscribe(resp => {
        const token = resp.headers.get('token');
        const exp = resp.headers.get('expiration');
        localStorage.setItem('access_token', token);
        localStorage.setItem('expiration_token', exp);
        console.log('Obtained Access token');
        // this.authSuccessfully();
      }, err => {
        // this.uiService.openSnackBar('Invalid username or password', null, 5000);
        // this.uiService.isLoadingChanged.next(false);
      });
  }

  logout() {
    this.isAuthenticated = false;
    localStorage.clear();
    this.router.navigate(['/welcome-page']);
  }

  isAuth() {
    return this.isAuthenticated;
  }

  private authSuccessfully() {
    // this.uiService.isLoadingChanged.next(false);
    this.isAuthenticated = true;
    // this.uiService.isShowBudgetSelectChanged.next(true);
    // this.uiService.openSnackBar('Logging successfully, please select your Budget', null, 5000);
  }


  getLoggedInUser() {
    /*this.httpClient.get<UserInfo>(this.baseUrl + '/user')
      .subscribe((user) => {
        this.loggedUser = user;
        environment.loggedUser = user;
      this.userChange.next(user);
    });*/
  }
}
