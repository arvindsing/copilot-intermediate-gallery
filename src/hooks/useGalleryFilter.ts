'use client';

import { useState, useMemo } from 'react';
import { Photo } from '@/lib/mock-photo-data';

type SortOption = 'likes' | 'downloads' | 'views' | 'recent';

export function useGalleryFilter(photos: Photo[]) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('recent');

  const filteredPhotos = useMemo(() => {
    let result = [...photos];

    // Filter by tag
    if (selectedTag) {
      result = result.filter(photo => photo.tags.includes(selectedTag));
    }

    // Sort
    switch (sortBy) {
      case 'likes':
        result.sort((a, b) => b.likes - a.likes);
        break;
      case 'downloads':
        result.sort((a, b) => b.downloads - a.downloads);
        break;
      case 'views':
        result.sort((a, b) => b.views - a.views);
        break;
      case 'recent':
        result.sort((a, b) => {
          const dateA = new Date(a.dateTaken || '').getTime();
          const dateB = new Date(b.dateTaken || '').getTime();
          return dateB - dateA;
        });
        break;
    }

    return result;
  }, [photos, selectedTag, sortBy]);

  const reset = () => {
    setSelectedTag(null);
    setSortBy('recent');
  };

  return {
    filteredPhotos,
    selectedTag,
    setTag: setSelectedTag,
    sortBy,
    setSortBy,
    reset,
  };
}
