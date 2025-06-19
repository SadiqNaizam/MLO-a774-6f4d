import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import InteractiveChemicalStructure from '@/components/InteractiveChemicalStructure';
import SafetyPictogramGroup from '@/components/SafetyPictogramGroup';
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, FileText, Thermometer, Layers, ShieldCheck, FlaskConical } from 'lucide-react';

interface ChemicalDetail {
  id: string;
  name: string;
  formula?: string;
  casNumber?: string;
  molecularWeight?: string | number;
  iupacName?: string;
  smiles?: string; // For InteractiveChemicalStructure
  molData?: string; // For InteractiveChemicalStructure
  description?: string;
  properties?: { name: string; value: string; unit?: string }[];
  safetyPictograms?: string[]; // e.g., ['flammable', 'toxic', 'corrosive']
  hazardStatements?: string[];
  precautionaryStatements?: string[];
  nfpaRating?: { health: number; flammability: number; reactivity: number; special?: string };
  firstAid?: { eye: string; skin: string; inhalation: string; ingestion: string };
  uses?: string[];
  sdsUrl?: string;
}

const mockChemicalDetails: Record<string, ChemicalDetail> = {
  '1': {
    id: '1',
    name: 'Acetone',
    formula: 'C3H6O',
    casNumber: '67-64-1',
    molecularWeight: '58.08',
    iupacName: 'Propan-2-one',
    smiles: 'CC(=O)C',
    description: 'Acetone is a colorless, volatile, flammable liquid, and is the simplest and smallest ketone. It is widely used as an organic solvent.',
    properties: [
      { name: 'Melting Point', value: '-94.9', unit: '°C' },
      { name: 'Boiling Point', value: '56', unit: '°C' },
      { name: 'Density', value: '0.7845', unit: 'g/cm³' },
      { name: 'Flash Point', value: '-20', unit: '°C' },
    ],
    safetyPictograms: ['flammable', 'irritant'],
    hazardStatements: ['H225: Highly flammable liquid and vapour.', 'H319: Causes serious eye irritation.', 'H336: May cause drowsiness or dizziness.'],
    precautionaryStatements: ['P210: Keep away from heat/sparks/open flames/hot surfaces. — No smoking.', 'P280: Wear protective gloves/protective clothing/eye protection/face protection.', 'P305+P351+P338: IF IN EYES: Rinse cautiously with water for several minutes. Remove contact lenses, if present and easy to do. Continue rinsing.'],
    nfpaRating: { health: 1, flammability: 3, reactivity: 0 },
    firstAid: {
      eye: 'Rinse cautiously with water for several minutes. Remove contact lenses, if present and easy to do. Continue rinsing. If eye irritation persists: Get medical advice/attention.',
      skin: 'Remove/Take off immediately all contaminated clothing. Rinse skin with water/shower. If skin irritation occurs: Get medical advice/attention.',
      inhalation: 'Remove person to fresh air and keep comfortable for breathing. Call a POISON CENTER/doctor if you feel unwell.',
      ingestion: 'Rinse mouth. Do NOT induce vomiting. Call a POISON CENTER/doctor if you feel unwell.',
    },
    uses: ['Solvent for plastics and synthetic fibers', 'Cleaning agent', 'Nail polish remover', 'Paint thinner'],
    sdsUrl: 'https://example.com/sds/acetone.pdf'
  },
  // Add more mock chemicals as needed
};


const ChemicalDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [chemical, setChemical] = useState<ChemicalDetail | null>(null);

  useEffect(() => {
    console.log('ChemicalDetailPage loaded for ID:', id);
    if (id && mockChemicalDetails[id]) {
      setChemical(mockChemicalDetails[id]);
    } else {
      setChemical(null); // Handle not found case
    }
  }, [id]);

  if (!chemical) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center">
        <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-semibold mb-2">Chemical Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">The chemical you are looking for does not exist or could not be loaded.</p>
        <Button asChild variant="outline">
          <Link to="/chemical-listing">Back to Chemical Listing</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
       <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/" className={navigationMenuTriggerStyle()}>
                    ChemInfoHub
                  </NavigationMenuLink>
                </NavigationMenuItem>
                 <NavigationMenuItem>
                  <NavigationMenuLink href="/chemical-listing" className={navigationMenuTriggerStyle()}>
                    Browse Chemicals
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/periodic-table" className={navigationMenuTriggerStyle()}>
                    Periodic Table
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/glossary-info" className={navigationMenuTriggerStyle()}>
                    Glossary & Info
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link to="/chemical-listing">Chemical Listing</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{chemical.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-6 pb-4 border-b">
          <h1 className="text-4xl font-bold">{chemical.name}</h1>
          {chemical.formula && <p className="text-xl text-gray-600 dark:text-gray-400">{chemical.formula}</p>}
          <div className="flex flex-wrap gap-2 mt-2">
            {chemical.casNumber && <Badge variant="secondary">CAS: {chemical.casNumber}</Badge>}
            {chemical.molecularWeight && <Badge variant="secondary">MW: {chemical.molecularWeight} g/mol</Badge>}
          </div>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 mb-6">
            <TabsTrigger value="general"><Layers className="mr-2 h-4 w-4" />General</TabsTrigger>
            <TabsTrigger value="properties"><Thermometer className="mr-2 h-4 w-4" />Properties</TabsTrigger>
            <TabsTrigger value="structure"><FlaskConical className="mr-2 h-4 w-4" />Structure</TabsTrigger>
            <TabsTrigger value="safety"><ShieldCheck className="mr-2 h-4 w-4" />Safety</TabsTrigger>
            <TabsTrigger value="uses">Uses</TabsTrigger> {/*  No icon for brevity or choose one */}
          </TabsList>

          <TabsContent value="general">
            <ScrollArea className="h-[calc(100vh-20rem)]"> {/* Adjust height as needed */}
              <Card>
                <CardHeader>
                  <CardTitle>General Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {chemical.iupacName && <p><span className="font-semibold">IUPAC Name:</span> {chemical.iupacName}</p>}
                  {chemical.description && <p><span className="font-semibold">Description:</span> {chemical.description}</p>}
                  {chemical.sdsUrl && (
                     <Button asChild variant="outline">
                        <a href={chemical.sdsUrl} target="_blank" rel="noopener noreferrer">
                            <FileText className="mr-2 h-4 w-4" /> View/Download SDS
                        </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="properties">
             <ScrollArea className="h-[calc(100vh-20rem)]">
                <Card>
                    <CardHeader><CardTitle>Physical & Chemical Properties</CardTitle></CardHeader>
                    <CardContent>
                    {chemical.properties && chemical.properties.length > 0 ? (
                        <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Property</TableHead>
                            <TableHead>Value</TableHead>
                            <TableHead>Unit</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {chemical.properties.map(prop => (
                            <TableRow key={prop.name}>
                                <TableCell className="font-medium">{prop.name}</TableCell>
                                <TableCell>{prop.value}</TableCell>
                                <TableCell>{prop.unit || ''}</TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    ) : (
                        <p>No specific properties listed.</p>
                    )}
                    </CardContent>
                </Card>
             </ScrollArea>
          </TabsContent>

          <TabsContent value="structure">
            <ScrollArea className="h-[calc(100vh-20rem)]">
                <InteractiveChemicalStructure
                    smiles={chemical.smiles}
                    molData={chemical.molData}
                    structureName={chemical.name}
                />
            </ScrollArea>
          </TabsContent>

          <TabsContent value="safety">
            <ScrollArea className="h-[calc(100vh-20rem)] pr-4">
              <div className="space-y-6">
                {chemical.safetyPictograms && chemical.safetyPictograms.length > 0 && (
                  <SafetyPictogramGroup
                    pictogramTypes={chemical.safetyPictograms}
                    title="GHS Pictograms"
                    pictogramSize={40}
                  />
                )}
                {chemical.nfpaRating && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">NFPA 704 Diamond</h3>
                    <div className="flex items-center gap-2">
                        <Badge variant={chemical.nfpaRating.health > 1 ? "destructive" : "default"}>Health: {chemical.nfpaRating.health}</Badge>
                        <Badge variant={chemical.nfpaRating.flammability > 2 ? "destructive" : (chemical.nfpaRating.flammability > 0 ? "secondary" : "default")}>Flammability: {chemical.nfpaRating.flammability}</Badge>
                        <Badge variant={chemical.nfpaRating.reactivity > 0 ? "destructive" : "default"}>Reactivity: {chemical.nfpaRating.reactivity}</Badge>
                        {chemical.nfpaRating.special && <Badge variant="outline">Special: {chemical.nfpaRating.special}</Badge>}
                    </div>
                  </div>
                )}
                <Accordion type="multiple" collapsible className="w-full">
                  {chemical.hazardStatements && chemical.hazardStatements.length > 0 && (
                    <AccordionItem value="hazard-statements">
                      <AccordionTrigger className="text-base">Hazard Statements</AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          {chemical.hazardStatements.map((stmt, i) => <li key={i}>{stmt}</li>)}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  )}
                  {chemical.precautionaryStatements && chemical.precautionaryStatements.length > 0 && (
                    <AccordionItem value="precautionary-statements">
                      <AccordionTrigger className="text-base">Precautionary Statements</AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          {chemical.precautionaryStatements.map((stmt, i) => <li key={i}>{stmt}</li>)}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  )}
                  {chemical.firstAid && (
                     <AccordionItem value="first-aid">
                        <AccordionTrigger className="text-base">First Aid Measures</AccordionTrigger>
                        <AccordionContent className="space-y-2 text-sm">
                            <p><strong>Eye Contact:</strong> {chemical.firstAid.eye}</p>
                            <p><strong>Skin Contact:</strong> {chemical.firstAid.skin}</p>
                            <p><strong>Inhalation:</strong> {chemical.firstAid.inhalation}</p>
                            <p><strong>Ingestion:</strong> {chemical.firstAid.ingestion}</p>
                        </AccordionContent>
                     </AccordionItem>
                  )}
                </Accordion>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="uses">
            <ScrollArea className="h-[calc(100vh-20rem)]">
                <Card>
                    <CardHeader><CardTitle>Common Uses</CardTitle></CardHeader>
                    <CardContent>
                    {chemical.uses && chemical.uses.length > 0 ? (
                        <ul className="list-disc pl-5 space-y-1">
                        {chemical.uses.map((use, i) => <li key={i}>{use}</li>)}
                        </ul>
                    ) : (
                        <p>No specific uses listed.</p>
                    )}
                    </CardContent>
                </Card>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </main>
      <footer className="py-6 text-center text-sm text-slate-600 dark:text-slate-400 border-t bg-background/95 mt-auto">
        © {new Date().getFullYear()} ChemInfoHub. All rights reserved.
      </footer>
    </div>
  );
};

export default ChemicalDetailPage;