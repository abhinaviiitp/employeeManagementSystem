// Lookup
export interface Lookup {
  value: string;
  viewValue: string;
}

// Employee model
export interface Employee {
  id: number;
  name: string;
  companyName: string;
  emailId: string;
  contactNo: string;
  designation: string;
  avatar: string;
}

// Avatar
export interface Avatar {
  id: number;
  imageUrl: string;
  description: string;
}