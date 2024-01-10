export interface IGameRequirements {
    pcRequirements: MinimumRequirements;
    minimumRequirements: MinimumRequirements;
    setMinimumRequirements: any;
}

export interface MinimumRequirements {
    [key: string]: string;
}