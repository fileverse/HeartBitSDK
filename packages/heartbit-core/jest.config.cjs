/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
     globals: {
       'ts-jest': {
          useESM: true,
          tsconfig: {
           verbatimModuleSyntax: false,
         },
       },
       },
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {},
};