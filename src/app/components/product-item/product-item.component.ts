import { Component, Input, OnInit } from '@angular/core'
import { Product } from '../product-list/product-list.component'

@Component({
    selector: 'app-product-item',
    templateUrl: './product-item.component.html',
    styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
    @Input() product: Product

    constructor() {}

    ngOnInit(): void {}
}
