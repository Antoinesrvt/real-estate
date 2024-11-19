BEGIN;
SELECT plan(30);

-- Test organization policies
SELECT results_eq(
  'SELECT count(*) FROM organizations WHERE user_id = auth.uid()',
  ARRAY[1],
  'Organization owner can see their organizations'
);

-- Test workspace policies
SELECT results_eq(
  'SELECT count(*) FROM workspaces w 
   JOIN team_assignments ta ON ta.assignable_type = ''workspace'' AND ta.assignable_id = w.id
   WHERE ta.user_id = auth.uid()',
  ARRAY[1],
  'User can see workspaces they are assigned to'
);

-- Test goal connection policies
SELECT results_eq(
  'SELECT count(*) FROM goal_connections gc
   WHERE EXISTS (
     SELECT 1 FROM goals g
     JOIN team_assignments ta ON ta.assignable_type = ''goal'' AND ta.assignable_id = g.id
     WHERE ta.user_id = auth.uid()
     AND g.id IN (gc.source_goal_id, gc.target_goal_id)
   )',
  ARRAY[1],
  'User can see goal connections they have access to'
);

-- Test notification policies
SELECT results_eq(
  'SELECT count(*) FROM notifications WHERE user_id = auth.uid()',
  ARRAY[1],
  'User can see their notifications'
);

-- Test goal template policies
SELECT results_eq(
  'SELECT count(*) FROM goal_templates gt
   WHERE organization_id IN (
     SELECT assignable_id FROM team_assignments
     WHERE user_id = auth.uid()
     AND assignable_type = ''organization''
   )',
  ARRAY[1],
  'User can see goal templates in their organization'
);

-- Test audit log access policies
SELECT results_eq(
  'SELECT count(*) FROM audit.logs
   WHERE EXISTS (
     SELECT 1 FROM team_assignments ta
     WHERE ta.user_id = auth.uid()
     AND ta.role IN (''owner'', ''admin'')
   )',
  ARRAY[1],
  'Admin can access audit logs'
);

SELECT * FROM finish();
ROLLBACK; 