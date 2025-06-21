export interface Comment {
  id: string;
  parentId?: string; // For replies to other comments
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  replies?: Comment[]; // Nested replies
}

export interface Artwork {
  id: string;
  title: string;
  artist: string;
  avatar: string;
  categories: string[];
  imageUrl: string;
  width: number;
  height: number;
  likes: number;
  shares: number;
  description: string;
  caption: string;
  comments: Comment[];
}

export const artworks: Artwork[] = [
  {
    id: "1",
    title: "Cyberpunk Cityscape",
    artist: "Alex Chen",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format",
    categories: ["Digital Painting", "Cyberpunk", "Urban"],
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=800&fit=crop&auto=format",
    width: 600,
    height: 800,
    likes: 1247,
    shares: 89,
    description: "A neon-lit futuristic city with towering skyscrapers",
    caption: "Exploring the depths of a cyberpunk future where technology and humanity collide. Spent weeks perfecting the neon reflections and atmospheric depth. What do you think of this vision of tomorrow?",
    comments: [
      {
        id: "c1",
        user: { name: "Maya Rodriguez", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b7c0?w=40&h=40&fit=crop&crop=face&auto=format" },
        content: "Absolutely stunning work! The lighting effects are incredible.",
        timestamp: "2 hours ago",
        likes: 23,
        replies: [
          {
            id: "c1-1",
            parentId: "c1",
            user: { name: "Alex Chen", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format" },
            content: "Thank you Maya! I spent a lot of time studying real neon lighting to get it right.",
            timestamp: "1 hour ago",
            likes: 8,
            replies: [
              {
                id: "c1-1-1",
                parentId: "c1-1",
                user: { name: "Maya Rodriguez", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b7c0?w=40&h=40&fit=crop&crop=face&auto=format" },
                content: "It definitely shows! The attention to detail is remarkable.",
                timestamp: "45 minutes ago",
                likes: 3
              }
            ]
          },
          {
            id: "c1-2",
            parentId: "c1",
            user: { name: "Jordan Kim", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face&auto=format" },
            content: "I agree! The way the neon reflects off the wet pavement is chef's kiss",
            timestamp: "1.5 hours ago",
            likes: 12
          }
        ]
      },
      {
        id: "c2",
        user: { name: "Sam Wilson", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=40&h=40&fit=crop&crop=face&auto=format" },
        content: "This reminds me of Blade Runner. Amazing attention to detail!",
        timestamp: "4 hours ago",
        likes: 15,
        replies: [
          {
            id: "c2-1",
            parentId: "c2",
            user: { name: "River Park", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face&auto=format" },
            content: "Yes! Getting major Blade Runner 2049 vibes from this piece.",
            timestamp: "3 hours ago",
            likes: 7
          }
        ]
      }
    ]
  },
  {
    id: "2",
    title: "Abstract Portal",
    artist: "Maya Rodriguez",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b7c0?w=40&h=40&fit=crop&crop=face&auto=format",
    categories: ["3D Art", "Abstract", "Geometric"],
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&auto=format",
    width: 600,
    height: 600,
    likes: 892,
    shares: 45,
    description: "Geometric abstract art with vibrant colors",
    caption: "Diving into pure abstraction with this geometric portal. Each ring represents a different dimension of creativity.",
    comments: [
      {
        id: "c3",
        user: { name: "Jordan Kim", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face&auto=format" },
        content: "Love the color palette! How did you achieve this effect?",
        timestamp: "1 hour ago",
        likes: 8
      }
    ]
  },
  {
    id: "3",
    title: "Dragon's Realm",
    artist: "Sam Wilson",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=40&h=40&fit=crop&crop=face&auto=format",
    categories: ["Fantasy Art", "Creatures", "Landscape"],
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=900&fit=crop&auto=format",
    width: 600,
    height: 900,
    likes: 2156,
    shares: 234,
    description: "Epic fantasy landscape with mystical creatures",
    caption: "Welcome to the Dragon's Realm, where ancient magic still flows through the mountains and valleys. This piece took me 3 months to complete.",
    comments: [
      {
        id: "c4",
        user: { name: "Alex Chen", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format" },
        content: "Epic! The detail in the dragon scales is incredible.",
        timestamp: "30 minutes ago",
        likes: 42
      },
      {
        id: "c5",
        user: { name: "River Park", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face&auto=format" },
        content: "This would make an amazing book cover!",
        timestamp: "2 hours ago",
        likes: 18,
        replies: [
          {
            id: "c5-1",
            parentId: "c5",
            user: { name: "Sam Wilson", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=40&h=40&fit=crop&crop=face&auto=format" },
            content: "Thank you! I'm actually in talks with a publisher about that.",
            timestamp: "1 hour ago",
            likes: 15,
            replies: [
              {
                id: "c5-1-1",
                parentId: "c5-1",
                user: { name: "River Park", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face&auto=format" },
                content: "That's amazing! I'd definitely buy that book.",
                timestamp: "30 minutes ago",
                likes: 5
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "4",
    title: "Minimalist Portrait",
    artist: "Jordan Kim",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face&auto=format",
    categories: ["Digital Portrait", "Minimalist", "Portrait"],
    imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c1b4c1670?w=600&h=750&fit=crop&auto=format",
    width: 600,
    height: 750,
    likes: 678,
    shares: 32,
    description: "Clean, minimalist approach to digital portraiture",
    caption: "Sometimes less is more. Exploring the beauty of simplicity in portraiture.",
    comments: []
  },
  {
    id: "5",
    title: "Space Exploration",
    artist: "River Park",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face&auto=format",
    categories: ["Concept Art", "Sci-Fi", "Space Art"],
    imageUrl: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=600&h=400&fit=crop&auto=format",
    width: 600,
    height: 400,
    likes: 1834,
    shares: 156,
    description: "Futuristic space station design concept",
    caption: "Designing humanity's next home among the stars. This space station concept focuses on sustainable living in zero gravity.",
    comments: [
      {
        id: "c6",
        user: { name: "Nova Star", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face&auto=format" },
        content: "As a space enthusiast, this gives me chills! Beautiful work.",
        timestamp: "1 day ago",
        likes: 67
      }
    ]
  },
  {
    id: "6",
    title: "Underwater Paradise",
    artist: "Casey Blue",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face&auto=format",
    categories: ["Environment Art", "Nature Art", "Underwater"],
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=850&fit=crop&auto=format",
    width: 600,
    height: 850,
    likes: 1456,
    shares: 98,
    description: "Vibrant underwater coral reef ecosystem",
    caption: "Diving deep into an underwater paradise. Each coral was painted with love for our ocean's biodiversity.",
    comments: [
      {
        id: "c7",
        user: { name: "Taylor Green", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face&auto=format" },
        content: "The colors are so vibrant! Makes me want to go diving.",
        timestamp: "3 hours ago",
        likes: 12
      }
    ]
  },
  {
    id: "7",
    title: "Geometric Dreams",
    artist: "Taylor Green",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face&auto=format",
    categories: ["Abstract", "Geometric", "Mathematical"],
    imageUrl: "https://images.unsplash.com/photo-1551913902-c92207136625?w=600&h=600&fit=crop&auto=format",
    width: 600,
    height: 600,
    likes: 934,
    shares: 41,
    description: "Mathematical precision meets artistic expression",
    caption: "Where mathematics meets art. This piece explores the golden ratio and sacred geometry.",
    comments: []
  },
  {
    id: "8",
    title: "Character Study",
    artist: "Morgan Gray",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=40&h=40&fit=crop&crop=face&auto=format",
    categories: ["Character Design", "Animation", "Concept Art"],
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=800&fit=crop&auto=format",
    width: 600,
    height: 800,
    likes: 1123,
    shares: 73,
    description: "Detailed character design for animation",
    caption: "Character design for an upcoming animated series. Meet Zara, the fearless space explorer.",
    comments: [
      {
        id: "c8",
        user: { name: "Quinn Stone", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face&auto=format" },
        content: "Can't wait to see this character in action!",
        timestamp: "5 hours ago",
        likes: 25
      }
    ]
  },
  {
    id: "9",
    title: "Neon Night",
    artist: "Avery Silver",
    avatar: "https://images.unsplash.com/photo-1614583224978-f05ce51ef5fa?w=40&h=40&fit=crop&crop=face&auto=format",
    categories: ["Digital Painting", "Neon", "Night Scene"],
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=700&fit=crop&auto=format",
    width: 600,
    height: 700,
    likes: 1789,
    shares: 127,
    description: "Night scene with dramatic neon lighting",
    caption: "The city never sleeps, and neither do the neon dreams. Capturing the electric energy of midnight.",
    comments: []
  },
  {
    id: "10",
    title: "Botanical Study",
    artist: "Riley Forest",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face&auto=format",
    categories: ["Nature Art", "Botanical", "Digital Study"],
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=900&fit=crop&auto=format",
    width: 600,
    height: 900,
    likes: 756,
    shares: 34,
    description: "Detailed digital study of exotic plants",
    caption: "Nature's intricate designs inspire my art. This botanical study celebrates the complexity of plant life.",
    comments: [
      {
        id: "c9",
        user: { name: "Luna Moon", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face&auto=format" },
        content: "Beautiful attention to detail in every leaf!",
        timestamp: "6 hours ago",
        likes: 9
      }
    ]
  },
  {
    id: "11",
    title: "Mechanical Wings",
    artist: "Phoenix Steel",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face&auto=format",
    categories: ["Steampunk", "Mechanical", "Fantasy Art"],
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=650&fit=crop&auto=format",
    width: 600,
    height: 650,
    likes: 1567,
    shares: 89,
    description: "Intricate mechanical wing design",
    caption: "If da Vinci had steam engines... Exploring the intersection of nature and machinery.",
    comments: []
  },
  {
    id: "12",
    title: "Digital Sculpture",
    artist: "Quinn Stone",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face&auto=format",
    categories: ["3D Art", "Sculpture", "Modern"],
    imageUrl: "https://images.unsplash.com/photo-1551913902-c92207136625?w=600&h=750&fit=crop&auto=format",
    width: 600,
    height: 750,
    likes: 1098,
    shares: 52,
    description: "Modern digital sculpture with complex geometry",
    caption: "Sculpting in virtual space opens up infinite possibilities. This piece explores impossible geometries.",
    comments: []
  },
  {
    id: "13",
    title: "Cosmic Dance",
    artist: "Nova Star",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face&auto=format",
    categories: ["Space Art", "Cosmic", "Abstract"],
    imageUrl: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=600&h=500&fit=crop&auto=format",
    width: 600,
    height: 500,
    likes: 2234,
    shares: 178,
    description: "Cosmic phenomena in digital art form",
    caption: "Dancing with the cosmos. This piece captures the ethereal beauty of stellar formation.",
    comments: [
      {
        id: "c10",
        user: { name: "Sage Urban", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face&auto=format" },
        content: "This makes me feel so small yet so connected to the universe.",
        timestamp: "12 hours ago",
        likes: 45
      }
    ]
  },
  {
    id: "14",
    title: "Urban Legend",
    artist: "Sage Urban",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face&auto=format",
    categories: ["Street Art", "Urban", "Digital Art"],
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=800&fit=crop&auto=format",
    width: 600,
    height: 800,
    likes: 1445,
    shares: 94,
    description: "Digital interpretation of street art culture",
    caption: "Street art goes digital. Bringing the raw energy of urban culture into the digital realm.",
    comments: []
  },
  {
    id: "15",
    title: "Ethereal Beauty",
    artist: "Luna Moon",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face&auto=format",
    categories: ["Fantasy Portrait", "Portrait", "Ethereal"],
    imageUrl: "https://images.unsplash.com/photo-1558618047-3c8c1b4c1670?w=600&h=850&fit=crop&auto=format",
    width: 600,
    height: 850,
    likes: 1876,
    shares: 142,
    description: "Mystical portrait with ethereal lighting",
    caption: "Capturing the ethereal essence of dreams and magic. This portrait blends reality with fantasy.",
    comments: [
      {
        id: "c11",
        user: { name: "Phoenix Steel", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face&auto=format" },
        content: "Absolutely enchanting! The lighting is perfect.",
        timestamp: "8 hours ago",
        likes: 31
      }
    ]
  }
];