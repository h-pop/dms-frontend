
// TODO temporary solution without backend aplication
export class IdGenerator {
  count = 100;

  public next(): number {
    return this.count++;
  }
}
