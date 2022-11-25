import { Component, OnInit } from '@angular/core'

export interface Product {
    title: string
    description: string
    contentBtn: string
}

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}

    productList: Product[] = [
        {
            title: 'Title 1',
            description:
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s',
            contentBtn: 'Click 1',
        },
        {
            title: 'Title 2',
            description:
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s',
            contentBtn: 'Click 2',
        },
        {
            title: 'Title 3',
            description:
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s',
            contentBtn: 'Click 3',
        },
        {
            title: 'Title 4',
            description:
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s',
            contentBtn: 'Click 4',
        },
        {
            title: 'Title 5',
            description:
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s',
            contentBtn: 'Click 5',
        },
    ]
}
