import { ChangeDetectorRef, Component, inject, OnInit, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { SupabaseSingleton } from 'src/app/classes/Supabase';
import { SidebarMenu } from '../sidebar/routes.constant';
import { UserService } from 'src/app/services/user/user.service';
import { fillerNav } from 'src/app/constants/sidebar-menus.constant';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss'],
})
export class UserLayoutComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  supabase: any;
  email = '';
  menuItems: SidebarMenu[] = fillerNav;

  userService = inject(UserService);
  router = inject(Router);

  options = {
    bottom: 0,
    fixed: false,
    top: 0,
  };

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.supabase = SupabaseSingleton.getInstance();
    this.email = JSON.parse(localStorage.getItem('user') || '{}').user.email;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  async logout() {
    const { error } = await this.supabase.auth.signOut()

    if (!error) {
      localStorage.clear();
      this.router.navigateByUrl('/login');
    }

  }

  goToProfile() {
    this.router.navigateByUrl('dashboard/profile');
  }

  handleRouting(link: string) {
    console.log(link);
  }

}
