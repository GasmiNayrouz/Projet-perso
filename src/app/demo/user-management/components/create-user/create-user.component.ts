import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../modeles/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  isSubmitting: boolean = false;
  form!: FormGroup;
  roles = ['ADMIN', 'USER', 'OPERATOR'];

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      appUserRole: ['', [Validators.required]]
    });
  }

onSubmit(): void {
  if (this.form.invalid) return;

  // Create payload with only required fields for backend
  const userPayload = {
    username: this.form.value.username,
    password: this.form.value.password,
    appUserRole: this.form.value.appUserRole
  };

  this.isSubmitting = true;
  this.userService.createUser(userPayload).subscribe({
    next: (createdUser) => {
      this.isSubmitting = false;
      this.toastr.success("User created successfully!", 'Success');
      this.router.navigate(['/user/users-list']);
    },
    error: (err) => {
      this.isSubmitting = false;
      this.toastr.error(err.error || "Error creating user", 'Error');
    }
  });
}

 goBack() {
  this.router.navigate(['/user/users-list']);
}
}
