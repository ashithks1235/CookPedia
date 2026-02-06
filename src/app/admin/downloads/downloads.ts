import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-downloads',
  standalone: false,
  templateUrl: './downloads.html',
  styleUrl: './downloads.css',
})
export class Downloads {

  downloadList:any = signal([])
  api = inject(ApiService)

  ngOnInit(){
    this.getDownloads()
  }

  getDownloads(){
    this.api.getAllDownloadAPI().subscribe((res:any)=>{
      this.downloadList.set(res)
      console.log(this.downloadList());
      
    })
  }

}
