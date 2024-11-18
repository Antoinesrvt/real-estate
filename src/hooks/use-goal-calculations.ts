import { useMemo } from 'react';
import { Goal, Connection, Position, GoalType } from '@/types/goals';

const CARD_WIDTH = 264;
const CARD_HEIGHT = 120;
const HORIZONTAL_GAP = 120;
const VERTICAL_GAP = 80;

interface SectionLabel {
  type: GoalType;
  position: Position;
}

interface CalculatedConnection extends Connection {
  source: Position;
  target: Position;
}

export function useGoalCalculations(goals: Goal[]) {
  return useMemo(() => {
    // Group goals by type and calculate positions
    const typeGroups = goals.reduce((acc, goal) => {
      if (!acc[goal.type]) acc[goal.type] = [];
      acc[goal.type].push(goal);
      return acc;
    }, {} as Record<GoalType, Goal[]>);

    // Calculate dimensions and positions
    const types: GoalType[] = ['fondation', 'action', 'strategie', 'vision'];
    let maxRowCount = 0;
    
    // Calculate positions for each goal
    const goalsWithPositions = goals.map(goal => {
      const typeIndex = types.indexOf(goal.type);
      const goalsInType = typeGroups[goal.type];
      const rowIndex = goalsInType.indexOf(goal);
      maxRowCount = Math.max(maxRowCount, goalsInType.length);

      const position = {
        x: typeIndex * (CARD_WIDTH + HORIZONTAL_GAP),
        y: rowIndex * (CARD_HEIGHT + VERTICAL_GAP)
      };

      return { ...goal, position };
    });

    // Calculate section labels
    const sectionLabels: SectionLabel[] = types.map((type, index) => ({
      type,
      position: {
        x: index * (CARD_WIDTH + HORIZONTAL_GAP),
        y: -VERTICAL_GAP
      }
    }));

    // Process connections with proper type filtering
    const connections: CalculatedConnection[] = goalsWithPositions
      .flatMap(goal =>
        goal.connections.map(conn => {
          const target = goalsWithPositions.find(g => g.id === conn.targetId);
          if (!target?.position || !goal.position) return null;

          return {
            ...conn,
            source: goal.position,
            target: target.position,
            type: goal.type
          };
        })
      )
      .filter((conn): conn is CalculatedConnection => conn !== null);

    const dimensions = {
      width: (types.length - 1) * (CARD_WIDTH + HORIZONTAL_GAP),
      height: (maxRowCount - 1) * (CARD_HEIGHT + VERTICAL_GAP)
    };

    return {
      goalsWithPositions,
      sectionLabels,
      connections,
      dimensions
    };
  }, [goals]);
} 