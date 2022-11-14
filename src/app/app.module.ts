import { OfflineInterceptor } from './interceptors/offline.interceptor';
import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
import {FileUploadModule} from 'primeng/fileupload';
import {ToolbarModule} from 'primeng/toolbar';
import {RatingModule} from 'primeng/rating';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {MenubarModule} from 'primeng/menubar';
import {InputSwitchModule} from 'primeng/inputswitch';
import {PasswordModule} from 'primeng/password';
import {CardModule} from 'primeng/card';
import {TreeModule} from 'primeng/tree';
import {DividerModule} from 'primeng/divider';
import {PanelModule} from 'primeng/panel';

import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { LoginComponent } from './components/login/login.component';
import { ItemDialogComponent } from './components/common/item-dialog/item-dialog.component';
import { UsersDialogComponent } from './components/users/users-dialog/users-dialog.component';
import { ItemsTableComponent } from './components/common/items-table/items-table.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { RacesComponent } from './components/races/races.component';
import { RacersComponent } from './components/racers/racers.component';
import { SeasonsComponent } from './components/seasons/seasons.component';
import { TreeComponent } from './components/tree/tree.component';
import { RacerRegistrationComponent } from './components/racer-registration/racer-registration.component';
import { RaceListComponent } from './components/race-list/race-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ItemsFilterPipe } from './pipes/items-filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    LoginComponent,
    ItemDialogComponent,
    UsersDialogComponent,
    ItemsTableComponent,
    CategoriesComponent,
    RacesComponent,
    RacersComponent,
    SeasonsComponent,
    TreeComponent,
    RacerRegistrationComponent,
    RaceListComponent,
    ProfileComponent,
    ItemsFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,

    TableModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
		ButtonModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
    HttpClientModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    FormsModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,    
    MenubarModule,
    InputSwitchModule,
    PasswordModule,
    CardModule,
    ReactiveFormsModule,
    TreeModule,
    DividerModule,
    PanelModule,
   ],
  providers: [
    AuthGuard,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: OfflineInterceptor,
    //   multi: true,
    // }    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
