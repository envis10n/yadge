import { EventEmitter } from "events";

export class GameState extends EventEmitter {
    constructor() {
        super();
    }
    public onBeginPlay() {}
    public onEndPlay() {}
}
