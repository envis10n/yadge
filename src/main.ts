import * as Engine from "./game";
import { TileMap } from "./game/models/world/map";

class World extends Engine.Level {
    public readonly name: string = "World";
    public readonly map: TileMap = new TileMap(100, 100, 100);
    constructor() {
        super();
    }
}

const level = new World();

const map = level.map;
