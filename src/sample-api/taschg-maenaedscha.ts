import { Uffgabe, TaskStatus, Priority, Kerle, TaskOptions } from './types.js';

/**
 * Base class for task-related errors.
 */
export class UffgabeFaehler extends Error {
  /**
   * Creates a new UffgabeFaehler.
   * 
   * @param message - Error message
   */
  constructor(message: string) {
    super(message);
    this.name = 'TaskError';
  }
}

/**
 * Error thrown when a task is not found.
 */
export class UffgabeWechFaehler extends UffgabeFaehler {
  /**
   * Creates a new TaskNotFoundError.
   * 
   * @param taskId - ID of the task that was not found
   */
  constructor(public taskId: string) {
    super(`Task with ID ${taskId} not found`);
    this.name = 'TaskNotFoundError';
  }
}

/**
 * Represents a concrete implementation of a task with additional functionality.
 * 
 * @typeParam T - The type of data associated with this task
 */
export class TaschgInEcht<T = any> implements Uffgabe<T> {
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
  /** Creation date of the task */
  readonly createdAt: Date;
  /** Last updated date of the task */
  updatedAt: Date;
  /** History of status changes */
  private statusHistory: Array<{ status: TaskStatus; timestamp: Date }> = [];

  /**
   * Creates a new TaskImpl instance.
   * 
   * @param task - Task properties
   */
  constructor(task: Omit<Uffgabe<T>, 'status'> & { status?: TaskStatus }) {
    this.id = task.id;
    this.do_Tittel = task.do_Tittel;
    this.umWosGoots = task.umWosGoots;
    this.status = task.status || TaskStatus.PENDING;
    this.priority = task.priority;
    this.assignee = task.assignee;
    this.dueDate = task.dueDate;
    this.data = task.data;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.statusHistory.push({ status: this.status, timestamp: new Date() });
  }

  /**
   * Updates the task status and records the change in history.
   * 
   * @param status - New status to set
   * @returns The updated task
   */
  korrigiera(status: TaskStatus): this {
    if (status !== this.status) {
      this.status = status;
      this.updatedAt = new Date();
      this.statusHistory.push({ status, timestamp: new Date() });
    }
    return this;
  }

  /**
   * Assigns the task to a user.
   * 
   * @param user - User to assign the task to
   * @returns The updated task
   */
  delegiera(user: Kerle): this {
    this.assignee = user;
    this.updatedAt = new Date();
    return this;
  }

  /**
   * Gets the status history of the task.
   * 
   * @returns Array of status changes with timestamps
   */
  wasWarDavor(): ReadonlyArray<{ status: TaskStatus; timestamp: Date }> {
    return [...this.statusHistory];
  }

  /**
   * Checks if the task is overdue.
   * 
   * @returns True if the task is overdue, false otherwise
   */
  ojeZuSpaet(): boolean {
    if (!this.dueDate) return false;
    if (this.status === TaskStatus.FERTIG) return false;
    return this.dueDate < new Date();
  }

  /**
   * Creates a string representation of the task.
   * 
   * @returns String representation
   */
  toString(): string {
    return `Task ${this.id}: ${this.do_Tittel} (${this.status})`;
  }
}

/**
 * Manages a collection of tasks.
 * 
 * @typeParam T - The type of data associated with tasks
 */
export class TaschgMaenaedscha<T = any> {
  private tasks: Map<string, TaschgInEcht<T>> = new Map();
  private nextId: number = 1;

  /**
   * Creates a new task.
   * 
   * @param title - Task title
   * @param description - Task description
   * @param priority - Task priority
   * @param options - Additional options
   * @returns The created task
   * 
   * @example
   * ```typescript
   * const taskManager = new TaskManager();
   * const task = taskManager.createTask(
   *   'Implement feature',
   *   'Implement the new login feature',
   *   Priority.HIGH
   * );
   * ```
   */
  bauWatt(
    title: string,
    description: string,
    priority: Priority,
    options?: TaskOptions
  ): TaschgInEcht<T> {
    const id = `TASK-${this.nextId++}`;
    const task = new TaschgInEcht<T>({
      id,
      do_Tittel: title,
      umWosGoots: description,
      priority,
      status: TaskStatus.PENDING
    });
    
    this.tasks.set(id, task);
    return task;
  }

  /**
   * Gets a task by ID.
   * 
   * @param id - Task ID
   * @returns The task
   * @throws {UffgabeWechFaehler} If the task is not found
   */
  suchs(id: string): TaschgInEcht<T> {
    const task = this.tasks.get(id);
    if (!task) {
      throw new UffgabeWechFaehler(id);
    }
    return task;
  }

  /**
   * Gets all tasks.
   * 
   * @returns Array of all tasks
   */
  iWillAelles(): TaschgInEcht<T>[] {
    return Array.from(this.tasks.values());
  }

  /**
   * Gets tasks filtered by status.
   * 
   * @param status - Status to filter by
   * @returns Array of matching tasks
   */
  holsMir(status: TaskStatus): TaschgInEcht<T>[] {
    return this.iWillAelles().filter(task => task.status === status);
  }

  /**
   * Gets tasks assigned to a specific user.
   * 
   * @param userId - User ID
   * @returns Array of matching tasks
   */
  holsFuerEnKerle(userId: string): TaschgInEcht<T>[] {
    return this.iWillAelles().filter(task => task.assignee?.id === userId);
  }

  /**
   * Deletes a task.
   * 
   * @param id - Task ID
   * @returns True if the task was deleted, false if it wasn't found
   */
  wechDamit(id: string): boolean {
    return this.tasks.delete(id);
  }
}
