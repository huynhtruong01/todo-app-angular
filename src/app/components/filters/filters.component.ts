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

@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit, OnChanges {
    constructor() {}

    @Input() todoList: Todo[] = JSON.parse(localStorage.getItem('todo-list') || '[]')
    @Output() deleteAllCompleteEmitter: EventEmitter<void> = new EventEmitter<void>()
    @Output() sendModeEmitter: EventEmitter<string> = new EventEmitter<string>()

    numsTodoTab: {
        numsAll: number
        numsActive: number
        numsCompleted: number
    } = {
        numsAll: 0,
        numsActive: 0,
        numsCompleted: 0,
    }

    mode: string = 'all'

    ngOnInit(): void {}

    handleChangeMode(e: MouseEvent): void {
        const text: string = (e.currentTarget as HTMLDivElement).textContent || 'all'
        // console.log(text)
        this.mode = text.trim().split(' ')[0].toLowerCase()
        // console.log(text.split(' '))

        this.sendModeEmitter.emit(this.mode)

        // if (this.mode === 'active') {
        //     console.log(this.todoList)
        //     const newTodoList: Todo[] = this.todoList.filter(
        //         (todo: Todo) => todo.isComplete === false
        //     )
        //     this.newTodoListEmitter.emit(newTodoList)
        //     return
        // }

        // if (this.mode === 'completed') {
        //     const newTodoList: Todo[] = this.todoList.filter(
        //         (todo: Todo) => todo.isComplete === true
        //     )
        //     this.newTodoListEmitter.emit(newTodoList)
        //     return
        // }

        // const newTodoList: Todo[] = JSON.parse(localStorage.getItem('todo-list') || '[]')
        // this.newTodoListEmitter.emit(newTodoList)
    }

    handleDelete(): void {
        this.deleteAllCompleteEmitter.emit()
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('todoList' in changes) {
            // when todo list in app component change, we get todo list changed from localStorage
            const todoListLocal: Todo[] = JSON.parse(
                localStorage.getItem('todo-list') || '[]'
            )
            this.numsTodoTab.numsAll = todoListLocal.length
            this.numsTodoTab.numsActive = todoListLocal.filter(
                (todo) => !todo.isComplete
            ).length
            this.numsTodoTab.numsCompleted = todoListLocal.filter(
                (todo) => todo.isComplete
            ).length
        }
    }
}
