export interface IUser {
  id?: string;
  firstName: string;
  lastName: string;
  age: number;
  birth?: Date | string;
  active: boolean;
  username: string;
  secure: IUserSecure;
}

export interface IUserSecure {
  password?: string;
  accountNumber: string;
}
