import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'readableBytecount'
})
export class ReadableBytecountPipe implements PipeTransform {
  transform(bytes: number, decimals: number = 0): string {
    if (bytes === 0) {
      return '0 Bytes';
    }

    const k = 1024,
      dm = decimals <= 0 ? 0 : decimals || 2,
      sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
