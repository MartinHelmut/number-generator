/** The MIT License (MIT) - Copyright (c) 2016-2018 Martin Helmut Fieber */

export interface NumberGeneratorState {
    correction: number;
    sequence: number[];
}

export interface NumberGenerator {
    setSeed: (seed: number) => number;
    uFloat32: () => number;
    uInt32: () => number;
    getState: () => NumberGeneratorState;
    setState: (state?: NumberGeneratorState) => void;
}

export declare type NumberHashGenerator = (hash: string, seed: number) => number;
export declare function aleaRNGFactory(initialSeed?: number): NumberGenerator;
export declare function murmurHash(hash: string, seed?: number): number;
