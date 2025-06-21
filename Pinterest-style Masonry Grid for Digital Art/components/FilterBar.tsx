import { Badge } from "./ui/badge";
import { artworks } from "../data/artworks";

interface FilterBarProps {
  onCommunityFilter: (community: string) => void;
  selectedCommunity?: string;
}

export function FilterBar({ onCommunityFilter, selectedCommunity }: FilterBarProps) {
  const handleCommunityClick = (community: string) => {
    const newCommunity = selectedCommunity === community ? "" : community;
    onCommunityFilter(newCommunity);
  };

  const handleClearFilters = () => {
    onCommunityFilter("");
  };

  // Get unique categories from all artworks' categories arrays
  const allCategories = artworks.flatMap(artwork => artwork.categories);
  const communities = Array.from(new Set(allCategories)).sort();

  return (
    <div className="sticky top-14 sm:top-16 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Community Bubbles - Scrollable container with All option first */}
          <div className="flex gap-1.5 sm:gap-2 overflow-x-auto scrollbar-hide flex-1 min-w-0">
            {/* All filter - always first */}
            <Badge
              variant={!selectedCommunity ? "default" : "secondary"}
              className={`
                cursor-pointer whitespace-nowrap text-xs flex-shrink-0 px-2 sm:px-3 py-1 transition-all duration-200
                ${!selectedCommunity 
                  ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                  : "hover:bg-accent hover:text-accent-foreground"
                }
              `}
              onClick={handleClearFilters}
            >
              All
            </Badge>
            
            {/* Category filters */}
            {communities.map((community) => (
              <Badge
                key={community}
                variant={selectedCommunity === community ? "default" : "secondary"}
                className={`
                  cursor-pointer whitespace-nowrap text-xs flex-shrink-0 px-2 sm:px-3 py-1 transition-all duration-200
                  ${selectedCommunity === community 
                    ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                    : "hover:bg-accent hover:text-accent-foreground"
                  }
                `}
                onClick={() => handleCommunityClick(community)}
              >
                {community}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}