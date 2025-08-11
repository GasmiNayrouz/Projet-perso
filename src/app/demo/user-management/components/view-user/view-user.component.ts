import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../modeles/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {
  user: User | undefined;
  userId: number = 0;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userId = +this.route.snapshot.params['id']; // ensures it's a number
    this.getuser();
  }

  getuser() {
    this.userService.getUserById(this.userId).subscribe(
      (user: User) => {
        this.user = user;
      },
      (error: any) => {
        console.error(error);
        this.toastr.error('Erreur lors de la récupération de l’utilisateur', 'Erreur');
      }
    );
  }

  editUser(userId: number): void {
    this.router.navigate(['user/edit-user', userId]);
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.user = undefined;
        this.toastr.success('Suppression effectuée !', 'Success');
      },
      error: () => {
        this.toastr.error('Erreur lors de la suppression', 'Erreur');
      }
    });
  }

  onDeleteClick(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { message: 'Voulez-vous vraiment supprimer cet utilisateur ?' }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.deleteUser(id);
      }
    });
  }
}
