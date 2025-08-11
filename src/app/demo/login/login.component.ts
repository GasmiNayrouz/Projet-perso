import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { error } from 'console'; // Remove this incorrect import
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] // Or './login.component.css' if using CSS
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  isLoggingIn = false; // Flag to prevent multiple clicks

  constructor(
    private loginservice: LoginService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Clear any old token on login page load
    localStorage.removeItem('token');
    
    this.form = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }

  login() {
    if (this.form.valid && !this.isLoggingIn) {
      this.isLoggingIn = true; // Set flag to prevent multiple clicks
      
      const auth = {
        username: this.form.value.username,
        password: this.form.value.password,
      };

      console.log("auth", auth);

      this.loginservice.login(auth).subscribe({
        next: (res: any) => {
          this.isLoggingIn = false; // Reset flag on success
          if (res && res.token) {
            this.toastr.success("Connexion réussie !", "Succès");
            localStorage.setItem("token", res.token);
            console.log("New token received and stored:", res.token);
            this.router.navigate(["/home"]);
          } else {
            console.error("Login successful but no token received:", res);
            this.toastr.warning("Réponse de connexion incomplète.", "Attention");
          }
        },
        error: (err: any) => {
          this.isLoggingIn = false; // Reset flag on error
          console.error("Login error object:", err);

          let errorMessage = 'Échec de la connexion. Veuillez réessayer.';

          // More robust error parsing
          if (err) {
            if (err.status === 403) {
              errorMessage = 'Accès refusé. Vérifiez vos identifiants.';
            } else if (err.status === 0) {
              errorMessage = 'Erreur réseau. Vérifiez votre connexion.';
            } else if (err.status >= 500) {
              errorMessage = 'Erreur serveur. Veuillez réessayer plus tard.';
            } else if (err.error && err.error.message) {
              // Specific message from server error body
              errorMessage = err.error.message;
            } else if (err.message) {
              // General error message
              errorMessage = err.message;
            } else if (err.status) {
              // Fallback based on status code
              errorMessage = `Erreur serveur (${err.status}).`;
            }
          }

          this.toastr.error(errorMessage, "Erreur");
        },
      });
    } else if (this.form.invalid) {
        this.toastr.warning("Veuillez remplir tous les champs correctement.", "Formulaire invalide");
    }
  }
}