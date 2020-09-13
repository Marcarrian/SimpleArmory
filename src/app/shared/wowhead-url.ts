import { InjectionToken } from '@angular/core';

export const WOWHEAD_URL = new InjectionToken<string>('WOWHEAD_URL');

export function wowheadUrlProvider(): string {
  return 'wowhead.com';
}
