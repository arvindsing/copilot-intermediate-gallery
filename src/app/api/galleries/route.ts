import { NextRequest, NextResponse } from 'next/server';

interface Gallery {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  photoCount: number;
}

// Mock data store
const galleries: Gallery[] = [
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
  { id: '11', name: 'Black & White', description: 'Monochrome photography', createdAt: '2023-12-01', photoCount: 52 },
  { id: '12', name: 'Travel Memories', description: 'Around the world', createdAt: '2023-11-28', photoCount: 89 },
];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    // Validate pagination parameters
    if (page < 1 || limit < 1 || limit > 100) {
      return NextResponse.json(
        { error: 'Invalid pagination parameters' },
        { status: 400 }
      );
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedGalleries = galleries.slice(startIndex, endIndex);

    return NextResponse.json({
      galleries: paginatedGalleries,
      pagination: {
        page,
        limit,
        total: galleries.length,
        pages: Math.ceil(galleries.length / limit),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.description) {
      return NextResponse.json(
        { error: 'Name and description are required' },
        { status: 400 }
      );
    }

    // Sanitize input to prevent XSS
    const sanitizedName = body.name.replace(/<script.*?>.*?<\/script>/gi, '').trim();
    const sanitizedDescription = body.description.replace(/<script.*?>.*?<\/script>/gi, '').trim();

    // Validate sanitized fields are not empty
    if (!sanitizedName || !sanitizedDescription) {
      return NextResponse.json(
        { error: 'Invalid input after sanitization' },
        { status: 400 }
      );
    }

    const newGallery: Gallery = {
      id: Date.now().toString(),
      name: sanitizedName,
      description: sanitizedDescription,
      createdAt: new Date().toISOString().split('T')[0],
      photoCount: 0,
    };

    galleries.push(newGallery);

    return NextResponse.json(
      { gallery: newGallery },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
