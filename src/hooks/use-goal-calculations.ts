import { useMemo } from 'react';
import { Goal } from '@/app/tracker/types/goals';
import { CARD_WIDTH, CARD_HEIGHT, HORIZONTAL_GAP, VERTICAL_GAP } from '@/app/tracker/new/constants';

const SECTION_TYPES = ["fondation", "action", "strategie", "vision"] as const;

export function useGoalCalculations(goals: Goal[]) {
  return useMemo(() => {
    // Group goals by type
    const goalsByType = SECTION_TYPES.reduce((acc, type) => {
      acc[type] = goals.filter(goal => goal.type === type);
      return acc;
    }, {} as Record<string, Goal[]>);

    // Calculate max height for vertical centering
    const maxGoalsInSection = Math.max(...Object.values(goalsByType).map(g => g.length));
    const totalHeight = maxGoalsInSection * (CARD_HEIGHT + VERTICAL_GAP);

    // Calculate positions for each goal
    const goalsWithPositions = goals.map(goal => {
      const typeIndex = SECTION_TYPES.indexOf(goal.type);
      const goalsOfSameType = goalsByType[goal.type];
      const goalIndexInType = goalsOfSameType.findIndex(g => g.id === goal.id);
      const sectionStartY = -totalHeight / 2; // Center vertically

      return {
        ...goal,
        position: {
          x: typeIndex * (CARD_WIDTH + HORIZONTAL_GAP),
          y: sectionStartY + goalIndexInType * (CARD_HEIGHT + VERTICAL_GAP),
        },
      };
    });

    // Calculate section labels positions
    const sectionLabels = SECTION_TYPES.map((type, index) => ({
      type,
      position: {
        x: index * (CARD_WIDTH + HORIZONTAL_GAP),
        y: -totalHeight / 2 - 60, // Above the cards
      },
    }));

    // Calculate connections with better curves
    const connections = goals.flatMap(goal => 
      goal.connections.map(targetId => {
        const source = goalsWithPositions.find(g => g.id === goal.id);
        const target = goalsWithPositions.find(g => g.id === targetId);
        if (!source || !target) return null;

        // Calculate connection points
        const startX = source.position.x + CARD_WIDTH;
        const startY = source.position.y + CARD_HEIGHT / 2;
        const endX = target.position.x;
        const endY = target.position.y + CARD_HEIGHT / 2;

        // Calculate control points for a smooth curve
        const distance = endX - startX;
        const controlPoint1X = startX + distance * 0.4;
        const controlPoint2X = endX - distance * 0.4;

        return {
          id: `${goal.id}-${targetId}`,
          source: { x: startX, y: startY },
          target: { x: endX, y: endY },
          control1: { x: controlPoint1X, y: startY },
          control2: { x: controlPoint2X, y: endY },
          type: goal.type,
        };
      }).filter(Boolean)
    );

    return {
      goalsWithPositions,
      sectionLabels,
      connections,
      dimensions: {
        width: (SECTION_TYPES.length * (CARD_WIDTH + HORIZONTAL_GAP)) - HORIZONTAL_GAP,
        height: totalHeight,
      },
    };
  }, [goals]);
} 