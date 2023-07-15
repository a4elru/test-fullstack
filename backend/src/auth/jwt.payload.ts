/** Objects of the type { sub: UserId } */
export class JwtPayload {
  /** Represents a user id. */
  readonly sub: number;

  constructor(sub: number) {
    this.sub = sub;
  }

  toPlainObj() {
    return { sub: this.sub };
  }
}
