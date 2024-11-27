import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { timer } from "rxjs";

/**
 * 1. В какой момент после того как компонент отрисуется, отобразится текст "Changed Text"?
 * 
 * Ответ: Никогда.
 * 
 * Применена OnPush-стратегия, нужно вручную запустить механизм проверки изменений через .detectChanges() 
 * или пометить компонент для проверки в следующем цикле через .markForCheck()
 */
@UntilDestroy()
@Component({
  selector: 'app-example-1',
  template: '<span>{{text}}</span>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Example1Component implements OnInit {
  public text = 'Init Text'

  public constructor() {}

  public ngOnInit(): void {
    timer(2000).pipe(untilDestroyed(this)).subscribe(() => {
      this.text = 'Changed Text';
    })
  }
}
