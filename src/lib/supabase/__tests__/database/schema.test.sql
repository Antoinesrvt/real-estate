BEGIN;
SELECT plan(45); -- Increased number of tests

-- Test ENUM types
SELECT has_type('goal_status', 'Goal status enum exists');
SELECT has_type('task_status', 'Task status enum exists');
SELECT has_type('task_priority', 'Task priority enum exists');
SELECT has_type('resource_type', 'Resource type enum exists');
SELECT has_type('team_role', 'Team role enum exists');
SELECT has_type('update_type', 'Update type enum exists');
SELECT has_type('audit_action', 'Audit action enum exists');
SELECT has_type('goal_type', 'Goal type enum exists');

-- Test core tables structure
SELECT has_table('organizations');
SELECT has_table('workspaces');
SELECT has_table('goals');
SELECT has_table('goal_configs');
SELECT has_table('tasks');
SELECT has_table('milestones');
SELECT has_table('resources');
SELECT has_table('metrics');
SELECT has_table('notifications');
SELECT has_table('goal_templates');

-- Test indexes
SELECT has_index('goals', 'idx_goals_fts');
SELECT has_index('tasks', 'idx_tasks_fts');
SELECT has_index('resources', 'idx_resources_fts');

SELECT * FROM finish();
ROLLBACK; 