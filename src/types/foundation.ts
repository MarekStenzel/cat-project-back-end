import { Document } from 'mongoose';

interface Address {
  addr1: string;
  addr2: string;
  city: string;
  state: string;
  country: string;
  zip: number;
}

export interface Foundation extends Document {
  name: string;
  email: string;
  address: Address;
  crypto: string;
  created: Date;
}
