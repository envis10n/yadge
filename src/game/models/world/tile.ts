import { Actor } from "../actor/base";

export interface MapTile {
    x: number;
    y: number;
    z: number;
    container: Set<string>;
}
