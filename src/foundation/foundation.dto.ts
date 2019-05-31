import { Photo } from '../types/photo';

export interface FoundationDTO {
  name: string;
  photos: Photo[];
  email: string;
  address: {
    addr1: string,
    addr2: string,
    city: string,
    state: string,
    country: string,
    zip: number,
  };
  crypto: string;
  created: Date;
}

export type CreateFoundationDTO = Partial<FoundationDTO>;
export type UpdateFoundationDTO = Partial<FoundationDTO>;
