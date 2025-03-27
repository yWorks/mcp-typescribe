import { z } from "zod";
import { ReflectionKind } from "typedoc";

// Base handler schema
const baseHandlerSchema = z.object({
  name: z.string().optional().describe("The name of the symbol to search for"),
  id: z.number().optional().describe("The ID of the symbol to search for"),
  names: z.array(z.string()).optional().describe("An array of names to search for"),
  ids: z.array(z.number()).optional().describe("An array of IDs to search for"),
}).refine(data => {
  let setProperties = 0;
  if (data.name !== undefined) setProperties++;
  if (data.id !== undefined) setProperties++;
  if (data.names !== undefined) setProperties++;
  if (data.ids !== undefined) setProperties++;

  return setProperties === 1;
}, {
  message: "Exactly one of 'name', 'id', 'names', or 'ids' must be set.",
  path: ['name', 'id', 'names', 'ids'], // Specify all paths to highlight errors on all fields
});


// Search symbols schema
const searchSymbolsSchema = z.object({
  query: z.string().describe("the name of the symbol to search for. This can be a partial match. "),
  kind: (z.enum([...Object.keys(ReflectionKind) as [ReflectionKind.KindString, ...(ReflectionKind.KindString)[]], "any"])).optional(),
  limit: z.number().optional().describe(
    "The maximum number of results to return. If not specified, all results will be returned."),
});

// Get symbol details schema
const getSymbolDetailsSchema = baseHandlerSchema;

// List members schema
const listMembersSchema = baseHandlerSchema.sourceType().extend({
  includeInherited: z.boolean().optional().describe(
    "Whether to include inherited members. If not specified, only direct members will be returned."),
}).describe("Lists the members of a class, interface, enum, or module. If includeInherited is true, inherited members will also be returned.");

// Get parameter info schema
const getParameterInfoSchema = baseHandlerSchema;

// Find implementations schema
const findImplementationsSchema = baseHandlerSchema;

// Search by return type schema
const searchByReturnTypeSchema = z.object({
  typeName: z.string(),
});

// Search by description schema
const searchByDescriptionSchema = z.object({
  query: z.string().describe("the description to search for. This can be a partial text match. "),
});

// Get type hierarchy schema
const getTypeHierarchySchema = baseHandlerSchema;

// Find usages schema
const findUsagesSchema = baseHandlerSchema;

// Derived types
type BaseHandlerParams = z.infer<typeof baseHandlerSchema>;
type SearchSymbolsParams = z.infer<typeof searchSymbolsSchema>;
type GetSymbolDetailsParams = z.infer<typeof getSymbolDetailsSchema>;
type ListMembersParams = z.infer<typeof listMembersSchema>;
type GetParameterInfoParams = z.infer<typeof getParameterInfoSchema>;
type FindImplementationsParams = z.infer<typeof findImplementationsSchema>;
type SearchByReturnTypeParams = z.infer<typeof searchByReturnTypeSchema>;
type SearchByDescriptionParams = z.infer<typeof searchByDescriptionSchema>;
type GetTypeHierarchyParams = z.infer<typeof getTypeHierarchySchema>;
type FindUsagesParams = z.infer<typeof findUsagesSchema>;

// Export all schemas
export const schemas = {
  baseHandlerSchema,
  searchSymbolsSchema,
  getSymbolDetailsSchema,
  listMembersSchema,
  getParameterInfoSchema,
  findImplementationsSchema,
  searchByReturnTypeSchema,
  searchByDescriptionSchema,
  getTypeHierarchySchema,
  findUsagesSchema,
} as const;

// Export all types
export type {
  BaseHandlerParams,
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