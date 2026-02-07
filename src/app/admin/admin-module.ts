import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing-module';
import { Dashboard } from './dashboard/dashboard';
import { Recipes } from './recipes/recipes';
import { Users } from './users/users';
import { Downloads } from './downloads/downloads';
import { Feedbacks } from './feedbacks/feedbacks';
import { ManageRecipe } from './manage-recipe/manage-recipe';
import { Sidebar } from './sidebar/sidebar';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../pipes/search-pipe';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {provideNativeDateAdapter} from '@angular/material/core';
import { BaseChartDirective } from 'ng2-charts';

@NgModule({
  declarations: [
    Dashboard,
    Recipes,
    Users,
    Downloads,
    Feedbacks,
    ManageRecipe,
    Sidebar
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    SearchPipe,
    MatButtonModule,
    MatDatepickerModule,
    MatCardModule,
    BaseChartDirective,
    
  ],
  providers:[
    provideNativeDateAdapter()
  ]
})
export class AdminModule { }
