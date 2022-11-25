import { Component, HostListener, OnInit } from '@angular/core'

@Component({
    selector: 'app-scroll-top',
    templateUrl: './scroll-top.component.html',
    styleUrls: ['./scroll-top.component.scss'],
})
export class ScrollTopComponent implements OnInit {
    constructor() {}

    active: boolean = false

    ngOnInit(): void {
        // window.addEventListener('scroll', this.handleScroll, true)
    }

    @HostListener('window:scroll', ['$event'])
    handleScroll(e: any) {
        if (window.scrollY > 450) {
            this.active = true
        } else {
            this.active = false
        }
    }

    handleScrollTopClick(): void {
        window.scrollTo(0, 0)
    }
}
