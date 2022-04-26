import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { IconButtonComponent } from './components/icon-button/icon-button.component';
import { BodyTopComponent } from './components/body-top/body-top.component';
import { TextButtonComponent } from './components/text-button/text-button.component';
import { BodyMidComponent } from './components/body-mid/body-mid.component';
import { TodoComponent } from './components/todo/todo.component';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from './pipes/search.pipe';
import { NewTaskComponent } from './components/new-task/new-task.component';
import { BodyBottomComponent } from './components/body-bottom/body-bottom.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpInterceptorService } from './services/httpInterceptor/http-interceptor.service';
import { CountPipe } from './pipes/count/count.pipe';
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
export class AppModule {}
