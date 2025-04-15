/**
 * Represents the status of a {@link Uffgabe task}.
 *
 * @remarks
 * This enum is used throughout the API to indicate the current state of a {@link Uffgabe task}.
 */
export enum TaskStatus {
  /** Task has not been started yet */
  PENDING = "PENDING",
  /** Task is currently in progress */
  LAEUFT = "In Progress",
  /** Task has been completed successfully */
  FERTIG = "Done",
  /** Task has failed or been cancelled */
  MIST = "Failed",
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
  UI_UI_UI = 4,
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace TaskStatus {
  /**
   * Converts a {@link TaskStatus} value to a human-readable string with docs.
   *
   * @param status - The {@link TaskStatus} to pretty-print.
   * @returns A string describing the purpose and value of the enum.
   */
  export function prettyPrintTaskStatus(status: TaskStatus): string {
    switch (status) {
      case TaskStatus.PENDING:
        return "Task has not been started yet (PENDING)";
      case TaskStatus.LAEUFT:
        return "Task is currently in progress (In Progress)";
      case TaskStatus.FERTIG:
        return "Task has been completed successfully (Done)";
      case TaskStatus.MIST:
        return "Task has failed or been cancelled (Failed)";
      default:
        return "Unknown TaskStatus";
    }
  }
}

TaskStatus.prettyPrintTaskStatus(TaskStatus.FERTIG);

/**
 * Contains helper functions for {@link Priority}
 */
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Priority {
  /**
   * Converts a {@link Priority} value to a human-readable string with docs.
   *
   * @param priority - The {@link Priority} to pretty-print.
   * @returns A string describing the purpose and value of the enum.
   */
  export function prettyPrintPriority(priority: Priority): string {
    switch (priority) {
      case Priority.WENIG:
        return "Low Priority (1)";
      case Priority.GEHT_SO:
        return "Medium Priority (2)";
      case Priority.SCHNELL:
        return "High Priority (3)";
      case Priority.UI_UI_UI:
        return "Critical (4)";
      default:
        return "Unknown Priority";
    }
  }
}

/**
 * Represents a user in the system.
 *
 * To find out more about the API, please see [The getting started guide](./docs/intro.md#getting-started).
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
 * Namespace Kerle provides functionalities to create  {@link Kerle} objects.
 *
 * @document docs/intro.md
 */
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Kerle {
  /**
   * Creates a new instance.
   * @example
   * ```
   * Kerle.create('123', 'John Doe', 'john@example.com', 'developer');
   * ```
   */
  export function create(
    id: string,
    name: string,
    email: string,
    role: string,
  ): Kerle {
    return {
      id,
      soi_name: name,
      internet_brief: email,
      role,
    };
  }
}

/**
 * Represents a task that can be assigned to a {@link Kerle user}.
 *
 * {@link Uffgabe}
 * {@link TaskStatus}
 * {@link taschg-maenaedscha!TaschgMaenaedscha}
 *
 * @typeParam T - The type of data associated with this task
 */
export interface Uffgabe<T = unknown> {
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
