import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../modeles/user.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  user: User  = { id: '',name: '', email: '',firstname: '',lastname:'',password:'',role:'',msclist:'',matricule:'', };
}

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = params['id'];
      this.loadUserData(userId);
    });
  }

  loadUserData(userId: string): void {
    this.userService.getUserById(userId).subscribe(user => {
      this.user = user;
    });
  }
}
