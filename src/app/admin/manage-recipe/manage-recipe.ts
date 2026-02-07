import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeModel } from '../models/recipeModel';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-manage-recipe',
  standalone: false,
  templateUrl: './manage-recipe.html',
  styleUrl: './manage-recipe.css',
})
export class ManageRecipe {

  router = inject(Router)
  api = inject(ApiService)
  route = inject(ActivatedRoute)
  recipeId = this.route.snapshot.params['id']
  recipeDetails = signal<RecipeModel>({})
  ingredientArray:any = []
  instructionArray:any = []
  mealArray:any = []

  ngOnInit(){
    if(this.recipeId){
      this.api.getAllRecipesAPI().subscribe((res:any)=>{
        this.recipeDetails.set(res.find((item:any)=>item._id==this.recipeId))
        this.ingredientArray = this.recipeDetails().ingredients
        this.instructionArray = this.recipeDetails().instructions
        this.mealArray = this.recipeDetails().mealType
      })
    }
    
  }

  addingredients(ingredientInput:HTMLTextAreaElement){
    // const ingredientInput = event.target as HTMLTextAreaElement
    if(ingredientInput.value){
      this.ingredientArray.push(ingredientInput.value)
      ingredientInput.value = ""
    }
  }

  removeIngredient(value:string){
    this.ingredientArray = this.ingredientArray.filter((item:string)=>item!=value)
  }

  addinstruction(instructionInput:HTMLTextAreaElement){
    // const instructionInput = event.target as HTMLTextAreaElement
    if(instructionInput.value){
      this.instructionArray.push(instructionInput.value)
      instructionInput.value = ""
    }
  }

  removeInstruction(value:string){
    this.instructionArray = this.instructionArray.filter((item:string)=>item!=value)
  }

  addMeal(mealInput:HTMLInputElement){
    // const mealInput = event.target as HTMLTextAreaElement
    if(mealInput.value){
      this.mealArray.push(mealInput.value)
      mealInput.value = ""
    }
  }

  removeMeal(value:string){
    this.mealArray = this.mealArray.filter((item:string)=>item!=value)
  }

  addRecipe(){
    this.recipeDetails().ingredients = this.ingredientArray
    this.recipeDetails().instructions = this.instructionArray
    this.recipeDetails().mealType = this.mealArray
    const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,
    caloriesPerServing,
    image,
    mealType
  } = this.recipeDetails()
  if(name && ingredients && instructions && prepTimeMinutes && cookTimeMinutes && servings && difficulty && cuisine && caloriesPerServing && image && mealType){
    this.api.addRecipeAPI(this.recipeDetails()).subscribe({
      next:(res:any)=>{
        alert("recipe added successfully")
        this.router.navigateByUrl('/admin/recipes')
      },error:(reason:any)=>{
        alert(reason.error)
      }
    })
  }else{
    alert("fill the form completely")
  }

}

editRecipe(){
    this.recipeDetails().ingredients = this.ingredientArray
    this.recipeDetails().instructions = this.instructionArray
    this.recipeDetails().mealType = this.mealArray
    const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,
    caloriesPerServing,
    image,
    mealType
  } = this.recipeDetails()
  if(name && ingredients && instructions && prepTimeMinutes && cookTimeMinutes && servings && difficulty && cuisine && caloriesPerServing && image && mealType){
    this.api.editRecipeAPI(this.recipeId,this.recipeDetails()).subscribe((res:any)=>{
        alert("recipe updated successfully")
        this.router.navigateByUrl('/admin/recipes')
      })
  }else{
    alert("fill the form completely")
  }

}

}