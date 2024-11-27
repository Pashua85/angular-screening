import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { timer } from "rxjs";

/**
 * 3. В какой момент после того как компонент отрисуется, отобразится текст "Changed Text"?
 * 
 * Ответ: Сразу
 * 
 * Тут изменение значения происходит при инициализации компонента (до первой отрисовки)
 */
@UntilDestroy()
@Component({
  selector: 'app-example-3',
  template: '<span>{{data.text}}</span>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Example3Component implements OnInit {
  public data = {
    text: "Init Text"
  }

  public constructor(private cd: ChangeDetectorRef) {}

  public ngOnInit () {
    this.changeTextValue()
    timer(2000).pipe(untilDestroyed(this)).subscribe(() => { this.changeTextWithReference() })
    timer(5000).pipe(untilDestroyed(this)).subscribe(() => { this.cd.markForCheck() })
  }

  private changeTextWithReference () {
    this.data = { text: "Changed Text"}
  }

  private changeTextValue() {
    this.data.text = "Changed Text"
  }
}
