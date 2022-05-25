import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyBottomComponent } from './core/basic-layouts/body-bottom/body-bottom.component';
import { BodyMidComponent } from './core/basic-layouts/body-mid/body-mid.component';
import { BodyTopComponent } from './core/basic-layouts/body-top/body-top.component';
import { HeaderComponent } from './core/basic-layouts/header/header.component';
import { CountPipe } from './core/pipes/count.pipe';
import { SearchPipe } from './core/pipes/search.pipe';
import { HttpInterceptorService } from './core/services/httpInterceptor/http-interceptor.service';
import { TodoEffects } from './core/services/state/todo.effects';
import { todoReducer } from './core/services/state/todo.reducer';
import { SearchComponent } from './features/search/search.component';
import { IconButtonComponent } from './shared/icon-button/icon-button.component';
import { NewTaskComponent } from './shared/new-task/new-task.component';
import { TextButtonComponent } from './shared/text-button/text-button.component';
import { TodoComponent } from './shared/todo/todo.component';
import { SplashComponent } from './splash/splash.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    IconButtonComponent,
    BodyTopComponent,
    TextButtonComponent,
    BodyMidComponent,
    TodoComponent,
    SearchPipe,
    NewTaskComponent,
    BodyBottomComponent,
    CountPipe,
    SplashComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ todos: todoReducer }),
    EffectsModule.forRoot([TodoEffects]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
