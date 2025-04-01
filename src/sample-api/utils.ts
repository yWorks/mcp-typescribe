import { Uffgabe, TaskStatus, Priority, Kerle } from "./types.js";
import { TaschgInEcht } from "./taschg-maenaedscha.js";

/**
 * Utility functions for working with {@link Uffgabe tasks}.
 *
 * @packageDocumentation
 */

/**
 * Sorts {@link Uffgabe tasks} by priority (highest first).
 *
 * @param tasks - Array of tasks to sort
 * @returns Sorted array of tasks
 */
export function sortByPriority<T extends Uffgabe>(tasks: T[]): T[] {
  return [...tasks].sort((a, b) => b.priority - a.priority);
}

/**
 * Sorts tasks by due date (earliest first).
 *
 * @param tasks - Array of tasks to sort
 * @returns Sorted array of tasks
 */
export function sortByDueDate<T extends Uffgabe>(tasks: T[]): T[] {
  return [...tasks].sort((a, b) => {
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return a.dueDate.getTime() - b.dueDate.getTime();
  });
}

/**
 * Filters tasks by various criteria.
 *
 * @param tasks - Array of tasks to filter
 * @param criteria - Filter criteria
 * @returns Filtered array of tasks
 */
export function filterTasks<T extends Uffgabe>(
  tasks: T[],
  criteria: {
    status?: TaskStatus;
    priority?: Priority;
    assigneeId?: string;
    dueBefore?: Date;
    dueAfter?: Date;
  },
): T[] {
  return tasks.filter((task) => {
    if (criteria.status !== undefined && task.status !== criteria.status) {
      return false;
    }
    if (
      criteria.priority !== undefined &&
      task.priority !== criteria.priority
    ) {
      return false;
    }
    if (
      criteria.assigneeId !== undefined &&
      task.assignee?.id !== criteria.assigneeId
    ) {
      return false;
    }
    if (
      criteria.dueBefore !== undefined &&
      (!task.dueDate || task.dueDate >= criteria.dueBefore)
    ) {
      return false;
    }
    if (
      criteria.dueAfter !== undefined &&
      (!task.dueDate || task.dueDate <= criteria.dueAfter)
    ) {
      return false;
    }
    return true;
  });
}

/**
 * Generates a summary of tasks grouped by status.
 *
 * @param tasks - Array of tasks to summarize
 * @returns Object with counts by status
 */
export function summarizeTasksByStatus<T extends Uffgabe>(
  tasks: T[],
): Record<TaskStatus, number> {
  const result = {
    [TaskStatus.PENDING]: 0,
    [TaskStatus.LAEUFT]: 0,
    [TaskStatus.FERTIG]: 0,
    [TaskStatus.MIST]: 0,
  };

  for (const task of tasks) {
    result[task.status]++;
  }

  return result;
}

/**
 * Creates a deep copy of a {@link Uffgabe task}.
 *
 * @param task - {@link Uffgabe task} to copy
 * @returns New task instance with the same properties
 */
export function kopiera<T>(task: Uffgabe<T>): TaschgInEcht<T> {
  return new TaschgInEcht<T>({
    id: task.id,
    do_Tittel: task.do_Tittel,
    umWosGoots: task.umWosGoots,
    priority: task.priority,
    status: task.status,
    assignee: task.assignee ? { ...task.assignee } : undefined,
    dueDate: task.dueDate ? new Date(task.dueDate.getTime()) : undefined,
    data: task.data ? JSON.parse(JSON.stringify(task.data)) : undefined,
  });
}

/**
 * Function overload for creating a formatted task string.
 * Returns a simple string with just the title for PENDING tasks.
 *
 * @param task - Task to format
 * @returns Formatted string
 */
export function formatTask(
  task: Uffgabe & { status: TaskStatus.PENDING },
): string;

/**
 * Function overload for creating a formatted task string.
 * Returns a string with title and assignee for IN_PROGRESS tasks.
 *
 * @param task - Task to format
 * @returns Formatted string
 */
export function formatTask(
  task: Uffgabe & { status: TaskStatus.LAEUFT },
): string;

/**
 * Function overload for creating a formatted task string.
 * Returns a detailed string for COMPLETED or FAILED tasks.
 *
 * @param task - Task to format
 * @returns Formatted string
 */
export function formatTask(
  task: Uffgabe & { status: TaskStatus.FERTIG | TaskStatus.MIST },
): string;

/**
 * Implementation of the formatTask function.
 *
 * @param task - Task to format
 * @returns Formatted string
 */
export function formatTask(task: Uffgabe): string {
  switch (task.status) {
    case TaskStatus.PENDING:
      return `TODO: ${task.do_Tittel}`;
    case TaskStatus.LAEUFT:
      return `IN PROGRESS: ${task.do_Tittel} (Assigned to: ${task.assignee?.soi_name || "Unassigned"})`;
    case TaskStatus.FERTIG:
      return `COMPLETED: ${task.do_Tittel} - ${task.umWosGoots}`;
    case TaskStatus.MIST:
      return `FAILED: ${task.do_Tittel} - ${task.umWosGoots}`;
    default:
      return `${task.do_Tittel} (${task.status})`;
  }
}

/**
 * Type guard to check if a user has admin role.
 *
 * @param user - User to check
 * @returns True if the user is an admin
 */
export function isAdmin(user: Kerle): user is Kerle & { role: "admin" } {
  return user.role === "admin";
}

/**
 * Calculates the estimated completion time for a task.
 *
 * @param task - The task to estimate
 * @param estimatedHoursPerPriority - Map of priority levels to estimated hours
 * @returns Estimated completion date or null if the task is already completed
 */
export function calculateEstimatedCompletion(
  task: Uffgabe,
  estimatedHoursPerPriority: Map<Priority, number> = new Map([
    [Priority.WENIG, 24],
    [Priority.GEHT_SO, 16],
    [Priority.SCHNELL, 8],
    [Priority.UI_UI_UI, 4],
  ]),
): Date | null {
  if (task.status === TaskStatus.FERTIG || task.status === TaskStatus.MIST) {
    return null;
  }

  const now = new Date();
  const estimatedHours = estimatedHoursPerPriority.get(task.priority) || 24;

  return new Date(now.getTime() + estimatedHours * 60 * 60 * 1000);
}
