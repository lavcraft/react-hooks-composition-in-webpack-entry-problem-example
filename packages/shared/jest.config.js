module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverageFrom: [
        '**/*.{ts}',
        '!**/*.d.ts',
        '!**/node_modules/**',
    ],
    testPathIgnorePatterns: ['/node_modules/', '/build/'],
    moduleNameMapper: {
        '^@online/speaker-room-sdk/(.*)': '<rootDir>../../packages/speaker-room-sdk/lib-sdk/cjs/$1',
    },
};