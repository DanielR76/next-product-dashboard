export class User {
  id: number;
  role: string;
  creationAt: string;
  avatar: string;
  email: string;
  name: string;
  password: string;
  updatedAt: string;

  constructor(data?: User) {
    this.id = data?.id || 0;
    this.role = data?.role || '';
    this.creationAt = data?.creationAt || '';
    this.avatar = data?.avatar || '';
    this.email = data?.email || '';
    this.name = data?.name || '';
    this.password = data?.password || '';
    this.updatedAt = data?.updatedAt || '';
  }
}
