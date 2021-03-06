
import { CodeError } from '../common/codeerror';
import { RawProgram } from './rawprogram';

/** Encoding result of the complete code content */
export class EncoderResult {
  programs: RawProgram[] = [];

  constructor() {}

  succeeded(): boolean {
    let succeeded = true;
    this.programs.forEach(program => {
      succeeded = succeeded && program.succeeded;
    });

    return succeeded;
  }

  getFirstError(): CodeError | undefined {
    let error: CodeError | undefined;
    for (let index = 0; index < this.programs.length; index++) {
      const program = this.programs[index];
      error = program.getFirstError();
      if (error) {
        return error;
      }
    }

    return undefined;
  }

  getHex(eol: string, useWhitespaceBetweenHex?: boolean, useLineNumbers?: boolean): string {
    let hexAll = '';
    this.programs.forEach(rawprogram => {
      hexAll += rawprogram.getHex(eol, useLineNumbers);
    });

    if(!useWhitespaceBetweenHex){
      hexAll = hexAll.replace(/ /g, '');
    }

    return hexAll.trim();
  }

  getRaw(): string {
    let raw = '';
    this.programs.forEach(rawprogram => {
      raw += rawprogram.getRaw() + ' ';
    });
    return raw.trim();
  }

  getSize(): number {
    let size = 0;
    this.programs.forEach(rawprogram => {
      size += rawprogram.getSize();
    });
    return size;
  }
}
