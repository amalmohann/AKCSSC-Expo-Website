import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class HttpAPIInterceptor implements HttpInterceptor {
  token: string = '';
  constructor(private authService: AuthService,private router:Router, private spinner:NgxSpinnerService) {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const loginReq = '/auth/login';
    const postReq ='/post'
    const postLike ='/post/like';
    console.log(request.url);
    
    console.log(request.url.search(postLike));
    if ((request.url.search(loginReq) == -1 && request.url.search(postReq) == -1 )|| request.url.search(postLike)>=0) {
      console.log(this.authService.validUser());
      if(this.authService.validUser()){
        let Fetchtoken = this.authService.getToken();
        this.token = Fetchtoken ? Fetchtoken : '';
        console.log(this.token);
        
        let httpReq = request.clone({
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: this.token,
          }),
        });
        return next.handle(httpReq);
      }
      else{
        this.authService.logout();
        this.router.navigate(['/sign-in']);
        this.spinner.hide();
      }
      
    }
    return next.handle(request);
  }
}
