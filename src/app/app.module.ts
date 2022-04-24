import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
