import { UserpageComponent } from './components/userpage/userpage.component';
import { NgModule,  } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './components/game/game.component';

const routes: Routes = [
  {path : 'game', component:GameComponent},
  {path : 'user', component:UserpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
