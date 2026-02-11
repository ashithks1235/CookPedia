import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RecipeModel } from '../admin/models/recipeModel';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  server_url = "https://cookpedia-server-nns0.onrender.com"
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

  // /save-recipes/:id: delete by save recipe when delte btn clicked
  removeUserSavedRecipeItemAPI(id:string){
    return this.http.delete(`${this.server_url}/save-recipes/${id}`,this.appendToken())
  }

  // http://localhost:3000/feedbacks : post by contact when submit clicked
addFeedbackAPI(reqBody:any){
    return this.http.post(`${this.server_url}/feedbacks`,reqBody)
  }

  //approve-feedbacks : get request by home when page loads
  getApproveFeedbacksAPI(){
    return this.http.get(`${this.server_url}/approve-feedbacks`)
  }

  //http://localhost:3000/user/697365bcc09c585754d644ee put request by profile component when picture upload
  updateUserProfileAPI(id:string,reqBody:any){
    return this.http.put(`${this.server_url}/user/${id}`,reqBody,this.appendToken())
  }

  //http://localhost:3000/user-downloads : get request bt profile when page loads
  getUserDownloadAPI(){
    return this.http.get(`${this.server_url}/user-downloads`,this.appendToken())
  }

  //http://localhost:3000/downloads : get by admin download list
  getAllDownloadAPI(){
    return this.http.get(`${this.server_url}/downloads`,this.appendToken())
  }

  //http://localhost:3000/users : get request from user component
  getAllUsersAPI(){
    return this.http.get(`${this.server_url}/users`,this.appendToken())
  }

  //http://localhost:3000/feedbacks : get
  getAllFeedbacksAPI(){
    return this.http.get(`${this.server_url}/feedbacks`,this.appendToken())
  }

  // http://localhost:3000/feedbacks/69830a3ca2ea489fb3cdbfb8 : put
  updateFeedbackAPI(id:string,reqBody:any){
    return this.http.put(`${this.server_url}/feedbacks/${id}`,reqBody,this.appendToken())
  }

  //http://localhost:3000/recipes : post
  addRecipeAPI(reqBody:RecipeModel){
    return this.http.post(`${this.server_url}/recipes`,reqBody,this.appendToken())
  }

  //http://localhost:3000/recipes/:id. : put
  editRecipeAPI(recipeId:string,reqBody:RecipeModel){
    return this.http.put(`${this.server_url}/recipes/${recipeId}`,reqBody,this.appendToken())
  }

  //http://localhost:3000/recipes/696f4fadcf68a81d18f610c3 ; delete request by
  removeRecipeAPI(recipeId:string){
    return this.http.delete(`${this.server_url}/recipes/${recipeId}`,this.appendToken())
  }

  getChartData(){
    this.getAllDownloadAPI().subscribe((downloadListArray:any)=>{
      let output:any = {}
      downloadListArray.forEach((recipe:any) => {
        let cuisine = recipe.cuisine
        let curCount = recipe.count
        if(cuisine in output){
          output[cuisine] += curCount
        }else{
          output[cuisine] = curCount
        }
      });
      const keys = Object.keys(output)
      localStorage.setItem("labels",JSON.stringify(keys))
      const data = Object.values(output)
      localStorage.setItem("data",JSON.stringify(data))
    })
  }

}
