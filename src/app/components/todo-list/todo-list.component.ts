import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Todo } from 'src/app/models'

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
    @Input() todoList: Todo[] = []
    @Output() changeCheckEmitter: EventEmitter<Todo> = new EventEmitter<Todo>()
    @Output() deleteTodoEmitter: EventEmitter<string | number> = new EventEmitter<
        string | number
    >()
    @Output() updateTodoEmitter: EventEmitter<Todo> = new EventEmitter<Todo>()

    constructor() {}

    ngOnInit(): void {}

    handleEditComplete(todo: Todo): void {
        this.changeCheckEmitter.emit(todo)
    }

    handleDeleteTodo(id: string | number): void {
        this.deleteTodoEmitter.emit(id)
    }

    handleEditTodo(todo: Todo): void {
        this.updateTodoEmitter.emit(todo)
    }
}
