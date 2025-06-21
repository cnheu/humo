import { Home, Palette, User, Heart, TrendingUp, Filter } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { artworks } from "../data/artworks";

export function Sidebar() {
  const categories = Array.from(new Set(artworks.map(art => art.category)));
  const artists = Array.from(new Set(artworks.map(art => art.artist)));

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 sm:p-6">
        <div className="flex items-center gap-2">
          <Palette className="h-5 w-5 text-primary" />
          <span className="font-medium">Gallery</span>
        </div>
      </div>
      
      <Separator />
      
      {/* Navigation Menu */}
      <div className="flex-1 overflow-auto p-3 sm:p-4">
        <div className="space-y-4 sm:space-y-6">
          {/* Main Navigation */}
          <div>
            <h3 className="mb-2 sm:mb-3 font-medium text-foreground text-sm">Navigation</h3>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start gap-2 h-9 sm:h-10 text-sm">
                <Home className="h-4 w-4" />
                Home
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2 h-9 sm:h-10 text-sm">
                <TrendingUp className="h-4 w-4" />
                Popular
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2 h-9 sm:h-10 text-sm">
                <Heart className="h-4 w-4" />
                Favorites
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2 h-9 sm:h-10 text-sm">
                <User className="h-4 w-4" />
                Following
              </Button>
            </div>
          </div>

          <Separator />

          {/* Categories Filter */}
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <Filter className="h-4 w-4" />
              <h3 className="font-medium text-foreground text-sm">Categories</h3>
            </div>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start h-9 sm:h-10 text-sm">
                All Categories
                <Badge variant="secondary" className="ml-auto text-xs">
                  {artworks.length}
                </Badge>
              </Button>
              {categories.map((category) => {
                const count = artworks.filter(art => art.category === category).length;
                return (
                  <Button key={category} variant="ghost" className="w-full justify-start h-9 sm:h-10 text-sm">
                    <span className="truncate">{category}</span>
                    <Badge variant="secondary" className="ml-auto text-xs flex-shrink-0">
                      {count}
                    </Badge>
                  </Button>
                );
              })}
            </div>
          </div>

          <Separator />

          {/* Featured Artists */}
          <div>
            <h3 className="mb-2 sm:mb-3 font-medium text-foreground text-sm">Featured Artists</h3>
            <div className="space-y-1">
              {artists.slice(0, 6).map((artist) => {
                const count = artworks.filter(art => art.artist === artist).length;
                return (
                  <Button key={artist} variant="ghost" className="w-full justify-start h-9 sm:h-10 text-sm">
                    <User className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{artist}</span>
                    <Badge variant="outline" className="ml-auto text-xs flex-shrink-0">
                      {count}
                    </Badge>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 sm:p-4 border-t">
        <div className="text-center text-muted-foreground text-xs sm:text-sm">
          <p>&copy; 2025 Humo Gallery</p>
        </div>
      </div>
    </div>
  );
}