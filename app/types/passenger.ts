export interface PassengerFormData {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    gender: string;
    birthDate: string;
  }
  
  export interface PassengerFormErrors {
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    gender?: string;
    birthDate?: string;
  }