import { Component, OnInit, ViewChild } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from "ng-zorro-antd/message";
import { AuthenticationService } from '../../services/authentication.service';

class LoginFormModel {
  username = "";
  password = "";
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  @ViewChild(NgForm, { static: false })
  ngForm: NgForm;

  model = new LoginFormModel();

  messageError = "Username ou mot de passe incorrect !"

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private nzMessageService: NzMessageService,
  ) {
  }

  ngOnInit(): void {
  }

  goToRegistration() {
    // TODO naviguer vers "/splash/register"
    this.router.navigate(['/splash/register'])
  }


  submit(registerForm : NgForm) {
    this.login();
  }

  async login() {
    if (this.ngForm.form.invalid) {
      this.nzMessageService.error(this.messageError);
      return;
    }

    try {
      // TODO vérifier le résultat de l'authentification. Rediriger sur "/" en cas de succès ou afficher une erreur en cas d'échec
      await this.authService.authenticate(this.model.username, this.model.password)
                                .then(() => this.router.navigate(['/']))
                                    .catch(() => this.goToRegistration())
    } catch (e) {
      this.nzMessageService.error("Une erreur est survenue. Veuillez réessayer plus tard");
    }
  }
}
