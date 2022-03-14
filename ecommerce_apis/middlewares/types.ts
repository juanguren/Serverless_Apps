export interface ISendGrid {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  createdAt: Date;
}
