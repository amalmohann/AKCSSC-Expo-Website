import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  signIn: boolean = false;
  broadcastReceiver = new BroadcastChannel('login');
  username: string | null = "";
  role: string | null = null;

  constructor(private authService: AuthService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.broadcastReceiver.addEventListener('message', (login) => {
      this.signIn = login.data
      this.username = localStorage.getItem('name');
      this.role = localStorage.getItem('role');
    });
  }

  public logOut() {
    this.spinner.show();
    this.authService.logout();
  }
}
