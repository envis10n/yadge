import * as Engine from "../game";
import { TileMap } from "../game/models/world/map";

test("world", () => {
    class World extends Engine.Level {
        public readonly name: string = "World";
        public readonly map: TileMap = new TileMap(100, 100, 100);
        constructor() {
            super();
        }
    }

    const level = new World();

    const map = level.map;
    for (let z = -5; z <= 5; z++) {
        for (let y = -5; y <= 5; y++) {
            for (let x = -5; x <= 5; x++) {
                map.addTile([x, y, z]);
            }
        }
    }

    const tiles = map.getNearTiles([0, 0, 0], [1, 1, 0]);

    expect(tiles.length).toBe(9);
});
