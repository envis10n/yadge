import { Pos3D } from "../position";
import { EventEmitter } from "events";

export class Actor extends EventEmitter {
    public static spawn(pos: Pos3D): Actor {
        return new Actor(pos);
    }
    constructor(protected position: Pos3D) {
        super();
        this.onConstruct();
        this.onBeginPlay();
    }
    public setLocation(pos: Pos3D) {
        this.position = pos;
    }
    public getLocation(): Pos3D {
        return this.position;
    }
    public destroy() {
        this.onDestroy();
        this.emit("destroy");
    }
    public onTick() {}
    public onBeginPlay() {}
    public onConstruct() {}
    public onDestroy() {}
}
