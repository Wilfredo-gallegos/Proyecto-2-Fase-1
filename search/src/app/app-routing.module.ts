import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', loadChildren: () => import('./search/search.module').then(m => m.SearchModule) },
  { path: 'series', loadChildren: () => import('./serie/serie.module').then(m => m.SerieModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
