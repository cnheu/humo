import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Heart, Share, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Artwork, Comment } from "../data/artworks";

interface ArtworkModalProps {
  artwork: Artwork | null;
  isOpen: boolean;
  onClose: () => void;
}

interface CommentItemProps {
  comment: Comment;
  depth?: number;
  onReply: (commentId: string, parentId?: string) => void;
}

function CommentItem({ comment, depth = 0, onReply }: CommentItemProps) {
  const maxDepth = 2; // Limit to 2 levels of nesting
  const indentClass = depth === 0 ? "" : depth === 1 ? "ml-6" : "ml-12";
  
  return (
    <div className={`${indentClass}`}>
      <div className="flex gap-3">
        <Avatar className="w-6 h-6 flex-shrink-0">
          <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
          <AvatarFallback className="text-xs">
            {comment.user.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 mb-1">
            <span className="font-medium text-sm">{comment.user.name}</span>
            <Button variant="ghost" size="sm" className="h-auto p-0 ml-auto">
              <MoreHorizontal className="w-3 h-3" />
            </Button>
          </div>
          <p className="text-sm text-foreground leading-relaxed mb-2">
            {comment.content}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>{comment.timestamp}</span>
            <Button variant="ghost" size="sm" className="h-auto p-0 text-xs">
              <Heart className="w-3 h-3 mr-1" />
              {comment.likes > 0 && comment.likes}
            </Button>
            {depth < maxDepth && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-auto p-0 text-xs"
                onClick={() => onReply(comment.id, comment.parentId)}
              >
                reply
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Render nested replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-3 space-y-3">
          {comment.replies.map((reply) => (
            <CommentItem 
              key={reply.id} 
              comment={reply} 
              depth={depth + 1}
              onReply={onReply}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function ArtworkModal({ artwork, isOpen, onClose }: ArtworkModalProps) {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [isCommentInputExpanded, setIsCommentInputExpanded] = useState(false);
  const [commentText, setCommentText] = useState("");

  if (!artwork) return null;

  const formatNumber = (num: number) => {
    if (num > 999) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toLocaleString();
  };

  const handleReply = (commentId: string, parentId?: string) => {
    setReplyingTo(commentId);
    // Here you would typically open a reply input or focus on a reply text area
    console.log(`Replying to comment: ${commentId}, parent: ${parentId}`);
  };

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      // Here you would typically submit the comment to your backend
      console.log("Submitting comment:", commentText);
      setCommentText("");
      setIsCommentInputExpanded(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleCommentSubmit();
    }
  };

  // Calculate total comment count including all nested replies
  const getTotalCommentCount = (comments: Comment[]): number => {
    return comments.reduce((count, comment) => {
      return count + 1 + (comment.replies ? getTotalCommentCount(comment.replies) : 0);
    }, 0);
  };

  const totalComments = getTotalCommentCount(artwork.comments);
  const totalShares = artwork.shares;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl w-[95vw] min-w-[720px] max-h-[90vh] h-[90vh] p-0 gap-0 bg-black overflow-hidden">
        {/* Accessibility components - visually hidden */}
        <DialogTitle className="sr-only">{artwork.title} by {artwork.artist}</DialogTitle>
        <DialogDescription className="sr-only">
          Artwork details including image, artist information, categories, comments, and interaction options.
        </DialogDescription>
        
        
        <div className="flex h-full">
          {/* Left side - Image (larger) */}
          <div className="flex-1 bg-black flex items-center justify-center min-h-0 max-h-[90vh]">
            <ImageWithFallback
              src={artwork.imageUrl}
              alt={artwork.title}
              className="max-w-full max-h-full object-contain block m-auto"
            />
          </div>
          
          {/* Right side - Details (narrower) */}
          <div className="w-96 flex flex-col bg-background border-l h-full">
            {/* Fixed Header - User info */}
            <div className="flex-shrink-0 p-4 border-b">
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={artwork.avatar} alt={artwork.artist} />
                  <AvatarFallback className="text-xs">{artwork.artist.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{artwork.artist}</div>
                </div>
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-1 rounded-full text-xs">
                  关注
                </Button>
              </div>
            </div>
            
            {/* Scrollable Middle Section */}
            <div className="flex-1 flex flex-col min-h-0">
              <ScrollArea className="flex-1">
                <div className="space-y-0">
                  {/* Content - Description and tags */}
                  <div className="p-4 border-b">
                    <p className="text-sm leading-relaxed mb-3">
                      {artwork.caption}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {artwork.categories.map((category) => (
                        <span key={category} className="text-xs text-blue-600 hover:underline cursor-pointer">
                          #{category}
                        </span>
                      ))}
                    </div>
                    
                    {/* Timestamp and location */}
                    <div className="text-xs text-muted-foreground">
                      06-09 上海
                    </div>
                  </div>
                  
                  {/* Comments count */}
                  <div className="px-4 py-2 border-b">
                    <div className="text-sm text-muted-foreground">
                      共 {totalComments}+ 条评论
                    </div>
                  </div>
                  
                  {/* Comments */}
                  <div className="p-4 pb-6 max-h-96 overflow-y-auto">
                    <div className="space-y-4">
                      {artwork.comments.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground text-sm">
                          No comments yet. Be the first to comment!
                        </div>
                      ) : (
                        artwork.comments.map((comment) => (
                          <CommentItem 
                            key={comment.id} 
                            comment={comment} 
                            onReply={handleReply}
                          />
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </div>
            
            {/* Fixed Bottom Section */}
            <div className="flex-shrink-0 bg-background border-t">
              <div className="p-4">
                {!isCommentInputExpanded ? (
                  /* Single div containing comment button + total likes + total comments + total shares */
                  <div className="flex items-center gap-2">
                    {/* Comment button */}
                    <Button
                      variant="ghost"
                      className="flex-1 h-9 justify-start px-3 bg-input-background hover:bg-muted border border-border rounded-lg text-muted-foreground text-left min-w-0"
                      onClick={() => setIsCommentInputExpanded(true)}
                    >
                      <MessageCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="text-sm truncate">Add a comment...</span>
                    </Button>
                    
                    {/* Stats container */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {/* Total likes */}
                      <Button variant="ghost" size="sm" className="flex items-center gap-1 p-1 h-auto text-xs">
                        <Heart className="w-3 h-3" />
                        <span>{formatNumber(artwork.likes)}</span>
                      </Button>
                      
                      {/* Total comments */}
                      <Button variant="ghost" size="sm" className="flex items-center gap-1 p-1 h-auto text-xs">
                        <MessageCircle className="w-3 h-3" />
                        <span>{totalComments}</span>
                      </Button>
                      
                      {/* Total shares */}
                      <Button variant="ghost" size="sm" className="flex items-center gap-1 p-1 h-auto text-xs">
                        <Share className="w-3 h-3" />
                        <span>{totalShares}</span>
                      </Button>
                    </div>
                  </div>
                ) : (
                  /* Expanded comment input */
                  <div className="space-y-3">
                    <div className="flex items-end gap-2">
                      <div className="flex-1">
                        <Input
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Add a comment..."
                          className="resize-none border-border"
                          autoFocus
                          onBlur={() => {
                            if (!commentText.trim()) {
                              setIsCommentInputExpanded(false);
                            }
                          }}
                        />
                      </div>
                      <Button
                        size="sm"
                        onClick={handleCommentSubmit}
                        disabled={!commentText.trim()}
                        className="px-3 py-2"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    {/* Stats row when expanded */}
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" className="flex items-center gap-1 p-1 h-auto text-xs">
                        <Heart className="w-3 h-3" />
                        <span>{formatNumber(artwork.likes)}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1 p-1 h-auto text-xs">
                        <MessageCircle className="w-3 h-3" />
                        <span>{totalComments}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1 p-1 h-auto text-xs">
                        <Share className="w-3 h-3" />
                        <span>{totalShares}</span>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}