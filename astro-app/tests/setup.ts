// Test setup and global mocks
import { beforeAll } from 'vitest';

beforeAll(() => {
  // Setup any global test configuration here
  global.window = global.window || {};
});
