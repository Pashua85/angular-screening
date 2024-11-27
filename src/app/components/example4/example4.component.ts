import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { timer } from "rxjs";

/**
 * 4. В какой момент после того как компонент отрисуется, отобразится текст "Changed Text"?
 * 
 * Ответ: Никогда
 * 
 * Изменение значения формы через метод .setValue() требует передачи значений всех полей (в данном случает будет ошибка при попытке установить новое значение),
 * нужно либо использовать метод .patchValue() либо передать в setValue значение для второго поля
 */
@UntilDestroy()
@Component({
  selector: 'app-example-4',
  template: `<form [formGroup]="myForm">
              <input id="text" formControlName="text" />
              <input id="additionalText" formControlName="additionalText" />
            </form>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Example4Component implements OnInit {
  public myForm: FormGroup;

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {
    this.myForm = this.fb.group({
      text: ['Init Text'],
      additionalText: ['']
    });
  }

  ngOnInit(): void {
    timer(2000).pipe(untilDestroyed(this)).subscribe(() => { this.myForm.setValue({ text: 'Changed Text' }) });
    timer(4000).pipe(untilDestroyed(this)).subscribe(() => { this.cd.markForCheck() })
  }
}
