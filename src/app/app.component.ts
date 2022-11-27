import { Component, OnInit } from '@angular/core'
import { NgToastService } from 'ng-angular-popup'
import { ContentModal } from './components/todo/todo.component'
import { Toastify, Todo } from './models'
import { ApiService } from './shared/api.service'
import { showError, showSuccess } from './utils/toastify'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    todoList: Todo[] = []
    todoEdit: Todo = {} as Todo
    mode: string = 'all'
    idTodoDelete: string | number

    titleModal: string
    descriptionModal: string
    contentModal: ContentModal

    constructor(private todoServices: ApiService, private toast: NgToastService) {}

    ngOnInit(): void {
        this.todoServices.getAllTodo().subscribe((todoList: Todo[]) => {
            this.todoList = todoList
        })
    }

    handleGetAllTodo() {
        this.todoServices.getAllTodo().subscribe((todoList: Todo[]) => {
            this.todoList = todoList
        })
    }

    handleAddTodo(todo: Todo) {
        this.todoServices.createTodo(todo).subscribe((todo: Todo) => {
            this.todoList = [...this.todoList, todo]
            this.handleFilterTodo(this.mode)
            showSuccess(this.toast, {
                title: 'ADD NEW TODO',
                description: `Add todo "${todo.title}" successfully.`,
            })
        })
    }

    handleChangeComplete(todo: Todo) {
        const newTodoList: Todo[] = [...this.todoList]
        const index = newTodoList.findIndex((t) => t.id === todo.id)
        if (index < 0) return

        newTodoList[index] = todo
        this.todoList = newTodoList

        this.todoServices.updateTodo(todo).subscribe()
    }

    handleGetIdTodo(id: string | number): void {
        this.idTodoDelete = id
    }

    handleDelete(str: string): void {
        const newTodoList: Todo[] = [...this.todoList]
        const index = newTodoList.findIndex((t) => t.id === this.idTodoDelete)
        if (index < 0) return

        newTodoList.splice(index, 1)
        this.todoList = newTodoList

        this.todoServices.deleteTodo(this.idTodoDelete).subscribe((todo: Todo) => {
            showSuccess(this.toast, {
                title: 'DELETE TODO',
                description: `Delete todo "${todo.title}" successfully.`,
            })
        })
    }

    handleEditTodo(todo: Todo): void {
        this.todoEdit = todo
    }

    handleUpdateTodo(todo: Todo): void {
        const newTodoList: Todo[] = [...this.todoList]
        const index = newTodoList.findIndex((t) => t.id === todo.id)
        if (index < 0) return

        newTodoList[index] = todo
        this.todoList = newTodoList

        this.todoServices.updateTodo(todo).subscribe((res: Todo) => {
            showSuccess(this.toast, {
                title: 'UPDATE TODO',
                description: `Update todo "${res.title}" successfully.`,
            })
        })
    }

    handleDeleteAllCompleted(): void {
        const newTodoList = [...this.todoList]
        newTodoList.forEach((todo: Todo) => {
            if (todo.isComplete) {
                this.todoServices.deleteTodo(todo.id).subscribe((res) => {
                    console.log(res)
                })
            }
        })
        this.todoList = newTodoList.filter((todo: Todo) => todo.isComplete !== true)
    }

    async handleFilterTodo(mode: string) {
        this.mode = mode
        console.log(mode)
    }

    handleShowModal(contentModal: ContentModal): void {
        this.contentModal = contentModal
    }
}
