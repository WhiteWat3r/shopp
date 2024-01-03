export interface IGame {
    id: number;
    name: string;
    price: number;
    discount: number;
    img: string;
    categoriess: string[];
    categories: {id: number; description: string}[];
    platformId: number;
    info: string;
    screenshots?: string;
    regions: string[];
    publisher: {name: string};
    platform: {name: string};
    supported_languages: string;
    release_date: string;
    categoryIds: number[];
    language: string;
    releaseDate: string;
    preOrderStatus: boolean;
    dlcStatus: boolean;
    soonStatus: boolean;
    steamApi: number;
}