module.exports = {
  all: true,
  extends: '@istanbuljs/nyc-config-typescript',
  exclude: [
    'src/tests',
    'src/api',
    'src/middlewares',
    'src/models/connection.ts'
  ],
  include: ['src/**/*.ts'],
};
