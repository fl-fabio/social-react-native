export interface Person {
    name: {
      title: string;
      first: string;
      last: string;
    };
    location: {
      city: string;
      country: string;
    };
    email: string;
    dob: {
      date: string;
      age: number;
    };
    phone: string;
    picture: {
      large: string;
    };
    nat: string;
  }
  
export interface ApiResponse {
    results: Person[];
  }