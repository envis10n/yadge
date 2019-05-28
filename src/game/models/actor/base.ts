import { Pos3D } from "../position";

export class Actor {
    public static spawn(pos: Pos3D): Actor {
        return new Actor(pos);
    }
    constructor(protected position: Pos3D) {
        this.onConstruct();
        this.onBeginPlay();
    }
    public setLocation(pos: Pos3D) {
        this.position = pos;
    }
    public getLocation(): Pos3D {
        return this.position;
    }
    public onTick() {}
    public onBeginPlay() {}
    public onConstruct() {}
    public onDestroy() {}
}
