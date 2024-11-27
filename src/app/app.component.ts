import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-mock-screening';

  private openedExamples: Record<string, boolean> = {
    'example1': false,
    'example2': false,
    'example3': false,
    'example4': false,
    'example5': false,
    'example6': false,
    'example7': true,
    'example8': true
  }

  get isExample1Open() {
    return this.openedExamples['example1'];
  }

  get isExample2Open() {
    return this.openedExamples['example2'];
  }

  get isExample3Open() {
    return this.openedExamples['example3'];
  }

  get isExample4Open() {
    return this.openedExamples['example4'];
  }

  get isExample5Open() {
    return this.openedExamples['example5'];
  }

  get isExample6Open() {
    return this.openedExamples['example6'];
  }

  get isExample7Open() {
    return this.openedExamples['example7'];
  }

  get isExample8Open() {
    return this.openedExamples['example8'];
  }


  public toggle(id: string) {
    this.openedExamples[id] = !this.openedExamples[id]
  }
}
