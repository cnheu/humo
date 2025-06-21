import { useState } from "react";
import { Search, Palette } from "lucide-react";
import { Input } from "./ui/input";

interface NavigationProps {
  onSearch: (query: string) => void;
}

export function Navigation({ onSearch }: NavigationProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 sm:h-16 items-center gap-3 sm:gap-4 px-3 sm:px-4">
        {/* Left side - Logo */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          <span className="font-bold text-sm sm:text-base text-primary">Humo</span>
        </div>

        {/* Search - Takes up remaining space */}
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-2.5 sm:left-3 top-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-8 sm:pl-10 w-full h-9 sm:h-10 text-sm"
            aria-label="Search artworks and artists"
          />
        </div>
      </div>
    </header>
  );
}