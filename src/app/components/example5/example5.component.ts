import { AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { timer } from "rxjs";

/**
 * 5. В какой момент после того как компонент отрисуется, отобразится текст "Changed Text"?
 * 
 * Ответ: Через 2 сек.
 * 
 * Здесь метод .markForCheck() сразу после изменения текста помечает компонент для следующего цикла механизма проверки изменений. Однако сам механизм проверки не запустится,
 * так как тут синхронный код и он выполняется уже после первой проверки изменений в компоненте.
 * Следующий цикл механизма проверки изменений тут запустит получение данных из Observаble, созданного с помощью timer(2000)
 * 
 * PS: если здесь поменять стратегию c OnPush на Default, то поведение не изменится, а вот если при OnPush убрать .markForCheck() сразу после изменения текста,
 * то текст изменится только после 4 сек.
 */
@UntilDestroy()
@Component({
  selector: 'app-example-5',
  template: '<div>{{ text }}</div>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Example5Component implements OnInit, AfterViewChecked {
  public text = 'Init Text'

  private isTextChanged = false;

  public constructor(private cd: ChangeDetectorRef) {}

  public ngOnInit () {
    timer(2000).pipe(untilDestroyed(this)).subscribe(() => {})
    timer(4000).pipe(untilDestroyed(this)).subscribe(() => { this.cd.markForCheck()})
    timer(6000).pipe(untilDestroyed(this)).subscribe(() => {this.cd.detectChanges()})
  }

  public ngAfterViewChecked() {
    if (!this.isTextChanged) {
      this.text = 'Changed Text'
      this.cd.markForCheck()
      this.isTextChanged = true;
    }
  }
}
