import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AchievementsService {

  public KeyboardService($document) {
    var pressed = [];
    var code = '38,38,40,40,37,39,37,39,66,65';

    return {
      init: function (eventOnMatch) {
        $document.bind('keydown', function (evt) {
          pressed.push(evt.which);
          if (pressed.toString().indexOf(code) >= 0) {
            pressed = []; // reset history
            eventOnMatch();
          }
          else if (pressed.length > 200) {
            // lets not get too crazy with tracking
            pressed = [];
          }
        });
      },
    };
  }
}