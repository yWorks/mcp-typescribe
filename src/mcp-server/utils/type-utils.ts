/**
 * Utility functions for working with TypeScript types.
 */

import { TypeDocSymbol, TypeDocType } from "../types/index.js";
import { JSONOutput, ReflectionKind } from "typedoc";

type ReferenceStore = {
  referenceTarget?: JSONOutput.DeclarationReflection;
};

export function storeReference(
  reflection: JSONOutput.ReferenceReflection | JSONOutput.DeclarationReflection,
  target: JSONOutput.DeclarationReflection,
) {
  (reflection as ReferenceStore).referenceTarget = target;
}

export function resolveReference(
  reflection: JSONOutput.ReferenceReflection | JSONOutput.DeclarationReflection,
) {
  return (reflection as ReferenceStore).referenceTarget;
}

export function reflectionIsReferencing(
  symbol: TypeDocSymbol | undefined,
  typeName: string,
): boolean {
  if (!symbol) return false;

  switch (symbol.variant) {
    case "declaration":
      switch (symbol.kind) {
        case ReflectionKind.Project:
        case ReflectionKind.Module:
        case ReflectionKind.Namespace:
        case ReflectionKind.Enum:
        case ReflectionKind.EnumMember:
          return false;
        case ReflectionKind.Variable:
          return !!symbol.type && isReferencing(symbol.type, typeName);
        case ReflectionKind.Function:
          return (
            !!symbol.signatures &&
            symbol.signatures.some((s) => reflectionIsReferencing(s, typeName))
          );
        case ReflectionKind.Class:
          return !!(
            (symbol.type && isReferencing(symbol.type, typeName)) ||
            symbol.extendedTypes?.some((type) =>
              isReferencing(type, typeName),
            ) ||
            symbol.implementedTypes?.some((type) =>
              isReferencing(type, typeName),
            ) ||
            symbol.typeParameters?.some((type) =>
              isReferencing(type.type, typeName),
            )
          );
        case ReflectionKind.Interface:
          return !!(
            (symbol.type && isReferencing(symbol.type, typeName)) ||
            symbol.typeParameters?.some((type) =>
              isReferencing(type.type, typeName),
            ) ||
            symbol.extendedTypes?.some((type) => isReferencing(type, typeName))
          );
          break;
        case ReflectionKind.Constructor:
          return !!symbol.signatures?.some((s) =>
            reflectionIsReferencing(s, typeName),
          );
        case ReflectionKind.Property:
          return !!symbol.type && isReferencing(symbol.type, typeName);
        case ReflectionKind.Method:
          return !!symbol.signatures?.some((s) =>
            reflectionIsReferencing(s, typeName),
          );
        case ReflectionKind.CallSignature:
          return false;
        case ReflectionKind.IndexSignature:
        case ReflectionKind.ConstructorSignature:
        case ReflectionKind.Parameter:
        case ReflectionKind.TypeLiteral:
        case ReflectionKind.TypeParameter:
        case ReflectionKind.Accessor:
        case ReflectionKind.GetSignature:
        case ReflectionKind.SetSignature:
        case ReflectionKind.TypeAlias:
        case ReflectionKind.Reference:
        case ReflectionKind.Document:
        default:
          return false;
      }
      break;
    case "param":
      return isReferencing(symbol.type, typeName);
    case "project":
      return false;
    case "reference":
      return reflectionIsReferencing(resolveReference(symbol), typeName);
    case "signature":
      return !!(
        isReferencing(symbol.type, typeName) ||
        symbol.typeParameters?.some((type) =>
          isReferencing(type.type, typeName),
        ) ||
        symbol.parameters?.some((p) => isReferencing(p.type, typeName))
      );
    case "typeParam":
      return isReferencing(symbol.type, typeName);
    case "document":
      return false;
  }
}

export function isReferencing(
  type: TypeDocType | undefined,
  typeName: string,
): boolean {
  if (!type) return false;
  switch (type.type) {
    case "reference":
      return type.name === typeName;
    case "array":
      return isReferencing(type.elementType, typeName);
    case "intersection":
      return type.types.some((t: TypeDocType) => isReferencing(t, typeName));
    case "union":
      return type.types.some((t: TypeDocType) => isReferencing(t, typeName));
    case "reflection":
      return (
        type.declaration.children?.some((c) =>
          isReferencing(c.type as TypeDocType, typeName),
        ) ?? false
      );
    case "conditional":
      return (
        isReferencing(type.checkType, typeName) ||
        isReferencing(type.extendsType, typeName)
      );
    case "inferred":
      return false;
    case "optional":
      return isReferencing(type.elementType, typeName);
    case "query":
      return isReferencing(type.queryType, typeName);
    case "predicate":
      return isReferencing(type.targetType as TypeDocType, typeName);
    case "literal":
      return type.value == typeName;
    case "tuple":
      return type.elements?.some((t) => isReferencing(t, typeName)) ?? false;
    case "typeOperator":
      return isReferencing(type.target, typeName);
    case "indexedAccess":
      return (
        isReferencing(type.objectType, typeName) &&
        isReferencing(type.indexType, typeName)
      );
    case "intrinsic":
      return type.name === typeName;
    case "rest":
      return isReferencing(type.elementType, typeName);
    case "unknown":
      return false;
  }
  return false;
}

/**
 * Formats a type to a string representation.
 *
 * @param type - The type to format
 * @returns The formatted type string
 */
export function formatType(type?: TypeDocType): string {
  if (!type) return "any";

  switch (type.type) {
    case "intrinsic":
      return type.name || "any";

    case "reference":
      if (type.typeArguments && type.typeArguments.length > 0) {
        const args = type.typeArguments.map(formatType).join(", ");
        return `${type.qualifiedName ?? type.name}<${args}>`;
      }
      return type.qualifiedName ?? type.name ?? "any";

    case "array":
      if (type.elementType) {
        return `${formatType(type.elementType)}[]`;
      }
      return "any[]";

    case "union":
      if (type.types) {
        return type.types.map(formatType).join(" | ");
      }
      return "any";
    case "intersection":
      if (type.types) {
        return type.types.map(formatType).join(" & ");
      }
      return "any";

    case "tuple":
      if (type.elements) {
        return `[${type.elements.map(formatType).join(", ")}]`;
      }
      return "[]";
    case "unknown":
      return "unknown";
    case "optional":
      return `${formatType(type.elementType)}?`;
    case "indexedAccess":
      return `${formatType(type.objectType)}[${formatType(type.indexType)}]`;
    case "rest":
      return `...${formatType(type.elementType)}`;
    case "namedTupleMember":
      return `${type.name}: ${formatType(type.element)}${type.isOptional ? "?" : ""}`;
    case "query":
      return `typeof ${formatType(type.queryType)}`;
    case "literal":
      return JSON.stringify(type.value);

    case "reflection":
      return `{${(type.declaration.children ?? [])
        .map((c) => [c.name, formatType(c.type)])
        .map(([name, type]) => `${name}: ${type}`)
        .join(", ")}}`;

    case "conditional":
      return `${formatType(type.checkType)} extends ${formatType(type.extendsType)} ? ${formatType(type.trueType)} : ${formatType(type.falseType)}`;
    case "inferred":
      return "any";
    default:
      return "any";
  }
}
