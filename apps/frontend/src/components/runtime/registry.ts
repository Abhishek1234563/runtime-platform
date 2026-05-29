import DynamicForm from "../dynamic/DynamicForm";
import DynamicTable from "../dynamic/DynamicTable";
import DynamicLayout from "../dynamic/DynamicLayout";
import DynamicCard
from "../dynamic/DynamicCard";

export const registry: Record<string, any> = {
  form: DynamicForm,
  table: DynamicTable,
  layout: DynamicLayout,
  card: DynamicCard,
};