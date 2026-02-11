import { Component } from '@angular/core';
import { AdminRoutingModule } from "../admin/admin-routing-module";

@Component({
  selector: 'app-pnf',
  imports: [AdminRoutingModule],
  templateUrl: './pnf.html',
  styleUrl: './pnf.css',
})
export class Pnf {

  role:string = "user"

  constructor(){
    if(sessionStorage.getItem("user")){
      const user = JSON.parse(sessionStorage.getItem("user") || "")
      this.role = user.role
    }
  }
}
