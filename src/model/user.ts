export class User {
  public email: string;
  public password: string;

  constructor(data?: User) {
    this.email = data?.email || '';
    this.password = data?.password || '';
  }
}
