// Sample TypeDoc JSON for testing
import {TypeDocJson} from "../src/mcp-server/types.js";

export const sampleTypeDocJson: TypeDocJson = {
    id: 0,
    name: 'sample-api',
    kind: 1,
    kindString: 'Project',
    children: [
        {
            id: 1,
            name: 'TaskStatus',
            kind: 8, // Enum
            kindString: 'Enum',
            comment: {
                summary: [
                    {
                        kind: 'text',
                        text: 'Represents the status of a task.'
                    }
                ]
            },
            children: [
                {
                    id: 2,
                    name: 'PENDING',
                    kind: 16, // EnumMember
                    kindString: 'EnumMember',
                    comment: {
                        summary: [
                            {
                                kind: 'text',
                                text: 'Task has not been started yet'
                            }
                        ]
                    }
                },
                {
                    id: 3,
                    name: 'IN_PROGRESS',
                    kind: 16, // EnumMember
                    kindString: 'EnumMember',
                    comment: {
                        summary: [
                            {
                                kind: 'text',
                                text: 'Task is currently in progress'
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: 4,
            name: 'User',
            kind: 256, // Interface
            kindString: 'Interface',
            comment: {
                summary: [
                    {
                        kind: 'text',
                        text: 'Represents a user in the system.'
                    }
                ]
            },
            children: [
                {
                    id: 5,
                    name: 'id',
                    kind: 1024, // Property
                    kindString: 'Property',
                    comment: {
                        summary: [
                            {
                                kind: 'text',
                                text: 'Unique identifier for the user'
                            }
                        ]
                    },
                    type: {
                        type: 'intrinsic',
                        name: 'string'
                    }
                },
                {
                    id: 6,
                    name: 'name',
                    kind: 1024, // Property
                    kindString: 'Property',
                    comment: {
                        summary: [
                            {
                                kind: 'text',
                                text: 'Full name of the user'
                            }
                        ]
                    },
                    type: {
                        type: 'intrinsic',
                        name: 'string'
                    }
                }
            ]
        },
        {
            id: 7,
            name: 'TaskImpl',
            kind: 128, // Class
            kindString: 'Class',
            comment: {
                summary: [
                    {
                        kind: 'text',
                        text: 'Represents a concrete implementation of a task with additional functionality.'
                    }
                ]
            },
            children: [
                {
                    id: 8,
                    name: 'constructor',
                    kind: 512, // Constructor
                    kindString: 'Constructor',
                    signatures: [
                        {
                            id: 9,
                            name: 'constructor',
                            kind: 16384, // ConstructorSignature
                            kindString: 'Constructor signature',
                            comment: {
                                summary: [
                                    {
                                        kind: 'text',
                                        text: 'Creates a new TaskImpl instance.'
                                    }
                                ]
                            },
                            parameters: [
                                {
                                    id: 10,
                                    name: 'task',
                                    kind: 32768, // Parameter
                                    kindString: 'Parameter',
                                    type: {
                                        type: 'reference',
                                        name: 'Task'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 11,
                    name: 'updateStatus',
                    kind: 2048, // Method
                    kindString: 'Method',
                    signatures: [
                        {
                            id: 12,
                            name: 'updateStatus',
                            kind: 4096, // CallSignature
                            kindString: 'Call signature',
                            comment: {
                                summary: [
                                    {
                                        kind: 'text',
                                        text: 'Updates the task status and records the change in history.'
                                    }
                                ]
                            },
                            parameters: [
                                {
                                    id: 13,
                                    name: 'status',
                                    kind: 32768, // Parameter
                                    kindString: 'Parameter',
                                    type: {
                                        type: 'reference',
                                        name: 'TaskStatus'
                                    }
                                }
                            ],
                            type: {
                                type: 'reference',
                                name: 'this'
                            }
                        }
                    ]
                }
            ],
            implementedTypes: [
                {
                    type: 'reference',
                    name: 'Task'
                }
            ]
        },
        {
            id: 14,
            name: 'sortByPriority',
            kind: 64, // Function
            kindString: 'Function',
            comment: {
                summary: [
                    {
                        kind: 'text',
                        text: 'Sorts tasks by priority (highest first).'
                    }
                ]
            },
            signatures: [
                {
                    id: 15,
                    name: 'sortByPriority',
                    kind: 4096, // CallSignature
                    kindString: 'Call signature',
                    parameters: [
                        {
                            id: 17,
                            name: 'tasks',
                            kind: 32768, // Parameter
                            kindString: 'Parameter',
                            type: {
                                type: 'array',
                                elementType: {
                                    type: 'reference',
                                    name: 'T'
                                }
                            }
                        }
                    ],
                    type: {
                        type: 'array',
                        elementType: {
                            type: 'reference',
                            name: 'T'
                        }
                    }
                }
            ]
        }
    ]
};