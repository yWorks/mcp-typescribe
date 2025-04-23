import { z } from "zod";
import { ReflectionKind } from "typedoc";

// Base handler schema
const baseHandlerSchema = z.object({
  name: z.string().optional().describe("The name of the symbol to search for"),
  id: z.number().optional().describe("The ID# of the symbol to search for"),
  names: z
    .array(z.string())
    .optional()
    .describe("An array of names to search for"),
  ids: z
    .array(z.number())
    .optional()
    .describe("An array of ID#s to search for"),
});

const baseHandlerSchemaWithPagination = z.object({
  name: z.string().optional().describe("The name of the symbol to search for"),
  id: z.number().optional().describe("The ID# of the symbol to search for"),
  names: z
    .array(z.string())
    .optional()
    .describe("An array of names to search for"),
  ids: z
    .array(z.number())
    .optional()
    .describe("An array of ID#s to search for"),
  limit: z
    .number()
    .default(20)
    .optional()
    .describe("The maximum number of results to return. Defaults to 20"),
  offset: z
    .number()
    .default(0)
    .optional()
    .describe("The offset of the first result to return. Defaults to 0"),
});
/*  .refine(
    (data) => {
      let setProperties = 0;
      if (data.name !== undefined) setProperties++;
      if (data.id !== undefined) setProperties++;
      if (data.names !== undefined) setProperties++;
      if (data.ids !== undefined) setProperties++;

      return setProperties === 1;
    },
    {
      message: "Exactly one of 'name', 'id', 'names', or 'ids' must be set.",
      path: ["name", "id", "names", "ids"], // Specify all paths to highlight errors on all fields
    },
  );*/

// Search symbols schema
const searchSymbolsSchema = z
  .object({
    query: z
      .string()
      .describe(
        "the name of the symbol to search for. This can be a partial match. ",
      ),
    kind: z
      .enum([
        ...(Object.keys(ReflectionKind) as [
          ReflectionKind.KindString,
          ...ReflectionKind.KindString[],
        ]),
        "any",
      ])
      .optional()
      .describe(
        "The kind of symbol to search for. One of Module,Namespace,Enum,EnumMember,Function,Class,Interface,Property,Method,CallSignature",
      ),
    limit: z
      .number()
      .default(10)
      .optional()
      .describe("The maximum number of results to return. Defaults to 10."),
    offset: z
      .number()
      .default(0)
      .optional()
      .describe(
        "The offset of the first result to return. If not specified, the first result will be returned. ",
      ),
  })
  .describe(
    "Searches for symbols with a given name. You can search by type and limit the number of results.",
  );

// Get symbol details schema
const getSymbolDetailsSchema = baseHandlerSchemaWithPagination.describe(
  "Gets details about a symbol. This includes the symbol's name, kind, and description. If the symbol is a class, interface, enum, or module, this also includes the members of the symbol. Use this to resolve `api://symbol/[id]` urls",
);

// List members schema
const listMembersSchema = baseHandlerSchema
  .extend({
    includeInherited: z
      .boolean()
      .default(false)
      .optional()
      .describe(
        "Whether to include inherited members. If not specified, only direct members will be returned.",
      ),
    limit: z
      .number()
      .default(20)
      .optional()
      .describe(
        "The maximum number of members to return. If not specified only the first 20 results will be returned. ",
      ),
    offset: z
      .number()
      .default(0)
      .optional()
      .describe(
        "The offset of the first member to return. If not specified, the first result will be returned. ",
      ),
  })
  .describe(
    "Lists the members of a class, interface, enum, or module. If includeInherited is true, inherited members will also be returned.",
  );

// Get parameter info schema
const getParameterInfoSchema = baseHandlerSchema.describe(
  "Gets information about function or method parameters. This includes the parameter's name, type, and description.",
);

// Find implementations schema
const findImplementationsSchema = baseHandlerSchemaWithPagination.describe(
  "Lists all known implementations of a given interface or subclasses of a given class. ",
);

// Search by return type schema
const searchByReturnTypeSchema = z
  .object({
    typeName: z.string().describe("the name of the type"),
    limit: z
      .number()
      .optional()
      .default(10)
      .describe(
        "The maximum number of results to return. If not specified only the first 10 results will be returned. ",
      ),
    offset: z
      .number()
      .optional()
      .default(0)
      .describe(
        "The offset of the first result to return. If not specified, the first result will be returned. ",
      ),
  })
  .describe(
    "Finds functions and methods with a specific return type. This can be used to find functions and methods that return a specific type, or to find functions and methods that return a type that is a subclass of a given type.",
  );

// Search by description schema
const searchByDescriptionSchema = z
  .object({
    query: z
      .string()
      .describe(
        "the description to search for. This can be a partial text match. ",
      ),
    limit: z
      .number()
      .optional()
      .default(10)
      .describe(
        "The maximum number of results to return. If not specified only the first 10 results will be returned. ",
      ),
    offset: z
      .number()
      .optional()
      .default(0)
      .describe(
        "The offset of the first result to return. If not specified, the first result will be returned. ",
      ),
  })
  .describe(
    "Searches for symbols with descriptions containing a query. This can be used to find symbols that are similar to a given description, or to find symbols that are related to a given description.",
  );

// Get type hierarchy schema
const getTypeHierarchySchema = baseHandlerSchema.describe(
  "Get the type hierarchy for a given type symbol. Inherited classes and interfaces, as well as inheritors.",
);

// Find usages schema
const findUsagesSchema = baseHandlerSchemaWithPagination.describe(
  "Finds usages of a symbol in the API. This includes references to the symbol in other symbols.",
);

// Derived types
type SearchSymbolsParams = z.infer<typeof searchSymbolsSchema>;
type GetSymbolDetailsParams = z.infer<typeof getSymbolDetailsSchema>;
type ListMembersParams = z.infer<typeof listMembersSchema>;
type GetParameterInfoParams = z.infer<typeof getParameterInfoSchema>;
type FindImplementationsParams = z.infer<typeof findImplementationsSchema>;
type SearchByReturnTypeParams = z.infer<typeof searchByReturnTypeSchema>;
type SearchByDescriptionParams = z.infer<typeof searchByDescriptionSchema>;
type GetTypeHierarchyParams = z.infer<typeof getTypeHierarchySchema>;
type FindUsagesParams = z.infer<typeof findUsagesSchema>;

export const base_handler_schema = baseHandlerSchema;

// Export all schemas
export const schemas = {
  search_symbols: searchSymbolsSchema,
  get_symbol_details: getSymbolDetailsSchema,
  list_members: listMembersSchema,
  get_parameter_info: getParameterInfoSchema,
  find_implementations: findImplementationsSchema,
  search_by_return_type: searchByReturnTypeSchema,
  search_by_description: searchByDescriptionSchema,
  get_type_hierarchy: getTypeHierarchySchema,
  find_usages: findUsagesSchema,
} as const;

// Export all types
export type {
  SearchSymbolsParams,
  GetSymbolDetailsParams,
  ListMembersParams,
  GetParameterInfoParams,
  FindImplementationsParams,
  SearchByReturnTypeParams,
  SearchByDescriptionParams,
  GetTypeHierarchyParams,
  FindUsagesParams,
};
