import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../modeles/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  user!: User;
  id: number = 0;
  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getUserById(this.id);
  }

  initForm(): void {
    this.form = this.fb.group({
      username: [this.user.username, Validators.required],
      password: [this.user.password, Validators.required],
      appUserRole: [this.user.appUserRole, Validators.required]
    });
  }

  getUserById(id: number): void {
    this.userService.getUserById(id).subscribe((res: User) => {
      this.user = res;
      this.initForm();
    });
  }

  updateUser(): void {
    const updatedUser: User = {
      ...this.user,
      username: this.form.value.username,
      password: this.form.value.password,
      appUserRole: this.form.value.appUserRole
    };

    this.userService.updateUser(updatedUser).subscribe(
      () => this.toastr.success('Updated successfully!', 'Success'),
      () => this.toastr.error('Server error', 'Oops')
    );
  }
  goBack() {
  this.router.navigate(['/user/users-list']);
}
}
