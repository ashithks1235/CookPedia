import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-feedbacks',
  standalone: false,
  templateUrl: './feedbacks.html',
  styleUrl: './feedbacks.css',
})
export class Feedbacks {

  allFeedbacks:any = signal([])
  api = inject(ApiService)

  ngOnInit(){
    this.getFeedbacks()
  }

  getFeedbacks(){
    this.api.getAllFeedbacksAPI().subscribe((res:any)=>{
      this.allFeedbacks.set(res)
    })
  }

  updateFeedbackStatus(id:string,status:string){
    this.api.updateFeedbackAPI(id,{status}).subscribe((res:any)=>{
      this.getFeedbacks()
    })
  }

}
