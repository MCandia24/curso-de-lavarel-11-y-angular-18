import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { AppComponent } from 'src/app/app.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserDeleteComponent } from './user-delete/user-delete.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';


@NgModule({
  declarations: [
    UserComponent,
    UserListComponent,
    UserAddComponent,
    UserEditComponent,
    UserDeleteComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,

    HttpClientModule,
    FormsModule,
    //NgModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
   
    
  ],
  bootstrap: [AppComponent]
})
export class UserModule { }
