import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api-service';
import { ChartConfiguration, ChartType } from 'chart.js';


@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  api = inject(ApiService)
  router = inject(Router)
  sideBarOpen:boolean = true
  userCount = signal<number>(0)
  recipeCount = signal<number>(0)
  downloadCount = signal<number>(0)
  feedbackCount = signal<number>(0)
  selected = new Date()
  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true
      },
      title:{
        text:'analysis of download recipes based on its cuisine',
        display:true
      }
    }
  };
  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Italian','Indian','Asian','Apr','May'],
    datasets: [
      {
        label: 'Count',
        data: [120,150,180,90,200]
      }
    ]
  };

  constructor(){
    if(localStorage.getItem("labels") && localStorage.getItem("data")){
      const labels = JSON.parse(localStorage.getItem("labels") || "")
      const data = JSON.parse(localStorage.getItem("data") || "")
      this.barChartData = {
        labels,
        datasets: [
          {
            label: 'Count',
            data
          }
        ]
      };
    }
  }

  ngOnInit(){
    this.getUserCount()
    this.getRecipeCount()
    this.getDownloadCount()
    this.getFeedbackCount()
  }

  getFeedbackCount(){
    this.api.getAllFeedbacksAPI().subscribe((res:any)=>{
      this.feedbackCount.set(res.filter((item:any)=>item.status=="pending").length)
    })
  }

  getDownloadCount(){
    this.api.getAllDownloadAPI().subscribe((res:any)=>{
      this.downloadCount.set(res.reduce((acc:any,cur:any)=>acc+cur.count,0))
    })
  }

  getRecipeCount(){
    this.api.getAllRecipesAPI().subscribe((res:any)=>{
      this.recipeCount.set(res.length)
    })
  }

  getUserCount(){
    this.api.getAllUsersAPI().subscribe((res:any)=>{
      this.userCount.set(res.length)
    })
  }

  toggleSidebar(){
    this.sideBarOpen = !this.sideBarOpen
  }

  logout(){
    sessionStorage.clear()
    this.router.navigateByUrl('/login')
  }

}
