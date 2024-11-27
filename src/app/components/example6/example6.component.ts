import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { interval } from "rxjs";

/**
 * 6. Какие числа будут отображены в родительском компоненте в значении parentCount за все время жизни компонента?
 * 
 * Ответ: 0 и 3
 * 
 * 0 - это исходное значение. В обоих компонентах стратегия OnPush, изменения просто по дефолту не отобразятся. В Child-компоненте вызов detectChange()
 * немедленно запустит механизм  обнаружения только в самом компоненте (и в его потомках, если бы они были), поэтому текст в child изменится, но parentCount все еще будет отображен как 0.
 * Метод же markForCheck() поднимается по дереву компонентов, помечая родительские компоненты для следующей проверки, пока не достигнет компонента, который не использует стратегию OnPush или корневого компонента,
 * а затем включается механизм проверки изменений, поскольку получено значение из Observable, созданного с помощью оператора timer.
 * Через 4 сек с момента отображения значение у parentCount будет 3
 * (Observable созданный через interval передает в поток данных числа начиная с 0, в данном случае с интервалом в 1 сек).
 */
@UntilDestroy()
@Component({
  selector: 'app-parent',
  template: `<div>
      <div>Счётчик родителя: {{ parentCount }}</div>
      <app-child></app-child>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParentComponent implements OnInit {
  public parentCount: number = 0;

  ngOnInit(): void {
    interval(1000).pipe(
      untilDestroyed(this)
    ).subscribe((number) => { 
      if (number < 10) {
        this.parentCount = number 
      }
    })
  }
}
