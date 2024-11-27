import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Example1Component } from './components/example1/example1.component';
import { Example2Component } from './components/example2/example2.component';
import { Example3Component } from './components/example3/example3.component';
import { Example4Component } from './components/example4/example4.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Example5Component } from './components/example5/example5.component';
import { ParentComponent } from './components/example6/example6.component';
import { ChildComponent } from './components/example6-child/example6-child.component';
import { Example7Component } from './components/example7/example7.component';
import { Example8Component } from './components/example8/example8component';

const COMPONENTS = [
  Example1Component,
  Example2Component,
  Example3Component,
  Example4Component,
  Example5Component,
  ParentComponent,
  ChildComponent,
  Example7Component,
  Example8Component
]

@NgModule({
  declarations: [
    AppComponent,
    ...COMPONENTS
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
