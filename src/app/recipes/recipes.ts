import { Component, inject, signal } from '@angular/core';
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { ApiService } from '../services/api-service';
import { SearchPipe } from '../pipes/search-pipe';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  imports: [Header, Footer, SearchPipe,FormsModule,NgxPaginationModule],
  templateUrl: './recipes.html',
  styleUrl: './recipes.css',
})
export class Recipes {

  p: number = 1;
  searchKey:string = ""
  mealtypeArray:any = signal([])
  cuisineArray:any = signal([])
  allRecipes:any = signal([])
  dummyAllRecipes:any = []
  api = inject(ApiService)
  router = inject(Router)

  ngOnInit(){
    this.getAllRecipes()
  }

  getAllRecipes(){
    this.api.getAllRecipesAPI().subscribe((res:any)=>{
      this.allRecipes.set(res)
      this.dummyAllRecipes =res
      let dummyCuisineArray = res.map((item:any)=>item.cuisine)
      dummyCuisineArray.forEach((cuisine:any)=>{
        !this.cuisineArray().includes(cuisine) && this.cuisineArray().push(cuisine)
      })
      console.log(this.cuisineArray());
      let dummyMealArray = res.map((item:any)=>item.mealType).flat(Infinity)
      dummyMealArray.forEach((meal:any)=>{
        !this.mealtypeArray().includes(meal) && this.mealtypeArray().push(meal)
      })
      console.log(this.mealtypeArray());
    })
  }

  filterRecipe(key:string,value:string){
    this.allRecipes.set(this.dummyAllRecipes.filter((item:any)=>item[key]==value))
  }

  viewRecipe(recipeId:string){
    if(sessionStorage.getItem("token")){
      this.router.navigateByUrl(`recipes/${recipeId}/view`)
    }else{
      alert("please login to access the recipes collection")
      this.router.navigateByUrl(`/login`)
    }
  }

}
