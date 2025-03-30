/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/app/__tests__/setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@mui/material/(.*)$': '<rootDir>/app/__tests__/mocks/mui.ts',
    '^@mui/icons-material/(.*)$': '<rootDir>/app/__tests__/mocks/mui.ts',
    '^@/app/(.*)$': '<rootDir>/app/$1',
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/services/(.*)$': '<rootDir>/src/services/$1',
    '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@/types/(.*)$': '<rootDir>/src/types/$1',
    '^@/utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@/styles/(.*)$': '<rootDir>/src/styles/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.test.json',
      useBabelConfig: true,
    }],
    '^.+\\.(js|jsx)$': ['babel-jest', {
      presets: ['next/babel'],
    }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
  testTimeout: 10000,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    'app/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**'
  ]
}; 