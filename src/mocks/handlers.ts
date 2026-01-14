import { http, HttpResponse } from 'msw';

interface Gallery {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  photoCount: number;
}

// Mock gallery data
const mockGalleries: Gallery[] = [
  { id: '1', name: 'Vacation 2024', description: 'Summer vacation photos', createdAt: '2024-01-15', photoCount: 24 },
  { id: '2', name: 'Wedding Photos', description: 'Emma & David Wedding', createdAt: '2024-01-10', photoCount: 156 },
  { id: '3', name: 'Nature Collection', description: 'Beautiful landscapes', createdAt: '2024-01-05', photoCount: 48 },
  { id: '4', name: 'City Life', description: 'Urban photography', createdAt: '2024-01-01', photoCount: 32 },
  { id: '5', name: 'Portraits', description: 'Professional portraits', createdAt: '2023-12-28', photoCount: 18 },
  { id: '6', name: 'Food Photography', description: 'Culinary delights', createdAt: '2023-12-25', photoCount: 64 },
  { id: '7', name: 'Architecture', description: 'Modern buildings', createdAt: '2023-12-20', photoCount: 42 },
  { id: '8', name: 'Wildlife', description: 'Animals in nature', createdAt: '2023-12-15', photoCount: 56 },
  { id: '9', name: 'Street Art', description: 'Urban art collection', createdAt: '2023-12-10', photoCount: 28 },
  { id: '10', name: 'Sunset Series', description: 'Beautiful sunsets', createdAt: '2023-12-05', photoCount: 36 },
];

export const handlers = [
  // Get galleries with pagination
  http.get('/api/galleries', ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '20');

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedGalleries = mockGalleries.slice(startIndex, endIndex);

    return HttpResponse.json({
      galleries: paginatedGalleries,
      pagination: {
        page,
        limit,
        total: mockGalleries.length,
        pages: Math.ceil(mockGalleries.length / limit),
      },
    });
  }),

  // Create new gallery
  http.post('/api/galleries', async ({ request }) => {
    const body = await request.json() as { name: string; description: string };

    if (!body.name || !body.description) {
      return HttpResponse.json(
        { error: 'Name and description are required' },
        { status: 400 }
      );
    }

    const newGallery: Gallery = {
      id: Date.now().toString(),
      name: body.name,
      description: body.description,
      createdAt: new Date().toISOString().split('T')[0],
      photoCount: 0,
    };

    mockGalleries.push(newGallery);

    return HttpResponse.json(
      { gallery: newGallery },
      { status: 201 }
    );
  }),

  // Get single gallery
  http.get('/api/galleries/:id', ({ params }) => {
    const { id } = params;
    const gallery = mockGalleries.find(g => g.id === id);

    if (!gallery) {
      return HttpResponse.json(
        { error: 'Gallery not found' },
        { status: 404 }
      );
    }

    return HttpResponse.json({ gallery });
  }),

  // Update gallery
  http.put('/api/galleries/:id', async ({ params, request }) => {
    const { id } = params;
    const body = await request.json() as Partial<Gallery>;
    const galleryIndex = mockGalleries.findIndex(g => g.id === id);

    if (galleryIndex === -1) {
      return HttpResponse.json(
        { error: 'Gallery not found' },
        { status: 404 }
      );
    }

    mockGalleries[galleryIndex] = {
      ...mockGalleries[galleryIndex],
      ...body,
    };

    return HttpResponse.json({ gallery: mockGalleries[galleryIndex] });
  }),

  // Delete gallery
  http.delete('/api/galleries/:id', ({ params }) => {
    const { id } = params;
    const galleryIndex = mockGalleries.findIndex(g => g.id === id);

    if (galleryIndex === -1) {
      return HttpResponse.json(
        { error: 'Gallery not found' },
        { status: 404 }
      );
    }

    mockGalleries.splice(galleryIndex, 1);

    return HttpResponse.json({ success: true });
  }),

  // Upload photos to gallery
  http.post('/api/galleries/:id/photos', async ({ params, request }) => {
    const { id } = params;
    const gallery = mockGalleries.find(g => g.id === id);

    if (!gallery) {
      return HttpResponse.json(
        { error: 'Gallery not found' },
        { status: 404 }
      );
    }

    // Simulate file upload processing
    const formData = await request.formData();
    const files = formData.getAll('files');

    if (files.length === 0) {
      return HttpResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      );
    }

    // Update gallery photo count
    gallery.photoCount += files.length;

    return HttpResponse.json({
      success: true,
      uploadedCount: files.length,
      gallery,
    });
  }),

  // Get photos from gallery
  http.get('/api/galleries/:id/photos', ({ params, request }) => {
    const { id } = params;
    const gallery = mockGalleries.find(g => g.id === id);

    if (!gallery) {
      return HttpResponse.json(
        { error: 'Gallery not found' },
        { status: 404 }
      );
    }

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '20');

    // Return mock photos (simplified)
    const photos = Array.from({ length: gallery.photoCount }, (_, i) => ({
      id: `${id}-photo-${i + 1}`,
      url: `/placeholder-${(i % 9) + 1}.jpg`,
      title: `Photo ${i + 1}`,
      tags: ['sample'],
    }));

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPhotos = photos.slice(startIndex, endIndex);

    return HttpResponse.json({
      photos: paginatedPhotos,
      pagination: {
        page,
        limit,
        total: photos.length,
        pages: Math.ceil(photos.length / limit),
      },
    });
  }),
];
