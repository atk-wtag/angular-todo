import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyMidComponent } from './components/body-mid/body-mid.component';

const routes: Routes = [
  { path: 'all', component: BodyMidComponent },
  { path: 'incomplete', component: BodyMidComponent },
  { path: 'complete', component: BodyMidComponent },
  { path: '**', redirectTo: 'all', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
