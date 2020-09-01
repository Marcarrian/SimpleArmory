import { Directive } from '@angular/core';

@Directive({
  selector: '[appFoo]',
})
export class FooDirective { // TODO better name
  public ngEnter() {
    return function (scope, element, attrs) {
      element.bind('keydown keypress', function (event) {
        if (event.which === 13) {
          scope.$apply(function () {
            scope.$eval(attrs.ngEnter);
          });

          event.preventDefault();
        }
      });
    };
  }
}
