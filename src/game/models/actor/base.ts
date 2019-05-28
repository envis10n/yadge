import { Pos3D } from "../position";
import { EventEmitter } from "events";
import { v4 } from "uuid";

export class Actor extends EventEmitter {
    public static spawn(pos: Pos3D): Actor {
        return new Actor(pos);
    }
    public readonly uuid: string = v4();
    private readonly lifetime: number = 0;
    constructor(protected position: Pos3D) {
        super();
        this.onConstruct();
        this.onBeginPlay();
        if (this.lifetime > 0) {
            setTimeout(this.destroy.bind(this), this.lifetime * 1000);
        }
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
    protected tick(delta: number) {
        this.onTick();
        this.emit("tick");
    }
}
