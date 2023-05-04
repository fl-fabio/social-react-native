export interface Person {
    id: {
        name: string;
        value: string;
    }
    gender: string;
    name: {
        title: string;
        first: string;
        last: string;
    };
    picture: {
        large: string;
    }
    nat: string;
}



export interface PersonDetails extends Person{
    location: {
      city: string;
      country: string;
    };
    email: string;
    dob: {
      date: string;
      age: number;
    };
    cell: string;
    bookMarked?: boolean;
  }
  
export interface ApiBasic {
    results: Person[];
}

export interface ApiDetails {
    results: PersonDetails[];
}