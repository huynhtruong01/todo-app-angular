import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core'
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
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
    submitted: boolean = false

    valsForm: any

    constructor(private fb: FormBuilder) {}

    ngOnChanges(changes: SimpleChanges): void {
        if ('todo' in changes) {
            this.valsForm?.setValue({
                title: changes['todo'].currentValue.title,
                description: changes['todo'].currentValue.description,
                dateTime: changes['todo'].currentValue.dateTime,
            })
        } else {
            this.valsForm?.setValue({
                title: '',
                description: '',
                dateTime: '',
            })
        }
    }

    ngOnInit(): void {
        this.valsForm = this.fb.group({
            title: ['', [Validators.required, this.atLeastTwoWords]],
            description: ['', Validators.required],
            dateTime: ['', Validators.required],
        })
    }

    handleInput(): void {
        console.log(this.valsForm.controls)
    }

    atLeastTwoWords(control: FormControl): any {
        const isAtLeastTwoWords =
            control.value.split(' ').filter((x: string) => !!x && x.length >= 2).length >=
            2
        if (!isAtLeastTwoWords) return { atLeastTwoWords: true }
        return null
    }

    // handleInput(): void {
    //     console.log(this.valsForm.value, this.valsForm.controls, this.valsForm.invalid)
    // }

    // reset error
    // resetError(): void {
    //     this.msgErrors.titleError = ''
    //     this.msgErrors.descriptionError = ''
    //     this.msgErrors.dateTimeError = ''
    // }

    // validate form
    // validateForm(): boolean {
    //     if (!this.vals.titleVal) {
    //         this.msgErrors.titleError = 'Please enter title'
    //         return false
    //     }

    //     if (!this.vals.descriptionVal) {
    //         this.msgErrors.descriptionError = 'Please enter description'
    //         return false
    //     }

    //     if (new Date(this.vals.dateTimeVal).getTime() <= new Date().getTime()) {
    //         this.msgErrors.dateTimeError = 'Please choose date greater than date now'
    //         return false
    //     }

    //     return true
    // }

    // reset form
    resetForm(): void {
        this.valsForm.get('title').reset()
        this.valsForm.get('description').reset()
        this.valsForm.get('dateTime').reset()
    }

    // add todo
    handleAddTodo(): void {
        const todo: Todo = {
            id: Date.now(),
            title: this.valsForm.value.title,
            description: this.valsForm.value.description,
            dateTime: this.valsForm.value.dateTime,
            isComplete: false,
        }

        this.submitValueEmitter.emit(todo)
    }

    // update todo
    handleUpdateTodo(): void {
        const todo: Todo = {
            ...this.todo,
            title: this.valsForm.value.title,
            description: this.valsForm.value.description,
            dateTime: this.valsForm.value.dateTime,
        }
        this.updateTodoEmitter.emit(todo)
        this.todo = {} as Todo
    }

    // submit
    handleSubmit(e: SubmitEvent): void {
        e.preventDefault()

        this.submitted = true
        this.isSubmitted = true

        console.log(this.valsForm.invalid)
        // check form is valid??
        if (this.valsForm.invalid) return

        // form valid, send data
        if (this.todo.id) {
            this.handleUpdateTodo()
        } else {
            this.handleAddTodo()
        }

        this.submitted = false
        this.isSubmitted = false
        this.resetForm()
    }
}
