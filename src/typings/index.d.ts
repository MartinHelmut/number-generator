export declare interface NumberGeneratorState {
    correction: number;
    sequence: number[];
}

export declare interface NumberGenerator {
    setSeed: (seed: number) => number;
    uFloat32: () => number;
    uInt32: () => number;
    getState: () => NumberGeneratorState;
    setState: (state?: NumberGeneratorState) => void;
}

export declare type NumberHashGenerator = (hash: string, seed?: number) => number;

export declare function aleaRNGFactory(initialSeed?: number): NumberGenerator;
export declare function murmurhash2_x86_32(hash: string, seed?: number): number;
export declare function murmurHash(hash: string, seed?: number): number; // Compatibility to v1
export declare function murmurhash3_x86_32(hash: string, seed?: number): number;
