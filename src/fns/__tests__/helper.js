import fs from 'fs';
import path from 'path';

export function requireFunction(name) {
    const fnPath = path.resolve(
        process.env.NODE_ENV === 'production'
            ? `lib/${name}.js`
            : `src/fns/${name}.js`
    );

    if (!fs.existsSync(fnPath)) {
        throw new ReferenceError(
            `Function "${name}" does not exist under ${fnPath}`
        );
    }

    const fn = require(fnPath);

    return fn.default ? fn.default : fn;
}
