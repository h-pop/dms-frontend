import { Injectable } from "@angular/core";

// TODO temporary solution without backend aplication
@Injectable()
export class IdGenerator {
  count = 100;

  public next(): number {
    return this.count++;
  }
}
