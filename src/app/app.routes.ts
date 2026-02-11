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
import { authGuard } from './guards/auth-guard';
import { adminAuthGuard } from './guards/admin-auth-guard';

export const routes: Routes = [
    // lazy loaded - http://localhost:4200/admin
    {
        path:'admin',canActivate:[adminAuthGuard],loadChildren:()=>import('./admin/admin-module').then(module=>module.AdminModule)
    },
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
        path:'profile',canActivate:[authGuard],component:Profile,title:'Profile'
    },
    // recipes-save
    {
        path:'recipe/save',canActivate:[authGuard],component:SaveRecipe,title:'Recipe Collection'
    },
    // recipes-view
    {
        path:'recipes/:id/view',canActivate:[authGuard],component:ViewRecipe,title:'View Recipe'
    },
    // pnf
    {
        path:'**',component:Pnf,title:'Page Not Found'
    },
];
