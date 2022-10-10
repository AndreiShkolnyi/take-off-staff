export interface IContact {
  name: string;
  number: string;
  id: number;
}

export interface IContacts {
  contacts: IContact[];
  loading: boolean;
  error: string;
}

export interface IAuth {
  password: string;
  email: string;
}

export interface IUser {
  loading: boolean;
  error: null;
  user: {
    user: {
      email: string;
      id?: number;
    };
    email: string;
    id?: number;
    isAuthenticated: boolean;
  };
  isLoggedIn: boolean;

  accessToken: string;
}

export interface ITarget {
  name: string;
  value: string;
}
