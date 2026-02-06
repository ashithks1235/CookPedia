import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {

  allUsers:any = signal([])
  api = inject(ApiService)

  ngOnInit(){
    this.getUsers()
  }

  getUsers(){
    this.api.getAllUsersAPI().subscribe((res:any)=>{
      this.allUsers.set(res)
      console.log(this.allUsers());
    })
  }

}
