import { Component, inject } from '@angular/core';
import { SidebarMenu } from './routes.constant';
import { fillerNav } from 'src/app/constants/sidebar-menus.constant';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  menuItems: SidebarMenu[] = fillerNav;

  userService = inject(UserService)

  ngOnInit() {
    this.initMenu();
  }

  async initMenu() {
    if (!await this.userService.isSuperAdmin()) {
      this.menuItems = this.menuItems.filter(menuItem => menuItem?.role !== 'super-admin');
    }
  }
}
