# NG Layout

## NG Content projection

Khi có những component giống nhau nhưng khác một số nội dung bên trong (`Như ta dùng children trong React để chèn nội dung riêng biệt giữa các component giống nhau`)

### How to use it

Các dạng của selector có thể bao gồm:

-   Tag selector: <ng-content select="some-component-selector-or-html-tag"></ng-content>
-   CSS Class selector: <ng-content select=".some-class"></ng-content>
-   Attribute selector: <ng-content select="[some-attr]"></ng-content>
-   Combine nhiều selectors: <ng-content select="some-component-selector-or-html-tag[some-attr]"></ng-content>

**product-list.html**

```html
<div class="product-list">
    <div *ngFor="let product of productList">
        <app-product-item [product]="product">
            <h3 class="product__title">{{ product.title }}</h3>
            <button class="btn-product-click">{{ product.contentBtn }}</button>
        </app-product-item>
    </div>
</div>
```

**product-list.component.ts**

```ts
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
```

**product-item.html**

```html
<div class="product">
    <ng-content select=".product__title"></ng-content>
    <p class="product__desc">{{ product.description }}</p>
    <ng-content select=".btn-product-click"></ng-content>
</div>
```

**product-item.component.ts**

```ts
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
```

---

# Form

-   It contains: **Template-drive** and **Reactive Forms**

## Template-driven form

-   **Template-driven Forms**: Cơ chế hoạt động của dạng forms này sẽ chủ yếu dựa vào các directives trên template như `NgForm`, `NgModel`, `required`, etc; để làm việc. Form dạng này sử dụng `Two-way binding` để update data model giữa template và component.

### Integrate Angular Forms

-   Import `NgModule` from FormsModule `@angular/forms`

-   **NgForm**:
-   **NgModel**:

## Reactive Forms (Part I)

-   **Reactive Forms**: Chúng ta sẽ xây dựng form từ `các model`, là các object có một số chức năng đặc biệt để quản lý được các form input. Nó cũng sử dụng một số (nhưng rất ít) các `directives`.

-   We can imports `ReactiveFormsModule` from `@angular/form`

```ts
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
    declarations: [
        // components, pipes, directives
    ],
    imports: [
        // other imports
        ReactiveFormsModule,
    ],
    // ...
})
export class AppModule {}
```

### FormGroup, FormControl, FormArray

-   `FormControl` là đơn vị nhỏ nhất của một form, dùng để track thông tin về value, validation của một form control như là thông tin của một input, một checkbox, etc.
-   `FormGroup` là một tập hợp của các control/group/array (AbstractControl) khác. Dạng như một Object, nó có thể chứa các value đơn lẻ, hoặc các Object khác.
-   `FormArray` cấu trúc dạng mảng, để quản lý các AbstractControl theo dạng mảng, dùng cho trường hợp cấu trúc có thể thêm bớt phần tử một cách linh hoạt.

Thông thường, mỗi một form sẽ bắt đầu bởi một FormGroup, nó sẽ đăng ký các AbstractControl khác bên trong nó.

```ts
export class SignInRfComponent implements OnInit {
    constructor() {}

    signInForm: any

    ngOnInit(): void {
        this.signInForm = new FormGroup({
            username: new FormControl(''), // <== default value
            password: new FormControl(''), // <== default value
            rememberMe: new FormControl(false), // <== default value
        })
    }
}
```

### Binding Form in HTML

-   Add `formGroup` to tag `form`
-   Add `formControlName` to tag `input` and bind value by field `FormGroup`

```html
<form class="sign-in-form" [formGroup]="signInForm" (ngSubmit)="handleSubmit($event)">
    <h2>Sign in</h2>
    <div class="row-control">
        <mat-form-field appearance="outline">
            <mat-label>Username</mat-label>
            <input matInput placeholder="Username" formControlName="username" />
        </mat-form-field>
    </div>
    <div class="row-control">
        <mat-form-field appearance="outline">
            <mat-label>Password</mat-label>
            <input
                type="password"
                matInput
                placeholder="Password"
                formControlName="password"
            />
        </mat-form-field>
    </div>
    <div class="row-control">
        <mat-checkbox formControlName="rememberMe">Remember me</mat-checkbox>
    </div>
    <div class="row-control row-actions">
        <button mat-raised-button color="primary" type="submit">Sign in</button>
    </div>
    <pre>{{ signInForm.value | json }}</pre>
</form>
```

### Form Builder Services

-   Như các bạn có thể thấy là nếu form có số lượng control lớn mà cứ phải `new` như ở trên thì khá là vất vả. Vì thế Angular Reactive Forms cung cấp luôn cho chúng ta một service là `FormBuilder` để các bạn có thể khởi tạo form nhanh hơn.

```ts
export class SignInRfComponent implements OnInit {
    signInForm: FormGroup
    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.signInForm = this.fb.group({
            username: '',
            password: '',
            rememberMe: false,
        })
    }
}
```

### Update value by patchValue or setValue

Có 2 phương thức để cập nhật giá trị cho form control được mô tả bởi class `AbstractControl` là `setValue` và `patchValue`. Chúng là các abstract method, vậy nên các class dẫn xuất sẽ phải implement riêng cho chúng.

-   Đối với class `FormControl`, không có gì khác biệt giữa 2 phương thức – thực chất `patchValue` gọi lại `setValue`.
-   Đối với các class `FormGroup` và `FormArray`, `patchValue` sẽ cập nhật các giá trị được khai báo tương ứng trong object value truyền vào. Nhưng setValue sẽ báo lỗi nếu một control nào bị thiếu hoặc thừa, tức là bạn phải truyền chính xác object có cấu trúc giống như cấu trúc của form hay nói cách khác là không chấp nhận subset hoặc superset của cấu trúc form hiện tại.

