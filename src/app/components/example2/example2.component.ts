import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { timer } from "rxjs";

/**
 * 2. В какой момент после того как компонент отрисуется, отобразится текст "Changed Text"?
 * 
 * Ответ: Через 6 сек.
 * 
 * Отключен механизм обнаружения изменений через .detach(), нужно вручную запустить механизм проверки изменений через .detectChanges()
 *  или включить механизм обратно через .reattach() (тут он позже)
 */

@UntilDestroy()
@Component({
  selector: 'app-example-2',
  template: '<span>{{text}}</span>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Example2Component implements OnInit {
  public text = 'Init Text'

  public constructor(private cd: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.cd.detach()

    timer(0).pipe(untilDestroyed(this)).subscribe(() => { this.text = 'Changed Text' })

    timer(3000).pipe(untilDestroyed(this)).subscribe(() => { this.cd.markForCheck() })

    timer(6000).pipe(untilDestroyed(this)).subscribe(() => { this.cd.detectChanges() })

    timer(9000).pipe(untilDestroyed(this)).subscribe(() => { this.cd.reattach() })
  }
}
