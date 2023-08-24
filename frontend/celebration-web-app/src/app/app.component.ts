import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { DownloadService } from './services/download.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'NETAS Admin Panel';
  constructor(public authService: AuthService, public downloadService: DownloadService) { }
}
