"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistance } from "date-fns";
import { fr } from "date-fns/locale";
import {
  MessageSquare,
  Plus,
  Image as ImageIcon,
  Link,
  Smile,
  MoreVertical,
  Clock,
  AtSign,
  Send,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { UpdatesTabProps, Update, UpdateAttachment, User } from "../../types";

const NewUpdates: React.FC<UpdatesTabProps> = ({
  goalDetails,
  onAddUpdate,
  onEditUpdate,
  onDeleteUpdate,
  onAddReaction,
  onRemoveReaction,
  onAddAttachment,
  onRemoveAttachment,
}) => {
  const [newUpdateContent, setNewUpdateContent] = useState("");
  const [editingUpdate, setEditingUpdate] = useState<Update | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [mentionQuery, setMentionQuery] = useState("");
  const [showMentionSuggestions, setShowMentionSuggestions] = useState(false);
  const [mounted, setMounted] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!goalDetails?.updates || !goalDetails.team) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Les mises à jour ne sont pas disponibles pour le moment.
        </AlertDescription>
      </Alert>
    );
  }

  const handleSubmitUpdate = () => {
    if (!newUpdateContent.trim()) return;

    const newUpdate = {
      content: newUpdateContent,
      author: "Current User", // This should come from auth context
      type: "comment" as const,
    };

    onAddUpdate?.(newUpdate);
    setNewUpdateContent("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "@") {
      setShowMentionSuggestions(true);
      setMentionQuery("");
    }
  };

  const handleMentionSelect = (user: User) => {
    if (textareaRef.current) {
      const currentContent = textareaRef.current.value;
      const lastAtIndex = currentContent.lastIndexOf("@");
      const newContent =
        currentContent.substring(0, lastAtIndex) +
        `@${user.name} ` +
        currentContent.substring(lastAtIndex + mentionQuery.length + 1);
      setNewUpdateContent(newContent);
    }
    setShowMentionSuggestions(false);
  };

  const filteredTeamMembers = goalDetails.team.filter((member) =>
    member.name.toLowerCase().includes(mentionQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* New Update Input */}
      <Card className="bg-white/5 border-white/10">
        <CardContent className="p-4">
          <div className="space-y-4">
            <Textarea
              ref={textareaRef}
              placeholder="Partagez une mise à jour..."
              value={newUpdateContent}
              onChange={(e) => setNewUpdateContent(e.target.value)}
              onKeyDown={handleKeyPress}
              className="bg-transparent border-none resize-none text-white placeholder:text-white/40 focus-visible:ring-0"
            />
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white/60 hover:text-white hover:bg-white/10"
                >
                  <ImageIcon className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white/60 hover:text-white hover:bg-white/10"
                >
                  <Link className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white/60 hover:text-white hover:bg-white/10"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  <Smile className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white/60 hover:text-white hover:bg-white/10"
                  onClick={() => setShowMentionSuggestions(true)}
                >
                  <AtSign className="h-5 w-5" />
                </Button>
              </div>
              <Button
                onClick={handleSubmitUpdate}
                className="bg-white/10 hover:bg-white/20 text-white"
              >
                <Send className="h-4 w-4 mr-2" />
                Publier
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Updates List */}
      <div className="space-y-4">
        {goalDetails.updates.map((update) => (
          <motion.div
            key={update.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white">
                        {update.author}
                      </span>
                      <span className="text-white/40 text-sm">
                        {mounted
                          ? formatDistance(new Date(update.date), new Date(), {
                              addSuffix: true,
                              locale: fr,
                            })
                          : "Chargement..."}
                      </span>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white/40 hover:text-white"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="bg-slate-800 border-white/10"
                    >
                      <DropdownMenuItem
                        onClick={() => setEditingUpdate(update)}
                        className="text-white/80 focus:text-white focus:bg-white/10"
                      >
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-white/10" />
                      <DropdownMenuItem
                        onClick={() => onDeleteUpdate?.(update.id)}
                        className="text-red-400 focus:text-red-400 focus:bg-white/10"
                      >
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <p className="text-white/80 mt-2">{update.content}</p>

                {/* Attachments */}
                {update.attachments && update.attachments.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {update.attachments.map((attachment) => (
                      <div
                        key={attachment.id}
                        className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-white/60 text-sm"
                      >
                        {attachment.type === "image" ? (
                          <ImageIcon className="h-4 w-4" />
                        ) : (
                          <Link className="h-4 w-4" />
                        )}
                        {attachment.name}
                      </div>
                    ))}
                  </div>
                )}

                {/* Reactions */}
                {update.reactions && update.reactions.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {update.reactions.map((reaction) => (
                      <button
                        key={reaction.id}
                        onClick={() =>
                          reaction.users.includes("currentUserId")
                            ? onRemoveReaction?.(update.id, reaction.emoji)
                            : onAddReaction?.(update.id, reaction.emoji)
                        }
                        className={`px-2 py-1 rounded-full text-sm ${
                          reaction.users.includes("currentUserId")
                            ? "bg-white/20 text-white"
                            : "bg-white/5 text-white/60"
                        } hover:bg-white/20 transition-colors`}
                      >
                        {reaction.emoji} {reaction.count}
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Mention Suggestions */}
      <AnimatePresence>
        {showMentionSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full left-0 w-64 bg-slate-800 border border-white/10 rounded-lg shadow-xl overflow-hidden"
          >
            {filteredTeamMembers.map((member) => (
              <button
                key={member.id}
                onClick={() => handleMentionSelect(member)}
                className="w-full px-4 py-2 text-left hover:bg-white/10 text-white/80 hover:text-white"
              >
                {member.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NewUpdates;
