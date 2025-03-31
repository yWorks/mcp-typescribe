/**
 * Utility functions for working with TypeScript types.
 */

import { Reflection, Type } from "typedoc";

export function reflectionIsReferencing(
  symbol: Reflection | undefined,
  typeName: string,
): boolean {
  if (!symbol) return false;

  let result: boolean | undefined = false;
  symbol.visit({
    declaration: (symbol) => {
      result =
        isReferencing(symbol.type, typeName) ||
        symbol.extendedTypes?.some((type) => isReferencing(type, typeName)) ||
        symbol.implementedTypes?.some((type) =>
          isReferencing(type, typeName),
        ) ||
        symbol.typeParameters?.some((type) =>
          isReferencing(type.type, typeName),
        ) ||
        symbol.signatures?.some((s) => reflectionIsReferencing(s, typeName));
    },
    signature: (refl) => {
      result =
        isReferencing(refl.type, typeName) ||
        refl.typeParameters?.some((type) =>
          isReferencing(type.type, typeName),
        ) ||
        refl.parameters?.some((p) => isReferencing(p.type, typeName));
    },
    typeParam: (refl) => {
      result = isReferencing(refl.type, typeName);
    },
    reference: (refl) =>
      reflectionIsReferencing(refl.getTargetReflection(), typeName),
    param: (refl) => {
      result = isReferencing(refl.type, typeName);
    },
    document: (refl) => {
      result = false;
    },
    project: (refl) => {
      result = false;
    },
  });
  return result ?? false;
}

export function isReferencing(
  type: Type | undefined,
  typeName: string,
): boolean {
  if (!type) return false;

  return (
    type.visit({
      reference: (type) => type.name === typeName,
      array: (type) => isReferencing(type.elementType, typeName),
      intersection: (type) =>
        type.types.some((t) => isReferencing(t, typeName)),
      union: (type) => type.types.some((t) => isReferencing(t, typeName)),
      reflection: (type) =>
        type.declaration.children?.some((c) =>
          isReferencing(c.type, typeName),
        ) ?? false,
      conditional: (type) =>
        isReferencing(type.checkType, typeName) ||
        isReferencing(type.extendsType, typeName),
      inferred: () => false,
      optional: (type) => isReferencing(type.elementType, typeName),
      query: (type) => isReferencing(type.queryType, typeName),
      predicate: (type) => isReferencing(type.targetType, typeName),
      literal: (type) => type.value == typeName,
      tuple: (type) =>
        type.elements?.some((t) => isReferencing(t, typeName)) ?? false,
      typeOperator: (type) => isReferencing(type.target, typeName),
      indexedAccess: (type) =>
        isReferencing(type.objectType, typeName) &&
        isReferencing(type.indexType, typeName),
      intrinsic: (type) => type.name === typeName,
      rest: (type) => isReferencing(type.elementType, typeName),
      unknown: () => false,
    }) ?? false
  );
}

/**
 * Formats a type to a string representation.
 *
 * @param type - The type to format
 * @returns The formatted type string
 */
export function formatType(type?: Type): string {
  if (!type) return "any";
  return type.stringify("none");
}
