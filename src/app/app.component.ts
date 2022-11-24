import { Component } from '@angular/core'
import { Todo } from './models'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    todoList: Todo[] = JSON.parse(localStorage.getItem('todo-list') || '[]')
    todoEdit: Todo = {} as Todo
    mode: string = 'all'

    handleAddTodo(todo: Todo): void {
        const newTodoList: Todo[] = JSON.parse(localStorage.getItem('todo-list') || '[]')
        newTodoList.push(todo)
        localStorage.setItem('todo-list', JSON.stringify(newTodoList))
        this.handleFilterTodo(this.mode)
    }

    handleChangeComplete(todo: Todo): void {
        const newTodoList: Todo[] = JSON.parse(localStorage.getItem('todo-list') || '[]')
        const index = newTodoList.findIndex((t: Todo) => t.id === todo.id)

        if (index < 0) return

        newTodoList[index].isComplete = todo.isComplete
        localStorage.setItem('todo-list', JSON.stringify(newTodoList))
        this.handleFilterTodo(this.mode)
    }

    handleDeleteTodo(id: string | number): void {
        const newTodoList: Todo[] = JSON.parse(localStorage.getItem('todo-list') || '[]')
        const index = newTodoList.findIndex((t: Todo) => t.id === id)
        if (index < 0) return

        newTodoList.splice(index, 1)
        this.todoList = newTodoList
        localStorage.setItem('todo-list', JSON.stringify(newTodoList))
    }

    handleEditTodo(todo: Todo): void {
        this.todoEdit = todo
    }

    handleUpdateTodo(todo: Todo): void {
        const newTodoList: Todo[] = JSON.parse(localStorage.getItem('todo-list') || '[]')
        const index: number = newTodoList.findIndex((t: Todo) => t.id === todo.id)

        if (index < 0) return

        newTodoList[index] = todo
        localStorage.setItem('todo-list', JSON.stringify(newTodoList))
        this.handleFilterTodo(this.mode)
    }

    handleDeleteAllCompleted(): void {
        const newTodoList: Todo[] = JSON.parse(
            localStorage.getItem('todo-list') || '[]'
        ).filter((todo: Todo) => todo.isComplete !== true)

        localStorage.setItem('todo-list', JSON.stringify(newTodoList))
        this.todoList = newTodoList
        this.handleFilterTodo(this.mode)
    }

    handleFilterTodo(mode: string): void {
        this.mode = mode
        const todoListLocal: Todo[] = JSON.parse(
            localStorage.getItem('todo-list') || '[]'
        )
        if (mode === 'active') {
            const todoListFilter: Todo[] = todoListLocal.filter(
                (todo: Todo) => todo.isComplete === false
            )
            this.todoList = todoListFilter
            return
        }

        if (mode === 'completed') {
            const todoListFilter: Todo[] = todoListLocal.filter(
                (todo: Todo) => todo.isComplete === true
            )
            this.todoList = todoListFilter
            return
        }

        this.todoList = todoListLocal
    }
}
