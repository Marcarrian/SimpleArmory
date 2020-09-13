import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {

  // Helper to get the image id of an item
  public getImageSrc(item, renderIcon?): string {
    renderIcon = renderIcon || item.collected;
    if (renderIcon) {
      // wowhead img
      return '//wow.zamimg.com/images/wow/icons/medium/' + item.icon.toLowerCase() + '.jpg';
    }
    else {
      // 1x1 gif
      return 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
    }
  }
}
