export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  verified: boolean;
  refreshJWT: string;
}

export interface UserApiResponse {
  data?: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    verified: boolean;
    refreshJWT: string;
  };
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
