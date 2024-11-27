import { AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { timer } from "rxjs";

@UntilDestroy()
@Component({
  selector: 'app-child',
  template: '<div>{{ text }}</div>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildComponent implements OnInit {
  public text = 'Init Text';

  constructor(private cd: ChangeDetectorRef) {}

  public ngOnInit() {
    timer(1000).pipe(
      untilDestroyed(this)
    ).subscribe(() => { this.text = 'Changed Text'})

    timer(2000).pipe
      (untilDestroyed(this)
    ).subscribe(() => { this.cd.detectChanges() })

    timer(4000).pipe(
      untilDestroyed(this)
    ).subscribe(() => { this.cd.markForCheck() })
  }
}
