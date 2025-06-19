import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertTriangle, Flame, Skull, Biohazard, TestTube, CircleDotDashed, Wind } from 'lucide-react'; // Example icons

// This is a simplified mapping. A real app would need a more robust solution
// for GHS pictograms, potentially using actual image assets.
const pictogramMap: Record<string, { icon: React.ElementType; label: string; color?: string }> = {
  flammable: { icon: Flame, label: "Flammable", color: "text-red-500" },
  toxic: { icon: Skull, label: "Toxic", color: "text-orange-600" },
  irritant: { icon: AlertTriangle, label: "Irritant/Harmful", color: "text-yellow-500" },
  corrosive: { icon: TestTube, label: "Corrosive", color: "text-amber-700" },
  oxidizing: { icon: CircleDotDashed, label: "Oxidizing", color: "text-orange-500" },
  gas_under_pressure: { icon: Wind, label: "Gas Under Pressure", color: "text-sky-500" },
  biohazard: { icon: Biohazard, label: "Biohazard", color: "text-red-700" },
  // Add more GHS pictograms as needed
};

interface SafetyPictogramProps {
  type: string; // e.g., 'flammable', 'toxic'
  size?: number;
}

const SafetyPictogram: React.FC<SafetyPictogramProps> = ({ type, size = 32 }) => {
  const pictogram = pictogramMap[type.toLowerCase()];

  if (!pictogram) {
    console.warn(`Unknown pictogram type: ${type}`);
    return <AlertTriangle size={size} className="text-gray-400" title={`Unknown: ${type}`} />;
  }

  const IconComponent = pictogram.icon;
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="p-2 border border-gray-300 dark:border-gray-600 rounded-md flex items-center justify-center">
            <IconComponent size={size} className={pictogram.color || "text-gray-700 dark:text-gray-300"} />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{pictogram.label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

interface SafetyPictogramGroupProps {
  pictogramTypes: string[]; // Array of pictogram types like ['flammable', 'toxic']
  title?: string;
  pictogramSize?: number;
}

const SafetyPictogramGroup: React.FC<SafetyPictogramGroupProps> = ({
  pictogramTypes,
  title = "Safety Pictograms",
  pictogramSize = 32,
}) => {
  console.log("Rendering SafetyPictogramGroup with pictograms:", pictogramTypes.join(', '));

  if (!pictogramTypes || pictogramTypes.length === 0) {
    return null; // Or a message indicating no pictograms
  }

  return (
    <div className="space-y-2">
      {title && <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200">{title}</h3>}
      <div className="flex flex-wrap gap-3">
        {pictogramTypes.map((type) => (
          <SafetyPictogram key={type} type={type} size={pictogramSize} />
        ))}
      </div>
    </div>
  );
}

export default SafetyPictogramGroup;