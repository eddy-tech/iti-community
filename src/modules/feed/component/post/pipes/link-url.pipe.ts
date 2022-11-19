import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'linkUrl'
})
export class LinkUrlPipe implements PipeTransform {

  constructor(private sanitize: DomSanitizer){}

  transform(value: any, type?: string): any {
     return this.TextToLinks(value);
  }

  TextToLinks(value: string): SafeHtml{
    const linkRegex = /https?:\/\/\S+/gm;
    return this.sanitize
                 .bypassSecurityTrustHtml(value.replace(linkRegex,(m,$1)=>
                    `<a href="${m}">${m}</a>`));
  }
}
