import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from 'lucide-react';

interface ChemicalInfoCardProps {
  id: string | number;
  name: string;
  formula?: string;
  casNumber?: string;
  molecularWeight?: string | number;
  tags?: string[];
  onViewDetails: (id: string | number) => void;
}

const ChemicalInfoCard: React.FC<ChemicalInfoCardProps> = ({
  id,
  name,
  formula,
  casNumber,
  molecularWeight,
  tags,
  onViewDetails,
}) => {
  console.log("Rendering ChemicalInfoCard for:", name);

  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="text-lg">{name}</CardTitle>
        {formula && <CardDescription className="text-base">{formula}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        {casNumber && (
          <p>
            <span className="font-semibold">CAS:</span> {casNumber}
          </p>
        )}
        {molecularWeight && (
          <p>
            <span className="font-semibold">MW:</span> {molecularWeight} g/mol
          </p>
        )}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={() => onViewDetails(id)} className="w-full" variant="outline">
          View Details <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ChemicalInfoCard;