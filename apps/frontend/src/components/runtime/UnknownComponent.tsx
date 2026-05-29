interface Props {
  type: string;
}

export default function UnknownComponent({ type }: Props) {
  return (
    <div className="border border-red-500 bg-red-100 p-4 rounded-lg">
      <h2 className="font-bold text-red-700">
        Unsupported Component
      </h2>

      <p className="text-red-600">
        Component type "{type}" does not exist.
      </p>
    </div>
  );
}