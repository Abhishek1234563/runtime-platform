import ComponentRenderer from "../runtime/ComponentRenderer";

interface Props {
  direction?: "row" | "column";
  children?: any[];
}

export default function DynamicLayout({
  direction = "row",
  children = [],
}: Props) {

  const isRow = direction === "row";

  return (
    <div
      className={`
        flex
        gap-6
        ${isRow ? "flex-row" : "flex-col"}
      `}
    >

      {children.map((child, index) => (
        <div key={index} className="flex-1">

          <ComponentRenderer component={child} />

        </div>
      ))}

    </div>
  );
}