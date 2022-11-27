import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core'
import { Todo } from 'src/app/models'
import { compareTime, countDown, formatDateTime } from './../../utils/formatTime'

export interface ContentModal {
    title: string
    description: string
    isShow: boolean
}

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit, OnChanges, OnDestroy {
    constructor() {}

    @Input() todo: Todo = {} as Todo
    @Output() checkComplete: EventEmitter<Todo> = new EventEmitter<Todo>()
    @Output() deleteTodoEmitter: EventEmitter<string | number> = new EventEmitter<
        string | number
    >()
    @Output() updateTodoEmitter: EventEmitter<Todo> = new EventEmitter<Todo>()
    @Output() showModalEmitter: EventEmitter<ContentModal> =
        new EventEmitter<ContentModal>()

    ngOnInit(): void {}

    countDownId: any = null
    dateTime: string = ''
    expire: boolean = false
    msgExpire: string = ''
    isCompleted: boolean = false

    ngOnChanges(changes: SimpleChanges) {
        console.log(this.todo)

        if ('todo' in changes) {
            // format time
            const hour = 60 * 60 * 1000
            this.isCompleted = changes['todo'].currentValue.isComplete

            if (
                compareTime(changes['todo'].currentValue.dateTime) <= hour &&
                !this.isCompleted
            ) {
                this.countDownId = setInterval(() => {
                    // console.log(changes['todo'].currentValue.dateTime)
                    if (
                        new Date(changes['todo'].currentValue.dateTime).getTime() >
                        new Date().getTime()
                    ) {
                        this.expire = true
                        this.dateTime = countDown(changes['todo'].currentValue.dateTime)

                        return
                    }
                }, 1000)
            } else {
                this.dateTime = formatDateTime(this.todo.dateTime)
            }

            if (
                new Date(changes['todo'].currentValue.dateTime).getTime() <=
                new Date().getTime()
            ) {
                this.expire = true
                this.msgExpire = 'Expired...'
            }
        }
    }

    ngOnDestroy(): void {
        clearInterval(this.countDownId)
    }

    handleCheckboxChange(e: any): void {
        this.expire = false
        this.isCompleted = e.target.checked
        this.checkComplete.emit({
            ...this.todo,
            isComplete: e.target.checked,
        })
    }

    handleDeleteTodo(e: any): void {
        this.deleteTodoEmitter.emit(this.todo.id)
        this.showModalEmitter.emit({
            title: 'DELETE TODO',
            description: `Are you sure delete todo name "${this.todo.title}"`,
            isShow: true,
        })
    }

    handleEditTodo(e: any): void {
        window.scrollTo(0, 0)
        this.updateTodoEmitter.emit(this.todo)
    }
}
