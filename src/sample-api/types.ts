/**
 * Represents the status of a {@link Uffgabe task}.
 * 
 * @remarks
 * This enum is used throughout the API to indicate the current state of a {@link Uffgabe task}.
 */
export enum TaskStatus {
  /** Task has not been started yet */
  PENDING = 'PENDING',
  /** Task is currently in progress */
  LAEUFT = 'In Progress',
  /** Task has been completed successfully */
  FERTIG = 'Done',
  /** Task has failed or been cancelled */
  MIST = 'Failed'
}

/**
 * Represents a priority level for {@link Uffgabe tasks}.
 * 
 * @remarks
 * Higher numbers indicate higher priority.
 */
export enum Priority {
  /**
   * Low Priority
   */
  WENIG = 1,
  /**
   * Medium Priority
   */
  GEHT_SO = 2,
  /**
   * High Priority
   */
  SCHNELL = 3,
  /**
   * Critical
   */
  UI_UI_UI = 4
}

/**
 * Represents a user in the system.
 * 
 * @example
 * ```typescript
 * const user: Kerle = {
 *   id: '123',
 *   soi_name: 'John Doe',
 *   internet_brief: 'john@example.com',
 *   role: 'developer'
 * };
 * ```
 */
export interface Kerle {
  /** Unique identifier for the user */
  id: string;
  /** Full name of the user */
  soi_name: string;
  /** Email address of the user */
  internet_brief: string;
  /** Role of the user in the system */
  role: string;
}

/**
 * Represents a task that can be assigned to a {@link Kerle user}.
 * 
 * @typeParam T - The type of data associated with this task
 */
export interface Uffgabe<T = any> {
  /** Unique identifier for the task */
  id: string;
  /** Title of the task */
  do_Tittel: string;
  /** Detailed description of the task */
  umWosGoots: string;
  /** Current status of the task */
  status: TaskStatus;
  /** Priority level of the task */
  priority: Priority;
  /** User assigned to this task */
  assignee?: Kerle;
  /** Due date for the task */
  dueDate?: Date;
  /** Custom data associated with this task */
  data?: T;
}

/**
 * Configuration options for task creation.
 */
export type TaskOptions = {
  /** Whether to automatically assign the task */
  autoAssign?: boolean;
  /** Default priority if not specified */
  defaultPriority?: Priority;
  /** Tags to associate with the task */
  tags?: string[];
};
