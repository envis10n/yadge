import { Actor } from "../actor/base";
import { Pos3D } from "../position";

export interface CreatureResource {
    current: number;
    modifier: number;
    max: number;
}

export class Creature extends Actor {
    public static spawn(pos: Pos3D): Creature {
        return new Creature(pos);
    }
    public hp: CreatureResource = { current: 100, max: 100, modifier: 0 };
    public mp: CreatureResource = { current: 100, max: 100, modifier: 0 };
    public xp: CreatureResource = { current: 0, max: 120, modifier: 1 };
    public level: number = 1;
}
