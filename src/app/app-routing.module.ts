import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authentication/auth-guard';
import { LoginComponent } from './authentication/login/login.component';
import { AppliedUserStatusesComponent } from './site-layout/applied-user-statuses/applied-user-statuses.component';
import { AppliedUsersComponent } from './site-layout/applied-users/applied-users.component';
import { CategoriesComponent } from './site-layout/categories/categories.component';
import { ErrorMessagesComponent } from './site-layout/error-messages/error-messages.component';
import { EventsComponent } from './site-layout/events/events.component';
import { GeneralMessagesComponent } from './site-layout/general-messages/general-messages.component';
import { HomeComponent } from './site-layout/home/home.component';
import { JobsComponent } from './site-layout/jobs/jobs.component';
import { LanguagesComponent } from './site-layout/languages/languages.component';
import { PublicContentsComponent } from './site-layout/public-contents/public-contents.component';
import { RolesComponent } from './site-layout/roles/roles.component';
import { SiteLayoutComponent } from './site-layout/site-layout.component';
import { UsersComponent } from './site-layout/users/users.component';
//alkalmazás végpontok, szükséges authguardal
const routes: Routes = [
  {
    path: '',
    component: SiteLayoutComponent,canActivate: [AuthGuard], canActivateChild: [AuthGuard],
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'nyelvek', component: LanguagesComponent, pathMatch: 'full' },
      { path: 'publikus-tartalmak/:key', component: PublicContentsComponent, pathMatch: 'full' },
      { path: 'felhasznalok', component: UsersComponent, pathMatch: 'full' },
      { path: 'rendszeruzenetek', component: GeneralMessagesComponent, pathMatch: 'full' },
      { path: 'hibauzenetek', component: ErrorMessagesComponent, pathMatch: 'full' },
      { path: 'kategoriak', component: CategoriesComponent, pathMatch: 'full' },
      { path: 'allasok', component: JobsComponent, pathMatch: 'full' },
      { path: 'statuszok', component: AppliedUserStatusesComponent, pathMatch: 'full' },
      { path: 'jelentkezett-felhasznalok', component: AppliedUsersComponent, pathMatch: 'full' },
      { path: 'esemenyek', component: EventsComponent, pathMatch: 'full' }
    ]
  },
  { path: 'bejelentkezes', component: LoginComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
