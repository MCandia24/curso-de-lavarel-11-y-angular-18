
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../service/user.service';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit{

  @Input() user:any;

  @Output() UserE: EventEmitter<any> = new EventEmitter();

  confirmation_password: any=null;
  password: any=null;
  email: any=null;
  surname: any=null;
  name: any=null;
  IMAGEN_PREVIEW:any="./assets/media/avatars/300-6.jpg";
  FILE_AVATAR: any = null;
  isLoading:any;
  
  constructor(
    public userService: UserService,
    public toastr: ToastrService,
    public modal: NgbActiveModal,
  ){}

  
  ngOnInit(): void{
   // this.modal.dismiss();
   this.isLoading = this.userService.isLoading$;
   this.email = this.user.email;
   this.surname = this.user.surname;
   this.name = this.user.name;
   this.IMAGEN_PREVIEW = this.user.avatar;
  }
  
  processAvatar($event: any) {
    if ($event.target.files[0].type.indexOf('image') < 0) {
      this.toastr.error('Solamente se aceptan imágenes', 'Validación');
      return;
    
    }
    this.FILE_AVATAR = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.FILE_AVATAR);
    reader.onloadend = () => this.IMAGEN_PREVIEW = reader.result;
    }
  
    store(){
  
      if(!this.name || !this.surname || !this.email){
          this.toastr.error('Completa todo los campos', 'Validación');
          return;
      }
      if(this.password){
      if(this.password != this.confirmation_password){
        this.toastr.error('la validación de contraseña es diferente', 'Validación');
        return;
        }}
      let formData = new FormData();
  
      formData.append("name", this.name);
      formData.append("surname", this.surname);
      formData.append("email", this.email);
      if(this.password){
        formData.append("password", this.password);
      }
      if(this.FILE_AVATAR){
        formData.append("imagen", this.FILE_AVATAR);
      }
     
  
  
     
      this.userService.update(formData,this.user.id).subscribe((resp:any) =>{ // recibimos la respuesta del backend
        console.log('datos', resp);
        this.UserE.emit(resp.user);
      this.toastr.success('USUARIO MODIFICADO CORRECTAMENTE','EXITO');
      this.modal.close();
      });
    }

}
