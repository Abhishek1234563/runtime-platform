import {
  FormSchema,
  TableSchema,
  LayoutSchema,
  CardSchema,
} from "../schemas/componentSchemas";

export function validateComponent(component: any) {

  switch (component.type) {

    case "form":
      return FormSchema.safeParse(component);

    case "table":
      return TableSchema.safeParse(component);

    case "layout":
      return LayoutSchema.safeParse(component);
    case "card":
      return CardSchema.safeParse(component);

    default:
      return null;
  }
}