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

interface ValInputs {
    titleVal: string
    descriptionVal: string
    dateTimeVal: Date
}

type ValKeys = 'titleVal' | 'descriptionVal' | 'dateTimeVal'

interface MsgErrorInput {
    titleError: string
    descriptionError: string
    dateTimeError: string
}

@Component({
    selector: 'app-todo-form',
    templateUrl: './todo-form.component.html',
    styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent implements OnInit, OnChanges {
    @Input() todo: Todo = {} as Todo
    @Output() submitValueEmitter: EventEmitter<Todo> = new EventEmitter<Todo>()
    @Output() updateTodoEmitter: EventEmitter<Todo> = new EventEmitter<Todo>()

    isSubmitted: boolean = false

    constructor() {}

    vals: ValInputs = {
        titleVal: '',
        descriptionVal: '',
        dateTimeVal: new Date(0),
    }

    msgErrors: MsgErrorInput = {
        titleError: '',
        descriptionError: '',
        dateTimeError: '',
    }

    ngOnInit(): void {}

    resetError(): void {
        this.msgErrors.titleError = ''
        this.msgErrors.descriptionError = ''
        this.msgErrors.dateTimeError = ''
    }

    validateForm(): boolean {
        if (!this.vals.titleVal) {
            this.msgErrors.titleError = 'Please enter title'
            return false
        }

        if (!this.vals.descriptionVal) {
            this.msgErrors.descriptionError = 'Please enter description'
            return false
        }

        if (new Date(this.vals.dateTimeVal).getTime() <= new Date().getTime()) {
            this.msgErrors.dateTimeError = 'Please choose date greater than date now'
            return false
        }

        return true
    }

    resetForm(): void {
        this.vals.titleVal = ''
        this.vals.descriptionVal = ''
        this.vals.dateTimeVal = new Date(0)
    }

    // add todo
    handleAddTodo(): void {
        const todo: Todo = {
            id: Date.now(),
            title: this.vals.titleVal,
            description: this.vals.descriptionVal,
            dateTime: this.vals.dateTimeVal,
            isComplete: false,
        }

        this.submitValueEmitter.emit(todo)
    }

    // update todo
    handleUpdateTodo(): void {
        const todo: Todo = {
            ...this.todo,
            title: this.vals.titleVal,
            description: this.vals.descriptionVal,
            dateTime: this.vals.dateTimeVal,
        }
        this.updateTodoEmitter.emit(todo)
        this.todo = {} as Todo
    }

    // submit
    handleSubmit(e: SubmitEvent): void {
        e.preventDefault()
        this.resetError()
        const isValid: boolean = this.validateForm()
        if (!isValid) return
        this.isSubmitted = true
        if (this.todo.id) {
            this.handleUpdateTodo()
        } else {
            this.handleAddTodo()
        }

        this.isSubmitted = false

        this.resetForm()
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('todo' in changes) {
            this.vals.titleVal = changes['todo'].currentValue.title
            this.vals.descriptionVal = changes['todo'].currentValue.description
            this.vals.dateTimeVal = changes['todo'].currentValue.dateTime
        } else {
            this.vals.titleVal = ''
            this.vals.descriptionVal = ''
            this.vals.dateTimeVal = new Date(0)
        }
    }
}
