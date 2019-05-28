export class NMap<K, V> extends Map<K, V> {
    constructor() {
        super();
    }
    public *iter(): IterableIterator<V> {
        for (const v of this) {
            yield v[1];
        }
    }
    public async asyncForEach(
        cb: (val: V, key: K, map: NMap<K, V>) => Promise<void>,
    ): Promise<void> {
        for (const v of this) {
            await cb(v[1], v[0], this);
        }
    }
    public filter<T extends V>(
        guard: (element: V) => element is T,
    ): Array<[K, T]> {
        const map: Array<[K, T]> = [];
        for (const val of this) {
            if (guard(val[1])) {
                map.push([val[0], val[1]]);
            }
        }
        return map;
    }
}
