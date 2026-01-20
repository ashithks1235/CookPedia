import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Recipes } from './recipes/recipes';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { Login } from './login/login';
import { Register } from './register/register';
import { Profile } from './profile/profile';
import { SaveRecipe } from './save-recipe/save-recipe';
import { ViewRecipe } from './view-recipe/view-recipe';
import { Pnf } from './pnf/pnf';

export const routes: Routes = [
    // home
    {
        path:'',component:Home,title:'Home'
    },
    // recipes
    {
        path:'recipes',component:Recipes,title:'All Recipes'
    },
    // about
    {
        path:'about',component:About,title:'About'
    },
    // contact
    {
        path:'contact',component:Contact,title:'Contact'
    },
    // login
    {
        path:'login',component:Login,title:'Login'
    },
    // register
    {
        path:'register',component:Register,title:'Register'
    },
    // profile
    {
        path:'profile',component:Profile,title:'Profile'
    },
    // recipes-save
    {
        path:'recipe/save',component:SaveRecipe,title:'Recipe Collection'
    },
    // recipes-view
    {
        path:'recipes/:id/view',component:ViewRecipe,title:'View Recipe'
    },
    // pnf
    {
        path:'**',component:Pnf,title:'Page Not Found'
    },
];
