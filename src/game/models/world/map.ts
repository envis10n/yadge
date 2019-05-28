import { MapTile } from "./tile";
import { NMap } from "../../../lib/nmap";
import { Pos3D } from "../position";

export class TileMap {
    private tiles: NMap<string, MapTile> = new NMap();
    constructor(
        public readonly width: number,
        public readonly length: number,
        public readonly height: number,
    ) {}
    public getTile(pos: Pos3D): MapTile | undefined {
        return this.tiles.get(pos.join("|"));
    }
    public addTile(pos: Pos3D) {
        this.tiles.set(pos.join("|"), {
            x: pos[0],
            y: pos[1],
            z: pos[2],
            container: new Set(),
        });
    }
    public getNearTiles(
        pos: Pos3D,
        distance: Pos3D = [1, 1, 1],
        filter?: (val: MapTile) => boolean,
    ): MapTile[] {
        const res: MapTile[] = [];
        for (let z = pos[2] - distance[2]; z <= pos[2] + distance[2]; z++) {
            for (let y = pos[1] - distance[1]; y <= pos[1] + distance[1]; y++) {
                for (
                    let x = pos[0] - distance[0];
                    x <= pos[0] + distance[0];
                    x++
                ) {
                    const tile = this.getTile([x, y, z]);
                    if (tile !== undefined) {
                        res.push(tile);
                    }
                }
            }
        }
        if (filter !== undefined) {
            return res.filter(filter);
        } else {
            return res;
        }
    }
}
