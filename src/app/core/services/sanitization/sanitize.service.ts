import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SanitizeService {
  constructor() {}

  sanitizeString(str: string) {
    const cannotStartWithChars = new RegExp(/[^a-z0-9(\r\n|\r|\n) .,/-]/gim);
    // const oneOrMoreNewLines = new RegExp(/(\r\n|\r|\n)(\r\n|\r|\n)+/gm);
    const oneOrMoreWhiteSpaces = new RegExp(/\s\s+/gm);

    str = str.replace(cannotStartWithChars, ' ');
    // str = str.replace(oneOrMoreNewLines, '\n');
    str = str.replace(oneOrMoreWhiteSpaces, ' ').trim();

    if (str.length > 0) return str;
    else return;
  }
}
