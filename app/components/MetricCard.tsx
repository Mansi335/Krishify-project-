interface MetricCardProps {
  value: string;
  label: string;
}

export default function MetricCard({ value, label }: MetricCardProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-5xl font-bold text-black mb-2">{value}</div>
      <div className="text-gray-600 text-sm">{label}</div>
    </div>
  );
}

