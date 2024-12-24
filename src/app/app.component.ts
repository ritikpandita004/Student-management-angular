import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})

export class AppComponent {

  isSidebarCollapsed = false;  // Initialize collapsed state
  title = 'student-management-system';
  constructor(private translate: TranslateService) {}





  switchLanguage(lang: 'hi' | 'en') {
    this.translate.use(lang);
  }


  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

}



