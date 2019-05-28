import { Creature } from "../game/models/creature/base";

test("creature", () => {
    const t = Creature.spawn([0, 0, 0]);
    expect(t.level).toBe(1);
    expect(t.getLocation()).toStrictEqual([0, 0, 0]);
});
