import { Document } from 'mongoose';
import { Photo } from './photo';

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
  photos: Photo[];
  email: string;
  address: Address;
  crypto: string;
  created: Date;
}
