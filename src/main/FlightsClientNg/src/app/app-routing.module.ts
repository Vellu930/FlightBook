import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DestListComponent } from './dest-list/dest-list.component';
import { DestinationFormComponent } from './destination-form/destination-form.component';

const routes: Routes = [
  {path: 'destinations' , component: DestListComponent },
  {path: 'destinationForm' , component: DestinationFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
