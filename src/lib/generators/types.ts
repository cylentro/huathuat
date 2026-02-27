


export interface GeneratorConfig {
    name: string;
    min: number;
    max: number;
    pick: number;
    hasAdditional?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StrategyFn = (config: GeneratorConfig, history: any[]) => number[];

export interface Strategy {
    id: string;
    name: string;
    description: string;
    complexity: 'Simple' | 'History' | 'Pattern' | 'Statistical';
    generate: StrategyFn;
}
