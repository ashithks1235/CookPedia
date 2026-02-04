import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../services/api-service';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-save-recipe',
  imports: [Header,Footer,RouterLink],
  templateUrl: './save-recipe.html',
  styleUrl: './save-recipe.css',
})
export class SaveRecipe {

  allRecipes:any = signal([])
  api = inject(ApiService)

  ngOnInit(){
    this.getSaveCollection()
  }

  getSaveCollection(){
    this.api.getUserSavedRecipesAPI().subscribe((res:any)=>{
      this.allRecipes.set(res)
      console.log(this.allRecipes());
      
    })
  }

}
