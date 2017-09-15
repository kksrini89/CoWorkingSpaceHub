import { ResultMap } from './coworkingmapresult.interface';

export interface CoWorkingSpaceResult {
    ID: number;
    country: string;
    city: string;
    map: ResultMap,
    description: string;
    logo: string;
    "cover-photo": string;
    name: string;
    slug: string;
    site: string;
}

export interface ResultMap {
    address: string;
    lat: number;
    lng: number;
}