// components/Skeleton.tsx

type SkeletonLine = {
  width?: string; // e.g. "w-1/2", "w-full"
  height?: string; // e.g. "h-4"
  className?: string;
};

type SkeletonProps = {
  lines?: SkeletonLine[];
  className?: string;
};

export default function SkeletonCard({
  lines = [
    { width: "w-1/3", height: "h-4" },
    { width: "w-full", height: "h-3" },
    { width: "w-5/6", height: "h-3" },
  ],
  className = "",
}: SkeletonProps) {
  return (
    <div className={`p-4 rounded-lg shadow-sm animate-pulse ${className}`}>
      {lines.map((line, index) => (
        <div
          key={index}
          className={`
                        bg-gray-300 rounded mb-2
                        ${line.width || "w-full"}
                        ${line.height || "h-3"}
                        ${line.className || ""}
                    `}
        />
      ))}
    </div>
  );
}
