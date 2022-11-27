import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { ContentModal } from './../todo/todo.component'

@Component({
    selector: 'app-modal-delete',
    templateUrl: './modal-delete.component.html',
    styleUrls: ['./modal-delete.component.scss'],
})
export class ModalDeleteComponent implements OnInit {
    @Input() contentModal: ContentModal
    @Output() deleteTodoEmitter: EventEmitter<string> = new EventEmitter<string>()

    constructor() {}

    ngOnInit(): void {}

    handleHideModal() {
        this.contentModal.isShow = false
    }

    handleDeleteTodo(): void {
        this.deleteTodoEmitter.emit('delete')
        this.contentModal.isShow = false
    }
}
