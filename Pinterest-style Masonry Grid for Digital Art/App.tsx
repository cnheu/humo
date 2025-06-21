import { useState } from "react";
import { Navigation } from "./components/Navigation";
import { FilterBar } from "./components/FilterBar";
import { MasonryGrid } from "./components/MasonryGrid";
import { ArtworkModal } from "./components/ArtworkModal";
import { Artwork } from "./data/artworks";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [communityFilter, setCommunityFilter] = useState("");
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likedArtworks, setLikedArtworks] = useState<Set<string>>(new Set());
  const [artworkLikes, setArtworkLikes] = useState<Record<string, number>>({});

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCommunityFilter = (community: string) => {
    setCommunityFilter(community);
  };

  const handleArtworkClick = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedArtwork(null);
  };

  const handleLikeToggle = (artworkId: string, currentLikes: number) => {
    const isCurrentlyLiked = likedArtworks.has(artworkId);
    
    setLikedArtworks(prev => {
      const newSet = new Set(prev);
      if (isCurrentlyLiked) {
        newSet.delete(artworkId);
      } else {
        newSet.add(artworkId);
      }
      return newSet;
    });

    setArtworkLikes(prev => ({
      ...prev,
      [artworkId]: isCurrentlyLiked ? currentLikes - 1 : currentLikes + 1
    }));
  };

  const getArtworkLikes = (artworkId: string, originalLikes: number) => {
    return artworkLikes[artworkId] ?? originalLikes;
  };

  const isArtworkLiked = (artworkId: string) => {
    return likedArtworks.has(artworkId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation onSearch={handleSearch} />
      <FilterBar 
        onCommunityFilter={handleCommunityFilter}
        selectedCommunity={communityFilter}
      />
      <main>
        <MasonryGrid 
          searchQuery={searchQuery} 
          communityFilter={communityFilter}
          onArtworkClick={handleArtworkClick}
          onLikeToggle={handleLikeToggle}
          getArtworkLikes={getArtworkLikes}
          isArtworkLiked={isArtworkLiked}
        />
      </main>
      
      <ArtworkModal
        artwork={selectedArtwork}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
}