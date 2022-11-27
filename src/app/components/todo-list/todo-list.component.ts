import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core'
import { Todo } from 'src/app/models'
import { ContentModal } from '../todo/todo.component'

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit, OnChanges {
    @Input() todoList: Todo[] = []
    @Input() mode: string
    @Output() changeCheckEmitter: EventEmitter<Todo> = new EventEmitter<Todo>()
    @Output() deleteTodoEmitter: EventEmitter<string | number> = new EventEmitter<
        string | number
    >()
    @Output() updateTodoEmitter: EventEmitter<Todo> = new EventEmitter<Todo>()
    @Output() showModalEmitter: EventEmitter<ContentModal> =
        new EventEmitter<ContentModal>()

    filterTodoList: Todo[] = []

    constructor() {}

    ngOnInit(): void {
        console.log(this.mode, this.todoList)
        // this.handleFilterTodo()
    }

    handleFilterTodo() {
        if (this.mode === 'active') {
            this.filterTodoList = this.todoList.filter(
                (todo: Todo) => todo.isComplete === false
            )
            return
        }

        if (this.mode === 'completed') {
            this.filterTodoList = this.todoList.filter(
                (todo: Todo) => todo.isComplete === true
            )
            return
        }

        this.filterTodoList = this.todoList
    }
    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes, this.todoList)
        if ('mode' in changes) {
            if (changes['mode'].currentValue === 'active') {
                this.filterTodoList = this.todoList.filter(
                    (todo: Todo) => todo.isComplete === false
                )
                return
            }

            if (changes['mode'].currentValue === 'completed') {
                this.filterTodoList = this.todoList.filter(
                    (todo: Todo) => todo.isComplete === true
                )
                return
            }

            this.filterTodoList = this.todoList
        }

        if ('todoList' in changes) {
            this.todoList = changes['todoList'].currentValue
            this.handleFilterTodo()
        }
    }

    handleEditComplete(todo: Todo): void {
        this.changeCheckEmitter.emit(todo)
    }

    handleDeleteTodo(id: string | number): void {
        this.deleteTodoEmitter.emit(id)
    }

    handleEditTodo(todo: Todo): void {
        this.updateTodoEmitter.emit(todo)
    }

    handleShowModal(contentModal: ContentModal) {
        this.showModalEmitter.emit(contentModal)
    }
}
