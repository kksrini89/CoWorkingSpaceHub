import { ResultMap } from './coworkingmapresult.interface';

export interface CoWorkingSpace {
    ID: number;
    city: string;
    map: ResultMap,
    name: string;
    slug: string;
    site: string;
}

export interface ResultMap {
    address: string;
    lat: number;
    lng: number;
}