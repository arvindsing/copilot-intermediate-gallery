import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './src/mocks/setup';
import '@testing-library/jest-dom';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
