import { Heart, User, Eye } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Artwork } from "../data/artworks";

interface ArtCardProps {
  artwork: Artwork;
  onArtworkClick: (artwork: Artwork) => void;
  onLikeToggle: (artworkId: string, currentLikes: number) => void;
  currentLikes: number;
  isLiked: boolean;
}

export function ArtCard({ 
  artwork, 
  onArtworkClick, 
  onLikeToggle, 
  currentLikes, 
  isLiked 
}: ArtCardProps) {
  const handleClick = () => {
    onArtworkClick(artwork);
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLikeToggle(artwork.id, currentLikes);
  };

  return (
    <div 
      className="group relative w-full mb-3 sm:mb-4 break-inside-avoid rounded-xl sm:rounded-2xl overflow-hidden bg-card shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={handleClick}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <ImageWithFallback
          src={artwork.imageUrl}
          alt={artwork.title}
          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Overlay on hover - Hidden on mobile for better touch experience */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block" />
        
        {/* Floating action buttons - Hidden on mobile */}
        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
          <div className="flex gap-1.5 sm:gap-2">

            <button 
              className="bg-white/90 hover:bg-white p-1.5 sm:p-2 rounded-full shadow-lg transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                // Handle view action (could open modal or do something else)
              }}
            >
              <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
            </button>
          </div>
        </div>
        
        {/* Category badges */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3">

        </div>
      </div>
      
      {/* Content */}
      <div className="p-3 sm:p-4">
        <h3 className="font-medium text-foreground mb-2 sm:mb-3 line-clamp-2 text-sm sm:text-base">
          {artwork.caption}
        </h3>
        
        {/* Artist and stats */}
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
            <User className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
            <span className="text-muted-foreground truncate">{artwork.artist}</span>
          </div>
          <button 
            className="flex items-center gap-1 flex-shrink-0 ml-2 transition-colors duration-200 hover:scale-105"
            onClick={handleLikeClick}
          >
            <Heart 
              className={`w-3 h-3 sm:w-4 sm:h-4 transition-all duration-200 ${
                isLiked ? 'text-red-500 fill-current' : 'text-red-500'
              }`} 
            />
            <span className="text-muted-foreground">
              {currentLikes > 999 ? `${(currentLikes/1000).toFixed(1)}k` : currentLikes.toLocaleString()}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}