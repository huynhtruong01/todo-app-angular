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
import { ApiService } from 'src/app/shared/api.service'

@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit, OnChanges {
    @Input() todoList: Todo[] = JSON.parse(localStorage.getItem('todo-list') || '[]')
    @Output() deleteAllCompleteEmitter: EventEmitter<void> = new EventEmitter<void>()
    @Output() sendModeEmitter: EventEmitter<string> = new EventEmitter<string>()

    constructor(private todoServices: ApiService) {}

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
    }

    handleDelete(): void {
        this.deleteAllCompleteEmitter.emit()
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('todoList' in changes) {
            // when todo list in app component change, we get todo list changed from localStorage

            this.numsTodoTab.numsAll = changes['todoList'].currentValue.length
            this.numsTodoTab.numsActive = changes['todoList'].currentValue.filter(
                (todo: Todo) => !todo.isComplete
            ).length
            this.numsTodoTab.numsCompleted = changes['todoList'].currentValue.filter(
                (todo: Todo) => todo.isComplete
            ).length
        }
    }
}
