import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './core/basic-layouts/header/header.component';
import {SearchComponent} from './features/search/search.component';
import {IconButtonComponent} from './shared/icon-button/icon-button.component';
import {BodyTopComponent} from './core/basic-layouts/body-top/body-top.component';
import {TextButtonComponent} from './shared/text-button/text-button.component';
import {BodyMidComponent} from './core/basic-layouts/body-mid/body-mid.component';
import {TodoComponent} from './shared/todo/todo.component';
import {FormsModule} from '@angular/forms';
import {SearchPipe} from './core/pipes/search.pipe';
import {NewTaskComponent} from './shared/new-task/new-task.component';
import {BodyBottomComponent} from './core/basic-layouts/body-bottom/body-bottom.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpInterceptorService} from './core/services/httpInterceptor/http-interceptor.service';
import {CountPipe} from './core/pipes/count.pipe';
import {SplashComponent} from './splash/splash.component';

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
export class AppModule {
}
