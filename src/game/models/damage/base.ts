export enum DamageType {
    NONE,
    PHYSICAL,
    NATURE,
    COLD,
    FIRE,
    DEATH,
    SHADOW,
    ARCANE,
    HOLY,
}

export interface Damage {
    type: DamageType;
    isCrit: boolean;
    amount: number;
}
