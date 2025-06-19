import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils"; // For conditional class names

interface PeriodicTableTileProps {
  atomicNumber: number;
  symbol: string;
  name: string;
  atomicMass?: string | number;
  category?: string; // e.g., 'alkali-metal', 'halogen', 'noble-gas'
  onClick?: (symbol: string) => void;
  isPlaceholder?: boolean;
  className?: string;
}

// Example category colors (Tailwind classes)
const categoryColors: Record<string, string> = {
  'alkali-metal': 'bg-red-200 hover:bg-red-300 dark:bg-red-700 dark:hover:bg-red-600',
  'alkaline-earth-metal': 'bg-orange-200 hover:bg-orange-300 dark:bg-orange-700 dark:hover:bg-orange-600',
  'lanthanide': 'bg-yellow-200 hover:bg-yellow-300 dark:bg-yellow-700 dark:hover:bg-yellow-600',
  'actinide': 'bg-amber-200 hover:bg-amber-300 dark:bg-amber-700 dark:hover:bg-amber-600',
  'transition-metal': 'bg-lime-200 hover:bg-lime-300 dark:bg-lime-700 dark:hover:bg-lime-600',
  'post-transition-metal': 'bg-green-200 hover:bg-green-300 dark:bg-green-700 dark:hover:bg-green-600',
  'metalloid': 'bg-teal-200 hover:bg-teal-300 dark:bg-teal-700 dark:hover:bg-teal-600',
  'nonmetal': 'bg-cyan-200 hover:bg-cyan-300 dark:bg-cyan-700 dark:hover:bg-cyan-600',
  'halogen': 'bg-sky-200 hover:bg-sky-300 dark:bg-sky-700 dark:hover:bg-sky-600',
  'noble-gas': 'bg-blue-200 hover:bg-blue-300 dark:bg-blue-700 dark:hover:bg-blue-600',
  'unknown': 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500',
};

const PeriodicTableTile: React.FC<PeriodicTableTileProps> = ({
  atomicNumber,
  symbol,
  name,
  atomicMass,
  category,
  onClick,
  isPlaceholder = false,
  className,
}) => {
  console.log("Rendering PeriodicTableTile:", symbol);

  if (isPlaceholder) {
    return <div className={cn("aspect-square", className)} />;
  }

  const tileColor = category ? categoryColors[category] || categoryColors['unknown'] : categoryColors['unknown'];

  const tileContent = (
    <Card
      className={cn(
        "w-full aspect-square flex flex-col items-center justify-center p-1 text-center transition-all duration-150 cursor-pointer shadow-sm",
        tileColor,
        "dark:text-gray-900", // Assuming light background colors for categories
        className
      )}
      onClick={() => onClick?.(symbol)}
    >
      <CardContent className="p-0 flex flex-col items-center justify-center flex-grow w-full">
        <div className="text-xs absolute top-1 left-1">{atomicNumber}</div>
        <div className="text-xl md:text-2xl font-bold">{symbol}</div>
        <div className="text-[0.6rem] leading-tight truncate w-full px-0.5">{name}</div>
        {atomicMass && <div className="text-[0.55rem] leading-tight">{Number(atomicMass).toFixed(3)}</div>}
      </CardContent>
    </Card>
  );

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>{tileContent}</TooltipTrigger>
        <TooltipContent>
          <p className="font-semibold">{name} ({symbol})</p>
          <p>Atomic Number: {atomicNumber}</p>
          {atomicMass && <p>Atomic Mass: {atomicMass}</p>}
          {category && <p>Category: {category.replace(/-/g, ' ')}</p>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default PeriodicTableTile;