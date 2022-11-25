import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { FiltersComponent } from './components/filters/filters.component'
import { ProductItemComponent } from './components/product-item/product-item.component'
import { ProductListComponent } from './components/product-list/product-list.component'
import { ScrollTopComponent } from './components/scroll-top/scroll-top.component'
import { TodoFormComponent } from './components/todo-form/todo-form.component'
import { TodoListComponent } from './components/todo-list/todo-list.component'
import { TodoComponent } from './components/todo/todo.component'

@NgModule({
    declarations: [
        AppComponent,
        TodoFormComponent,
        TodoListComponent,
        TodoComponent,
        FiltersComponent,
        ScrollTopComponent,
        ProductListComponent,
        ProductItemComponent,
    ],
    imports: [BrowserModule, FormsModule, ReactiveFormsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