Vậy nên nếu bạn muốn cập nhật một phần của form thì hãy dùng patchValue, nếu bạn muốn set lại tất cả và đảm bảo không cái nào bị thiếu thì dùng setValue để tận dụng việc báo lỗi của nó.

Ngoài ra, còn có phương thức reset để bạn có thể reset lại trạng thái lúc khởi tạo của form hoặc control.

```ts
ngOnInit(): void {
  this.signInForm = this.fb.group({
    username: '',
    password: '',
    rememberMe: false,
  });
  setTimeout(() => {
    // fake api call then update form value
    this.signInForm.patchValue({
      username: 'TiepPhan'
    });
  }, 1000);
}
```

### Event Submit or NgSubmit

Angular Reactive Forms cũng cung cấp event ngSubmit giống như Template-driven Forms, các bạn chỉ cần listen vào event đó là được.

**html file**

```html
<form
    class="sign-in-form"
    [formGroup]="signInForm"
    autocomplete="off"
    (ngSubmit)="onSubmit()"
></form>
```

**component file**

```ts
onSubmit(): void {
  console.log(this.signInForm);
}
```

## Reactive Forms (Part II)

### Validate Forms with Reactive Forms

Bởi vì với `Reactive Forms`, chúng ta set up form ở trong component và từ đó link đến phần template HTML. Nên phần validators thay vì dùng các attribute trên template, phần code này sẽ được định nghĩa khi bạn setup form thông qua FormBuilder. Phần validate này sẽ đều là các function.

#### Validator functions

Có 2 loại validator function:

1. ##### Sync validators (đồng bộ)

Đây là các function để validate thường gặp, sẽ nhận đầu vào là một form control và trả về `ngay lập tức`:

-   Một danh sách các validation errors.
-   Hoặc null tức là control này ko có lỗi gì.

Khi khởi tạo FormControl thì Sync validators sẽ được truyền vào ở argument số 2. Argument số 1 sẽ là giá trị mặc định khi khởi tạo form nhé.

```ts
let control = new FormControl('', Validators.required)
//Or
this.fb.control('', Validators.required)
// Or multiple Validators
this.fb.control('', [Validators.required, Validators.maxLength(5)])
```

2. ##### Async validators (bất đồng bộ)

Đây là các validate function sẽ trả về Promise hoặc Observable mà kết quả sẽ được emit trong tương lai. Ví dụ như bạn muốn validate xem username nhập vào đã có trong hệ thống hay chưa. Thì bắt buộc bạn phải gửi một yêu cầu lên server để làm việc này, HTTP request thường sẽ trả về Promise/Observable.

Khi khởi tạo `FormControl` thì async validators sẽ được truyển vào ở argument số 3.

```ts
isUserNameDuplicated(control: AbstractControl): Observable<ValidationErrors> {
    return of(null);
}

let control = new FormControl("", Validators.required, this.isUserNameDuplicated);
this.fb.control("", Validators.required, this.isUserNameDuplicated);
```

#### Implement validate function

Angular có cung cấp một set các validate function trong class [Validators](https://angular.io/api/forms/Validators), cụ thể:

```ts
class Validators {
    static min(min: number): ValidatorFn
    static max(max: number): ValidatorFn
    static required(control: AbstractControl): ValidationErrors | null
    static requiredTrue(control: AbstractControl): ValidationErrors | null
    static email(control: AbstractControl): ValidationErrors | null
    static minLength(minLength: number): ValidatorFn
    static maxLength(maxLength: number): ValidatorFn
    static pattern(pattern: string | RegExp): ValidatorFn
    static nullValidator(control: AbstractControl): ValidationErrors | null
    static compose(validators: ValidatorFn[]): ValidatorFn | null
    static composeAsync(validators: AsyncValidatorFn[]): AsyncValidatorFn | null
}
```

We can code like this

```ts
export class TodoForm implements OnInit, OnChanges {
    ngOnInit(): void {
        this.signInForm = this.fb.group({
            username: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(6),
                    Validators.pattern(/^[a-z]{6,32}$/i),
                ]),
            ],
            password: [
                '',
                Validators.compose([
                    Validators.required,
                    Validators.minLength(6),
                    Validators.pattern(/^(?=.*[!@#$%^&*]+)[a-z0-9!@#$%^&*]{6,32}$/),
                ]),
            ],
            rememberMe: false,
        })
    }
}
```

`Validators.compose` và truyển vào một mảng các validators để có thể kết hợp được nhiều loại validators với nhau

We can custom a other validator

```ts
import { AbstractControl, ValidatorFn } from '@angular/forms'

export function NoWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        let controlVal = control.value
        if (typeof controlVal === 'number') {
            controlVal = `${controlVal}`
        }
        let isWhitespace = (controlVal || '').trim().length === 0
        let isValid = !isWhitespace
        return isValid ? null : { whitespace: 'value is only whitespace' }
    }
}
```

```ts
import { NoWhitespaceValidator } from './custom-validators'

this.signInForm = this.fb.group({
    username: [
        '',
        Validators.compose([
            //Validators.required,
            NoWhitespaceValidator(),
            Validators.minLength(6),
            //Validators.pattern(/^[a-z]{6,32}$/i)
        ]),
    ],
})
```
