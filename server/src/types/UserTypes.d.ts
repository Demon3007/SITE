interface UserAttributes {
  id: number;
  login: string;
  email: string;
  password: string;
}

interface CreationUserAttributes {
  id?: number;
  login: string;
  email: string;
  password: string;
}

export { UserAttributes, CreationUserAttributes };
