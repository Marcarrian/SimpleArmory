import { Directive } from '@angular/core';

@Directive({
  selector: '[appDrag]',
})
export class DragDirective {
  public ngDrag() {
    return function (scope, element, attrs) {
      element.attr('draggable', true);
      element.bind('dragstart', function (e) {
        scope.$apply(function () {
          scope.$eval(attrs.ngDrag);
        });
      });
    };
  }
}
