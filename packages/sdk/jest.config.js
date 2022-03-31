const {pathsToModuleNameMapper} = require("ts-jest/utils");
const tsconfig = require('./tsconfig.json');

module.exports = {
    preset: 'ts-jest',
    testMatch: [ "**/__tests__/**/*.test.ts" ],
    collectCoverageFrom: [
        '**/*.{ts}',
        '!**/*.d.ts',
        '!**/node_modules/**',
    ],
    rootDir: 'src',
    testPathIgnorePatterns: ['/node_modules/'],
    testEnvironment: 'jsdom',
    transformIgnorePatterns: [
        '/node_modules/',
    ],
    moduleNameMapper: {
        ...pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {prefix: '<rootDir>'})
    },
};