import { Actor } from "../actor/base";
import { Pos3D } from "../position";

import { DamageType, Damage } from "../damage/base";

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
    public isDead: boolean = false;
    public gainXP(amount: number) {
        this.emit("gainXP", amount);
        setImmediate(() => {
            const mult = this.xp.modifier;
            this.xp.current += amount * mult;
            while (this.xp.current >= this.xp.max) {
                this.xp.current -= this.xp.max;
                this.xp.max = this.calculateXPNext();
                this.level += 1;
                this.onLevelUp();
                this.emit("levelUp");
            }
        });
    }
    public heal(amount: number) {
        if (this.hp.current + amount > this.hp.max) {
            this.hp.current = this.hp.max;
        } else {
            this.hp.current += amount;
        }
        this.emit("heal", amount);
    }
    public recharge(amount: number) {
        if (this.mp.current + amount > this.mp.max) {
            this.mp.current = this.mp.max;
        } else {
            this.mp.current += amount;
        }
        this.emit("recharge", amount);
    }
    public spendMP(amount: number): boolean {
        if (this.mp.current - amount >= 0) {
            this.mp.current -= amount;
            this.emit("spendMP", amount);
            return true;
        } else {
            return false;
        }
    }
    public takeDamage(damage: Damage) {
        const overkill =
            this.hp.current - damage.amount < 0
                ? damage.amount - this.hp.current
                : -1;
        if (this.hp.current - damage.amount < 0) {
            this.hp.current = 0;
        } else {
            this.hp.current -= damage.amount;
        }
        this.emit("takeDamage", damage, overkill);
        if (this.hp.current === 0) {
            this.isDead = true;
            this.emit("onDeath");
            this.onDeath();
        }
    }
    public calculateXPNext() {
        return this.xp.max + 120;
    }
    public onDeath() {}
    public onLevelUp() {}
}
