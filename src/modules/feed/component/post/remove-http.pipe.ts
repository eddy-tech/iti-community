import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeUrl'
})
export class RemoveHttpPipe implements PipeTransform {

  transform(text: string): string {
    const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression);
    if (!text.match(regex))  return text;

    text = text.replace(regex, "");
    text = text.replace("localhost:3000/file/messages/","");
    text= text.replace("https://", "");
    text = text.replace("http://", "");
    return text
  }

}
