import { Actor } from "../actor/base";
import { NMap } from "../../../lib/nmap";
import { EventEmitter } from "events";
import { Pos3D } from "../position";
import { TileMap } from "./map";

export class Level extends EventEmitter {
    public readonly name: string = "";
    public readonly map: TileMap = new TileMap(20, 20, 20);
    protected actors: NMap<string, Actor> = new NMap();
    constructor() {
        super();
        this.onBeginPlay();
        this.emit("beginPlay");
    }
    public spawnActorOfClass<T extends Actor>(
        pos: Pos3D,
        classSpawner: (pos: Pos3D) => T,
    ): T {
        let actor: T | null = classSpawner(pos);
        this.actors.set(actor.uuid, actor);
        actor.on("destroy", () => {
            if (actor !== null) {
                this.actors.delete(actor.uuid);
                actor = null;
            }
        });
        return actor;
    }
    public getAllActorsOfClass<T extends Actor>(
        guard: (actor: Actor) => actor is T,
    ): Array<[string, T]> {
        return this.actors.filter(guard);
    }
    public onBeginPlay() {}
    public onEndPlay() {}
    public onSpawn(actor: Actor) {}
}
