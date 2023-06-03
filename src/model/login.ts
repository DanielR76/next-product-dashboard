export class Login {
  email: string;
  password: string;

  constructor(data?: Login) {
    this.email = data?.email || '';
    this.password = data?.password || '';
  }
}
