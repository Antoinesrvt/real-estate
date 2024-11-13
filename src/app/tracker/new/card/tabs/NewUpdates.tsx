"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, MessageSquare, Target, Users } from "lucide-react";
import { GoalDetails } from "../../types";
import { formatDistance } from "date-fns";

import { fr } from "date-fns/locale";
import { Alert, AlertDescription } from "@/components/ui/alert";

type UpdateObjectType = "task" | "milestone" | "resource" | "event";

interface User {
  id: string;
  name: string;
  avatar: string;
  role?: string;
}

interface Mention {
  userId: string;
  offset: number;
  length: number;
}

interface Reaction {
  emoji: string;
  users: string[]; // userIds
}

// Type d'update générique
interface BaseUpdate {
  id: string;
  content: string;
  createdAt: string;
  author: User;
  mentions?: Mention[];
  reactions?: Reaction[];
  comments?: Comment[];
}

// Update lié à un objet spécifique (tâche, jalon, ressource)
interface ObjectUpdate extends BaseUpdate {
  type: Exclude<UpdateObjectType, "event">;
  objectId: string;
  objectTitle: string;
  objectIcon?: string;
}

// Update de type événement
interface EventUpdate extends BaseUpdate {
  type: "event";
  eventType: "team_update" | "metrics_change" | "goal_update";
  metadata: {
    previous?: any;
    current?: any;
    action?: string;
  };
}

type Update = ObjectUpdate | EventUpdate;

interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: string;
  mentions?: Mention[];
  reactions?: Reaction[];
}

interface UpdatesTabProps {
  goalDetails: {
    updates: Update[];
    team: User[];
  };
  selectedObject?: {
    type: UpdateObjectType;
    id: string;
    title: string;
  };
  onAddUpdate?: (update: Omit<Update, "id" | "createdAt">) => void;
  onAddComment?: (
    updateId: string,
    comment: Omit<Comment, "id" | "createdAt">
  ) => void;
  onAddReaction?: (updateId: string, emoji: string) => void;
  styles?: {
    background?: string;
    text?: string;
  };
}

const UpdatesTab: React.FC<UpdatesTabProps> = ({
  goalDetails,
  selectedObject,
  onAddUpdate,
  onAddComment,
  onAddReaction,
  styles,
}) => {
  const [newUpdate, setNewUpdate] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState<string | null>(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    }, []);

  if (!goalDetails?.updates) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Les mises à jour du projet ne sont pas disponibles.
          </AlertDescription>
        </Alert>
      );
    }

  // Filtrer les updates selon la sélection
  const filteredUpdates = useMemo(() => {
    if (!selectedObject) {
      return goalDetails.updates.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    return goalDetails.updates
      .filter((update) => {
        if (update.type === "event") return false;
        return (
          update.type === selectedObject.type &&
          update.objectId === selectedObject.id
        );
      })
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }, [goalDetails.updates, selectedObject]);

  const renderEventUpdate = (update: EventUpdate) => (
    <Card key={update.id} className="bg-white/5 border-white/10">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            {update.eventType === "team_update" ? (
              <Users className="h-4 w-4 text-white/60" />
            ) : update.eventType === "metrics_change" ? (
              <BarChart3 className="h-4 w-4 text-white/60" />
            ) : (
              <Target className="h-4 w-4 text-white/60" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium text-white">
                {update.author.name}
              </span>
              <span className="text-white/40 text-sm">
                {mounted ? (
                  formatDistance(new Date(update.createdAt), new Date(), {
                    addSuffix: true,
                    locale: fr,
                  })
                ) : (
                  <span>Chargement...</span>
                )}
              </span>
            </div>
            <p className="text-white/80">{update.content}</p>
            {update.metadata && (
              <div className="mt-2 p-2 rounded bg-white/5">
                {/* Rendu personnalisé selon le type d'événement */}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderObjectUpdate = (update: ObjectUpdate) => (
    <Card key={update.id} className="bg-white/5 border-white/10">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <img
            src={update.author.avatar}
            alt={update.author.name}
            className="w-8 h-8 rounded-full"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-white">
                {update.author.name}
              </span>
              <span className="text-white/40 text-sm">
                {formatDistance(new Date(update.createdAt), new Date(), {
                  addSuffix: true,
                  locale: fr,
                })}
              </span>
            </div>

            {!selectedObject && (
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    update.type === "task"
                      ? "bg-blue-500/20 text-blue-400"
                      : update.type === "milestone"
                      ? "bg-purple-500/20 text-purple-400"
                      : "bg-emerald-500/20 text-emerald-400"
                  }`}
                >
                  {update.objectTitle}
                </span>
              </div>
            )}

            <p className="text-white/80 whitespace-pre-wrap">
              {update.content}
            </p>

            {/* Réactions */}
            {update.reactions && update.reactions.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {update.reactions.map((reaction, index) => (
                  <button
                    key={index}
                    className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 hover:bg-white/10"
                    onClick={() => onAddReaction?.(update.id, reaction.emoji)}
                  >
                    <span>{reaction.emoji}</span>
                    <span className="text-sm text-white/60">
                      {reaction.users.length}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Commentaires */}
            {update.comments && update.comments.length > 0 && (
              <div className="mt-4 space-y-3 pl-4 border-l border-white/10">
                {update.comments.map((comment) => (
                  <div key={comment.id} className="space-y-1">
                    <div className="flex items-center gap-2">
                      <img
                        src={comment.author.avatar}
                        alt={comment.author.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="font-medium text-sm text-white">
                        {comment.author.name}
                      </span>
                      <span className="text-white/40 text-xs">
                        {formatDistance(
                          new Date(comment.createdAt),
                          new Date(),
                          {
                            addSuffix: true,
                            locale: fr,
                          }
                        )}
                      </span>
                    </div>
                    <p className="text-sm text-white/80">{comment.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header avec filtres si nécessaire */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">
          {selectedObject
            ? `Historique - ${selectedObject.title}`
            : "Fil d'actualité"}
        </h3>
        <button
          className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2
          ${styles?.background} ${styles?.text}`}
          onClick={() => {
            /* Logic d'ajout */
          }}
        >
          <MessageSquare className="h-4 w-4" />
          <span>Nouvelle mise à jour</span>
        </button>
      </div>

      {/* Timeline des updates */}
      <div className="space-y-4">
        {filteredUpdates.map((update) =>
          update.type === "event"
            ? renderEventUpdate(update)
            : renderObjectUpdate(update)
        )}
      </div>
    </div>
  );
};

export default UpdatesTab;
