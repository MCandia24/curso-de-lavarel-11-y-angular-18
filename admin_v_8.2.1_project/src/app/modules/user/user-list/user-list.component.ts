
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../service/user.service';
import { UserAddComponent } from '../user-add/user-add.component';
import { UserDeleteComponent } from '../user-delete/user-delete.component';
import { UserEditComponent } from '../user-edit/user-edit.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  


  USERS:any = [];
  isLoading:any = null;

  constructor(
    public modalService: NgbModal,
    public userService: UserService,
  ){
  
   
  } 
  ngOnInit(): void {
    this.isLoading = this.userService.isLoading$;
  
    this.listUser();
    
    /*this.userService.listUsers().subscribe({
      next: (resp: any) => {
        this.USERS = resp?.users?.data || [];
        console.log(resp);
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
        this.USERS = []; // Fallback en caso de error.
      }
     
    }
      ); */
    
  }
  listUser(){
    this.userService.listUsers().subscribe((resp:any)=> {
      console.log(resp)//recibo todos los usuarios desde el backend de tipo admin
      this.USERS = resp.users.data;
   })
  }
    openModalCreateUser(){
      const modalRef = this.modalService.open(UserAddComponent,{centered: true, size: 'md'});

      modalRef.componentInstance.UserC.subscribe((User:any) => {
      console.log(User);
 
          
     // this.USERS.unshift(User);
      this.listUser();

      })

    }

    editUser(USER: any) {
      const modalRef = this.modalService.open(UserEditComponent,{centered: true, size: 'md'});
      modalRef.componentInstance.user = USER;

      modalRef.componentInstance.UserE.subscribe((User:any) => {
        console.log(User);
        let INDEX = this.USERS.findIndex((item:any) => item.id == User.id);
        this.USERS[INDEX] = User;

      })

}
deleteUser(USER:any){
  const modalRef= this.modalService.open(UserDeleteComponent,{centered: true, size: 'md'});
  modalRef.componentInstance.user= USER; //componentInstance permite acceder a variables dentro de user component y setear el valor con alguna variable que desee(usuario)
  modalRef.componentInstance.UserD.subscribe((resp:any) => {
    
    let INDEX =this.USERS.findIndex((item:any) => item.id == USER.id);
    this.USERS.splice(INDEX,1);
  })

}
}
