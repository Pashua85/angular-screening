import { Component, OnInit } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { asapScheduler, asyncScheduler, observeOn, of} from "rxjs";

/**
 * 8. В каком порядке отобразятся элементы?
 * 
 * Ответ: Огонь, Воздух, Мила Йовович, Земля, Вода
 * 
 * Тут речь идет о работе Event Loop: сначала выполняется синхронный код, потом  функции обратного вызова из очереди микротасков, затем из очереди макротасков.
 * Промис тут разрешается сразу, таймер установленный через setTimeout тоже сразу отрабатывает. Из Promise колбек попадает в очередь микротасков, из setTimeout - в макротаски.
 * 
 * Можно также управлять, как будут обработаны колбеки подписок на Observables с помощью планировщиков:
 *  - queueScheduler - используется для выполнения кода синхронно
 *  - asapScheduler - планирование кода в очередь микрозадач
 *  - asyncScheduler - планирование кода в очередь макрозадач
 * также есть
 *  - animationFrameScheduler - планирование кода в очередь перед перерисовкой контента (нужен ресерч для подробностей)
 * 
 * По умолчанию Observables, созданные с помощью разных операторов, используют разные планировщики, например, of и from используют queueScheduler,
 * timer и interval используют asyncScheduler. asapScheduler (микротаски) по умолчанию ни один Оbservable не применяет.
 * 
 * Таким образом получается:
 * Огонь - синхронно
 * Воздух, Мила Йовович - микротаски
 * Земля, Вода - макротаски
 * 
 * * вопрос про планировщики - со звездочкой, на глубокое знание rxjs. Главное, чтобы кандидат Воздух расположил раньше Земли
 */
@UntilDestroy()
@Component({
  selector: 'app-example-8',
  template: '<div>{{ elementsString }}</div>',
})
export class Example8Component implements OnInit {
  private elements: Array<'Земля' | 'Воздух' | 'Огонь' | 'Вода' | 'Мила Йовович'> = []

  public get elementsString () { return this.elements.join(', ')}

  public ngOnInit(): void {
    setTimeout(() => {this.elements.push('Земля')}, 0)

    Promise.resolve().then(() => { this.elements.push('Воздух')})

    of(null).pipe(
      untilDestroyed(this),
      observeOn(asyncScheduler)
    ).subscribe(() => { this.elements.push('Вода')})

    of(null).pipe(
      untilDestroyed(this),
      observeOn(asapScheduler)
    ).subscribe(() => { this.elements.push('Мила Йовович')})

    of(null).pipe(
      untilDestroyed(this)
    ).subscribe(() => { this.elements.push('Огонь')})
  }
}
