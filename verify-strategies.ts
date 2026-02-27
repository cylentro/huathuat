
import { SG_TOTO_HISTORY } from './src/data/sg-toto-history';
import { SINGAPORE_TOTO } from './src/lib/generators/singapore-toto';
import { STRATEGIES } from './src/lib/generators/registry';

console.log(`Historical draws loaded: ${SG_TOTO_HISTORY.length}`);

STRATEGIES.forEach(strategy => {
    const numbers = strategy.generate(SINGAPORE_TOTO, SG_TOTO_HISTORY);
    console.log(`${strategy.name.padEnd(20)}: ${numbers.join(', ')} (Sum: ${numbers.reduce((a, b) => a + b, 0)})`);

    // Validation
    if (numbers.length !== 6) throw new Error(`Invalid length for ${strategy.name}`);
    if (new Set(numbers).size !== 6) throw new Error(`Duplicates in ${strategy.name}`);
    if (numbers.some(n => n < 1 || n > 49)) throw new Error(`Out of range in ${strategy.name}`);
});

console.log("All strategies verified!");
