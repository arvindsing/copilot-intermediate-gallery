import { describe, it, expect } from 'vitest';
import { GET, POST } from './route';
import { NextRequest } from 'next/server';

describe('/api/galleries', () => {
  describe('GET', () => {
    it('returns paginated galleries with default parameters', async () => {
      const request = new NextRequest('http://localhost:3000/api/galleries');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.galleries).toBeDefined();
      expect(Array.isArray(data.galleries)).toBe(true);
      expect(data.pagination).toMatchObject({
        page: 1,
        limit: 20,
        total: expect.any(Number),
        pages: expect.any(Number),
      });
    });

    it('returns paginated galleries with custom page', async () => {
      const request = new NextRequest('http://localhost:3000/api/galleries?page=1&limit=5');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.galleries).toHaveLength(5);
      expect(data.pagination.page).toBe(1);
      expect(data.pagination.limit).toBe(5);
    });

    it('returns second page correctly', async () => {
      const request = new NextRequest('http://localhost:3000/api/galleries?page=2&limit=5');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.galleries).toHaveLength(5);
      expect(data.pagination.page).toBe(2);
    });

    it('validates pagination parameters - negative page', async () => {
      const request = new NextRequest('http://localhost:3000/api/galleries?page=-1');
      const response = await GET(request);

      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.error).toBe('Invalid pagination parameters');
    });

    it('validates pagination parameters - zero page', async () => {
      const request = new NextRequest('http://localhost:3000/api/galleries?page=0');
      const response = await GET(request);

      expect(response.status).toBe(400);
    });

    it('validates pagination parameters - negative limit', async () => {
      const request = new NextRequest('http://localhost:3000/api/galleries?limit=-1');
      const response = await GET(request);

      expect(response.status).toBe(400);
    });

    it('validates pagination parameters - limit exceeds maximum', async () => {
      const request = new NextRequest('http://localhost:3000/api/galleries?limit=101');
      const response = await GET(request);

      expect(response.status).toBe(400);
    });

    it('returns empty array for page beyond available data', async () => {
      const request = new NextRequest('http://localhost:3000/api/galleries?page=999');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.galleries).toHaveLength(0);
    });

    it('calculates total pages correctly', async () => {
      const request = new NextRequest('http://localhost:3000/api/galleries?limit=5');
      const response = await GET(request);
      const data = await response.json();

      expect(data.pagination.pages).toBe(Math.ceil(data.pagination.total / 5));
    });
  });

  describe('POST', () => {
    it('creates a new gallery with valid data', async () => {
      const galleryData = {
        name: 'Test Gallery',
        description: 'Test Description',
      };

      const request = new NextRequest('http://localhost:3000/api/galleries', {
        method: 'POST',
        body: JSON.stringify(galleryData),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.gallery).toMatchObject({
        name: 'Test Gallery',
        description: 'Test Description',
        id: expect.any(String),
        createdAt: expect.any(String),
        photoCount: 0,
      });
    });

    it('validates required field - name missing', async () => {
      const request = new NextRequest('http://localhost:3000/api/galleries', {
        method: 'POST',
        body: JSON.stringify({ description: 'Test' }),
      });

      const response = await POST(request);

      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.error).toBe('Name and description are required');
    });

    it('validates required field - description missing', async () => {
      const request = new NextRequest('http://localhost:3000/api/galleries', {
        method: 'POST',
        body: JSON.stringify({ name: 'Test' }),
      });

      const response = await POST(request);

      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.error).toBe('Name and description are required');
    });

    it('validates required field - both missing', async () => {
      const request = new NextRequest('http://localhost:3000/api/galleries', {
        method: 'POST',
        body: JSON.stringify({}),
      });

      const response = await POST(request);

      expect(response.status).toBe(400);
    });

    it('sanitizes input to prevent XSS - name field', async () => {
      const maliciousData = {
        name: '<script>alert("xss")</script>My Gallery',
        description: 'Test Description',
      };

      const request = new NextRequest('http://localhost:3000/api/galleries', {
        method: 'POST',
        body: JSON.stringify(maliciousData),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.gallery.name).not.toContain('<script>');
      expect(data.gallery.name).toBe('My Gallery');
    });

    it('sanitizes input to prevent XSS - description field', async () => {
      const maliciousData = {
        name: 'Test Gallery',
        description: 'Safe text <script>alert("xss")</script> more text',
      };

      const request = new NextRequest('http://localhost:3000/api/galleries', {
        method: 'POST',
        body: JSON.stringify(maliciousData),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.gallery.description).not.toContain('<script>');
    });

    it('rejects empty strings after sanitization', async () => {
      const maliciousData = {
        name: '<script>alert("xss")</script>',
        description: 'Test',
      };

      const request = new NextRequest('http://localhost:3000/api/galleries', {
        method: 'POST',
        body: JSON.stringify(maliciousData),
      });

      const response = await POST(request);

      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.error).toBe('Invalid input after sanitization');
    });

    it('trims whitespace from input', async () => {
      const galleryData = {
        name: '  Test Gallery  ',
        description: '  Test Description  ',
      };

      const request = new NextRequest('http://localhost:3000/api/galleries', {
        method: 'POST',
        body: JSON.stringify(galleryData),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.gallery.name).toBe('Test Gallery');
      expect(data.gallery.description).toBe('Test Description');
    });

    it('sets createdAt to current date', async () => {
      const request = new NextRequest('http://localhost:3000/api/galleries', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Test',
          description: 'Test',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      const today = new Date().toISOString().split('T')[0];
      expect(data.gallery.createdAt).toBe(today);
    });

    it('initializes photoCount to 0', async () => {
      const request = new NextRequest('http://localhost:3000/api/galleries', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Test',
          description: 'Test',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(data.gallery.photoCount).toBe(0);
    });
  });
});
