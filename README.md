# Form

-   It contains: **Template-drive** and **Reactive Forms**

## Template-driven form

-   **Template-driven Forms**: Cơ chế hoạt động của dạng forms này sẽ chủ yếu dựa vào các directives trên template như `NgForm`, `NgModel`, `required`, etc; để làm việc. Form dạng này sử dụng `Two-way binding` để update data model giữa template và component.

### Integrate Angular Forms

-   Import `NgModule` from FormsModule `@angular/forms`

-   **NgForm**:
-   **NgModel**:

## Reactive Forms

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
