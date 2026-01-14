import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useGalleryFilter } from './useGalleryFilter';
import { Photo } from '@/lib/mock-photo-data';

const mockPhotos: Photo[] = [
  {
    id: '1',
    url: '/photo1.jpg',
    title: 'Mountain Sunrise',
    tags: ['landscape', 'nature', 'mountain'],
    likes: 150,
    downloads: 45,
    views: 1200,
    photographer: 'John Doe',
    dateTaken: '2024-01-15',
  },
  {
    id: '2',
    url: '/photo2.jpg',
    title: 'City Lights',
    tags: ['urban', 'night', 'city'],
    likes: 220,
    downloads: 67,
    views: 1800,
    photographer: 'Jane Smith',
    dateTaken: '2024-01-20',
  },
  {
    id: '3',
    url: '/photo3.jpg',
    title: 'Ocean Sunset',
    tags: ['landscape', 'sunset', 'ocean'],
    likes: 185,
    downloads: 52,
    views: 1500,
    photographer: 'Bob Wilson',
    dateTaken: '2024-01-10',
  },
  {
    id: '4',
    url: '/photo4.jpg',
    title: 'Forest Trail',
    tags: ['nature', 'forest', 'landscape'],
    likes: 95,
    downloads: 28,
    views: 890,
    photographer: 'Alice Brown',
    dateTaken: '2024-01-25',
  },
];

describe('useGalleryFilter', () => {
  it('initializes with all photos', () => {
    const { result } = renderHook(() => useGalleryFilter(mockPhotos));

    expect(result.current.filteredPhotos).toHaveLength(mockPhotos.length);
    expect(result.current.selectedTag).toBeNull();
    expect(result.current.sortBy).toBe('recent');
  });

  describe('filtering by tag', () => {
    it('filters photos by single tag', () => {
      const { result } = renderHook(() => useGalleryFilter(mockPhotos));

      act(() => {
        result.current.setTag('landscape');
      });

      expect(result.current.filteredPhotos).toHaveLength(3);
      expect(result.current.selectedTag).toBe('landscape');
      expect(result.current.filteredPhotos.every(p => p.tags.includes('landscape'))).toBe(true);
    });

    it('filters photos by different tag', () => {
      const { result } = renderHook(() => useGalleryFilter(mockPhotos));

      act(() => {
        result.current.setTag('urban');
      });

      expect(result.current.filteredPhotos).toHaveLength(1);
      expect(result.current.filteredPhotos[0].title).toBe('City Lights');
    });

    it('returns empty array for non-existent tag', () => {
      const { result } = renderHook(() => useGalleryFilter(mockPhotos));

      act(() => {
        result.current.setTag('nonexistent');
      });

      expect(result.current.filteredPhotos).toHaveLength(0);
    });

    it('clears filter when tag set to null', () => {
      const { result } = renderHook(() => useGalleryFilter(mockPhotos));

      act(() => {
        result.current.setTag('landscape');
      });

      expect(result.current.filteredPhotos).toHaveLength(3);

      act(() => {
        result.current.setTag(null);
      });

      expect(result.current.filteredPhotos).toHaveLength(mockPhotos.length);
    });
  });

  describe('sorting', () => {
    it('sorts photos by likes (descending)', () => {
      const { result } = renderHook(() => useGalleryFilter(mockPhotos));

      act(() => {
        result.current.setSortBy('likes');
      });

      const likes = result.current.filteredPhotos.map(p => p.likes);
      expect(likes).toEqual([220, 185, 150, 95]);
    });

    it('sorts photos by downloads (descending)', () => {
      const { result } = renderHook(() => useGalleryFilter(mockPhotos));

      act(() => {
        result.current.setSortBy('downloads');
      });

      const downloads = result.current.filteredPhotos.map(p => p.downloads);
      expect(downloads).toEqual([67, 52, 45, 28]);
    });

    it('sorts photos by views (descending)', () => {
      const { result } = renderHook(() => useGalleryFilter(mockPhotos));

      act(() => {
        result.current.setSortBy('views');
      });

      const views = result.current.filteredPhotos.map(p => p.views);
      expect(views).toEqual([1800, 1500, 1200, 890]);
    });

    it('sorts photos by recent date (descending)', () => {
      const { result } = renderHook(() => useGalleryFilter(mockPhotos));

      act(() => {
        result.current.setSortBy('recent');
      });

      const dates = result.current.filteredPhotos.map(p => p.dateTaken);
      expect(dates).toEqual(['2024-01-25', '2024-01-20', '2024-01-15', '2024-01-10']);
    });
  });

  describe('combined filtering and sorting', () => {
    it('applies both filter and sort', () => {
      const { result } = renderHook(() => useGalleryFilter(mockPhotos));

      act(() => {
        result.current.setTag('landscape');
        result.current.setSortBy('likes');
      });

      expect(result.current.filteredPhotos).toHaveLength(3);
      const likes = result.current.filteredPhotos.map(p => p.likes);
      expect(likes).toEqual([185, 150, 95]);
    });

    it('maintains sort when changing filter', () => {
      const { result } = renderHook(() => useGalleryFilter(mockPhotos));

      act(() => {
        result.current.setSortBy('likes');
        result.current.setTag('nature');
      });

      const likes = result.current.filteredPhotos.map(p => p.likes);
      expect(likes[0]).toBeGreaterThanOrEqual(likes[likes.length - 1]);
    });
  });

  describe('reset', () => {
    it('resets all filters and sorting', () => {
      const { result } = renderHook(() => useGalleryFilter(mockPhotos));

      act(() => {
        result.current.setTag('landscape');
        result.current.setSortBy('likes');
      });

      act(() => {
        result.current.reset();
      });

      expect(result.current.selectedTag).toBeNull();
      expect(result.current.sortBy).toBe('recent');
      expect(result.current.filteredPhotos).toHaveLength(mockPhotos.length);
    });

    it('works when called multiple times', () => {
      const { result } = renderHook(() => useGalleryFilter(mockPhotos));

      act(() => {
        result.current.reset();
        result.current.reset();
      });

      expect(result.current.filteredPhotos).toHaveLength(mockPhotos.length);
    });
  });

  describe('edge cases', () => {
    it('handles empty photos array', () => {
      const { result } = renderHook(() => useGalleryFilter([]));

      expect(result.current.filteredPhotos).toHaveLength(0);
    });

    it('handles photos without dates', () => {
      const photosWithoutDates: Photo[] = [
        { ...mockPhotos[0], dateTaken: undefined },
        { ...mockPhotos[1], dateTaken: undefined },
      ];

      const { result } = renderHook(() => useGalleryFilter(photosWithoutDates));

      act(() => {
        result.current.setSortBy('recent');
      });

      expect(result.current.filteredPhotos).toHaveLength(2);
    });
  });
});
