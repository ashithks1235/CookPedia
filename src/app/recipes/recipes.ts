import { Component, inject, signal } from '@angular/core';
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { ApiService } from '../services/api-service';

@Component({
  selector: 'app-recipes',
  imports: [Header, Footer],
  templateUrl: './recipes.html',
  styleUrl: './recipes.css',
})
export class Recipes {
  mealtypeArray:any = signal([])
  cuisineArray:any = signal([])
  allRecipes:any = signal([])
  dummyAllRecipes:any = []
  api = inject(ApiService)

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

}
