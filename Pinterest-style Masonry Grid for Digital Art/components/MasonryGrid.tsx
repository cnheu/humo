import { useState, useEffect } from "react";
import Masonry from "react-responsive-masonry";
import { ArtCard } from "./ArtCard";
import { artworks } from "../data/artworks";
import { Artwork } from "../data/artworks";

interface MasonryGridProps {
  searchQuery?: string;
  communityFilter?: string;
  onArtworkClick: (artwork: Artwork) => void;
  onLikeToggle: (artworkId: string, currentLikes: number) => void;
  getArtworkLikes: (artworkId: string, originalLikes: number) => number;
  isArtworkLiked: (artworkId: string) => boolean;
}

export function MasonryGrid({ 
  searchQuery = "", 
  communityFilter = "", 
  onArtworkClick,
  onLikeToggle,
  getArtworkLikes,
  isArtworkLiked
}: MasonryGridProps) {
  const [columnCount, setColumnCount] = useState(4);

  // Custom responsive logic
  useEffect(() => {
    const updateColumnCount = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setColumnCount(2); // Mobile: 2 columns
      } else if (width < 1024) {
        setColumnCount(2); // Small tablet: 2 columns
      } else if (width < 1280) {
        setColumnCount(4); // Tablet: 4 columns
      } else {
        setColumnCount(4); // Desktop: 4 columns
      }
    };

    // Set initial column count
    updateColumnCount();

    // Add event listener for window resize
    window.addEventListener('resize', updateColumnCount);

    // Cleanup event listener on unmount
    return () => window.removeEventListener('resize', updateColumnCount);
  }, []);

  // Filter artworks based on search query and community filter
  const filteredArtworks = artworks.filter((artwork) => {
    // Apply search filter
    let matchesSearch = true;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      matchesSearch = (
        artwork.title.toLowerCase().includes(query) ||
        artwork.artist.toLowerCase().includes(query) ||
        artwork.categories.some(category => category.toLowerCase().includes(query)) ||
        artwork.description.toLowerCase().includes(query)
      );
    }

    // Apply community filter
    let matchesCommunity = true;
    if (communityFilter) {
      matchesCommunity = artwork.categories.includes(communityFilter);
    }

    return matchesSearch && matchesCommunity;
  });

  return (
    <div className="container mx-auto px-1 py-4 sm:py-6">
      {/* Search Results Header */}
      {(searchQuery || communityFilter) && (
        <div className="mb-4 sm:mb-6">
          <h2 className="mb-2">
            {searchQuery && communityFilter && `Search Results for "${searchQuery}" in ${communityFilter}`}
            {searchQuery && !communityFilter && `Search Results for "${searchQuery}"`}
            {!searchQuery && communityFilter && `${communityFilter} Artworks`}
          </h2>
          <p className="text-muted-foreground">
            Found {filteredArtworks.length} artwork{filteredArtworks.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}

      
      {/* No Results Message */}
      {filteredArtworks.length === 0 && (searchQuery || communityFilter) && (
        <div className="text-center py-8 sm:py-12 px-4">
          <h3 className="mb-2">No artworks found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search terms or browse other categories
          </p>
        </div>
      )}
      
      {/* Masonry Grid - Custom responsive implementation */}
      {filteredArtworks.length > 0 && (
        <Masonry
          key={columnCount} // Force re-render when column count changes
          columnsCount={columnCount}
          gutter="12px"
        >
          {filteredArtworks.map((artwork) => (
            <ArtCard 
              key={artwork.id} 
              artwork={artwork} 
              onArtworkClick={onArtworkClick}
              onLikeToggle={onLikeToggle}
              currentLikes={getArtworkLikes(artwork.id, artwork.likes)}
              isLiked={isArtworkLiked(artwork.id)}
            />
          ))}
        </Masonry>
      )}
    </div>
  );
}