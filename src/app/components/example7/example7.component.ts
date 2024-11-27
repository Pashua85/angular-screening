import { Component, OnInit } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { bufferCount, combineLatest, filter, map, of, tap, timer } from "rxjs";

/**
 *7. Что будет отображено в компоненте?
 * 
 * Ответ: слово "ОТВЕТ"
 * 
 * Для ответа по этому слайду потребуется больше времени, чем на остальные.
 * Возможные ошибочные ответы: "ПРИВЕТ"(1 ошибка), "привет" (2 ошибки), "ответ"(1 ошибка)
 * 
 * Source1: Observable, созданный с помощью оператора "of", пушит в поток данный все буквы по одной, оператор bufferCount группирует их в массивы по 3 буквы,
 * оператор 'filter' пропускает только первый массив ['Т', 'Е', 'В']
 * 
 * Source2: Observable, созданный с помощью оператора 'timer', передает в поток данных число - индекс значения( если бы вторым аргументом передали интервал, через который надо
 * продолжать пушить значения, то в поток данных приходило по очереди 0, 1, 2, 3 и т.д). В итоге из source2 в поток попадет 'ОТ'.
 * Тут возможна ошибка, если ответ "ПРИВЕТ" - значит посчитали что timerValue = 2 (параметр первоначальной задержки)
 * 
 * Оператор tap используется для сайдэффектов, на данные, передаваемые в пайпе он не влияет. Тут возможна ошибка - если ответят, что слово будет строчными буквами.
 */
@UntilDestroy()
@Component({
  selector: 'app-example-7',
  template: '<div>{{ data }}</div>',
})
export class Example7Component implements OnInit {
  public data = 'Init Data'

  private source1$ = of('Т','Е','В', 'Т', 'О', 'Н', 'Е', 'Ц').pipe(
    bufferCount(3),
    filter((_value, index) => {
      return !index ? true : false
    })
  )

  private source2$ = combineLatest([of('ОТ ТОГО ПРИ НЕМ И ТАК'), timer(2)]).pipe(
    map(([stringValue, timerValue]) => {
      return stringValue.split(' ')[timerValue];
    })
  )

  public ngOnInit(): void {
    combineLatest([this.source1$, this.source2$]).pipe(
      untilDestroyed(this),
      map(([source1Value, source2Value]) => {
        return [...source1Value, source2Value].reverse().join('')
      }),
      tap((value) => {
        return value.toLocaleLowerCase()
      })
    ).subscribe((newData) => {
      this.data = newData
    })
  }
}
