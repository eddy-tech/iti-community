import { NzMessageService } from 'ng-zorro-antd/message';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, } from '@angular/forms';
import { Router } from '@angular/router';
import { UserQueries } from '../../services/user.queries';
import { UserService } from '../../services/user.service';

class UserRegistrationFormModel {
  username = "";
  password = "";
  confirmPassword = "";
}


@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.less']
})
export class UserRegistrationComponent implements OnInit {
  @ViewChild("f")
  form: NgForm;

  model = new UserRegistrationFormModel();

  message : string = "Les deux mots de passe ne correspondent pas !"

  messageWarning : string = "Ce nom d'utilisateur existe déjà!"

  successMessage : string = "Félicitation, Vous vous êtes bien enregistré !"


  constructor( private router: Router, private userService: UserService,
    private userQueries: UserQueries,   private nzMessageService: NzMessageService)
  { }

  ngOnInit(): void {
  }


  async submit(registerForm : NgForm) {
    // console.log("Valeurs :", registerForm);
    // console.log("Mes biens :",this.model.username, this.model.password,this.model.confirmPassword );


    // TODO  Vérifier que la confirmation de mot de passe correspond au mot de passe
    if (this.form.form.invalid || this.model.password !== this.model.confirmPassword) {
      this.nzMessageService.error(this.message);
      return;
    }

    if(await this.userQueries.exists(this.model.username)){
      this.nzMessageService.warning(this.messageWarning);
      return
    }

    this.nzMessageService.success(this.successMessage);

    // TODO Enregistrer l'utilisateur via le UserService
    this.userService.register(this.model.username, this.model.password);
    this.goToLogin();
  }

  goToLogin() {
    // TODO rediriger l'utilisateur sur "/splash/login"
   this.router.navigate(['/splash/login'])
  }
}
