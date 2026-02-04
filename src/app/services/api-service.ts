import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  server_url = "http://localhost:3000"
  http = inject(HttpClient)

  //get allrecipes - home & recipes
  getAllRecipesAPI(){
    return this.http.get(`${this.server_url}/recipes`)
  }

  // register - called by register when register btn clicked
  registerAPI(user:any){
    return this.http.post(`${this.server_url}/register`,user)
  }

  //login - called by login when login btn clicked
  loginAPI(user:any){
    return this.http.post(`${this.server_url}/login`,user)
  }

  appendToken(){
    const token = sessionStorage.getItem("token")
    let headers = new HttpHeaders()
    if(token){
      headers = headers.append("Authorization",`Bearer ${token}`)
    }
    return {headers}
  }

  //view recipes
  viewRecipeAPI(recipeId:string){
    return this.http.get(`${this.server_url}/recipes/${recipeId}`,this.appendToken())
  }

  // http://localhost:3000/recipes-related?cuisine=Asian - get from view recipe compoennets when page loads
  getRelatedRecipesAPI(cusine:string){
    return this.http.get(`${this.server_url}/recipes-related?cuisine=${cusine}`,this.appendToken())
  }

  //http://localhost:3000/downloads/696f4fadcf68a81d18f610ba: post by view recipe component when download btn clicked
  downloadRecipeAPI(recipeId:string,reqBody:any){
    return this.http.post(`${this.server_url}/downloads/${recipeId}`,reqBody,this.appendToken())
  }

  //http://localhost:3000/save-recipe/696f4fadcf68a81d18f610ba : post by view recipe component when save btn clicked
  saveRecipeAPI(recipeId:string,reqBody:any){
    return this.http.post(`${this.server_url}/save-recipe/${recipeId}`,reqBody,this.appendToken())
  }

  //http://localhost:3000/save-recipes : get by save recipe when page loads
  getUserSavedRecipesAPI(){
    return this.http.get(`${this.server_url}/save-recipes`,this.appendToken())
  }
}
