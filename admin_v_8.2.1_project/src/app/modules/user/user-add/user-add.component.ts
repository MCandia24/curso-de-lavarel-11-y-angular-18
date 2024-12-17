import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

confirmation_password: any=null;
password: any=null;
email: any=null;
surname: any=null;
name: any=null;
IMAGEN_PREVIEW:any="./assets/media/avatars/300-6.jpg";
FILE_AVATAR: any = null;
isLoading:any;


@Output() UserC: EventEmitter<any> = new EventEmitter();

constructor(
  public userService: UserService,
  public toastr: ToastrService,
  public modal: NgbActiveModal,
){}

ngOnInit(): void{
  // this.modal.dismiss();
  this.isLoading = this.userService.isLoading$;
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

    if(!this.name || !this.surname || !this.email || !this.password 
      || !this.confirmation_password || !this.FILE_AVATAR){
        this.toastr.error('Completa todo los campos', 'Validación');
        return;
    }
    if(this.password != this.confirmation_password){
      this.toastr.error('la validación de contraseña es diferente', 'Validación');
      return;
      }
    let formData = new FormData();

    formData.append("name", this.name);
    formData.append("surname", this.surname);
    formData.append("email", this.email);
    formData.append("password", this.password);
    formData.append("role_id", "1");
    formData.append("type_user", "2");
    formData.append("imagen", this.FILE_AVATAR);


    this.userService.register(formData).subscribe((resp:any)=>{
      console.log('datos', resp);
      this.UserC.emit(resp.user);
      this.modal.close();
    this.toastr.success('USUARIO REGISTRADO CORRECTAMENTE','EXITO');
    });
  }

}
