// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
require('@testing-library/jest-dom/extend-expect');
require('@testing-library/react');

process.env.MONGODB_URI='mongodb://localhost:27017/live-speaker-tools'
process.env.MONGODB_DATABASE='live-speaker-tools'