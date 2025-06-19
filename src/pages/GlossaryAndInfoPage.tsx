import React from 'react';
import { Link } from 'react-router-dom';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { BookText, ShieldAlert, Info, Scale } from 'lucide-react';

const glossaryTerms = [
  { term: 'CAS Number', definition: 'A unique numerical identifier assigned by the Chemical Abstracts Service (CAS) to every chemical substance described in the open scientific literature.' },
  { term: 'SMILES', definition: 'Simplified Molecular Input Line Entry System, a linear notation for describing the structure of chemical molecules.' },
  { term: 'SDS', definition: 'Safety Data Sheet, a document that provides comprehensive information about a substance or mixture for use in workplace chemical management.' },
  { term: 'GHS', definition: 'Globally Harmonized System of Classification and Labelling of Chemicals, an internationally agreed-upon standard managed by the United Nations that was set up to replace the various classification and labelling standards used in different countries.' },
  { term: 'NFPA 704', definition: 'A standard maintained by the U.S.-based National Fire Protection Association. It defines the "fire diamond" used by emergency personnel to quickly and easily identify the risks posed by hazardous materials.' },
];

const unitExplanations = [
  { symbol: '°C', name: 'Degrees Celsius', description: 'Unit of temperature.' },
  { symbol: 'g/mol', name: 'Grams per mole', description: 'Unit of molar mass.' },
  { symbol: 'g/cm³', name: 'Grams per cubic centimeter', description: 'Unit of density.' },
  { symbol: 'ppm', name: 'Parts per million', description: 'Unit of concentration.' },
];

const GlossaryAndInfoPage: React.FC = () => {
  console.log('GlossaryAndInfoPage loaded');

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
              <BreadcrumbPage>Glossary & Information</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-3xl font-bold mb-8 text-center">Glossary & Supplementary Information</h1>

        <ScrollArea className="h-[calc(100vh-15rem)] pr-4"> {/* Adjust height as needed */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><BookText className="mr-2 h-6 w-6 text-sky-600 dark:text-sky-400" />Glossary of Chemical Terms</CardTitle>
                <CardDescription>Common terms used throughout the ChemInfoHub.</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {glossaryTerms.map((item, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                      <AccordionTrigger className="text-base">{item.term}</AccordionTrigger>
                      <AccordionContent className="text-sm">{item.definition}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><Scale className="mr-2 h-6 w-6 text-sky-600 dark:text-sky-400" />Units and Symbols</CardTitle>
                <CardDescription>Explanation of common units and symbols.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {unitExplanations.map((unit, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{unit.symbol}</TableCell>
                        <TableCell>{unit.name}</TableCell>
                        <TableCell className="text-sm">{unit.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><ShieldAlert className="mr-2 h-6 w-6 text-red-600 dark:text-red-400" />General Laboratory Safety</CardTitle>
                <CardDescription>Basic safety guidelines. Always refer to specific SDS for detailed information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>1. Always wear appropriate Personal Protective Equipment (PPE), including safety goggles, gloves, and lab coats.</p>
                <p>2. Know the location and operation of safety equipment (e.g., eyewash stations, safety showers, fire extinguishers).</p>
                <p>3. Never eat, drink, or smoke in the laboratory.</p>
                <p>4. Handle chemicals with care, and be aware of their specific hazards.</p>
                <p>5. Dispose of chemical waste properly according to established procedures.</p>
                <p><strong>Note:</strong> This is not an exhaustive list. Always follow your institution's safety protocols and consult specific Safety Data Sheets (SDS).</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><Info className="mr-2 h-6 w-6 text-sky-600 dark:text-sky-400" />Data Sources & Disclaimer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p><strong>Data Sources:</strong> Information on ChemInfoHub is compiled from publicly available databases, scientific literature, and regulatory sources. While we strive for accuracy, data may not always be complete or up-to-date.</p>
                <p><strong>Disclaimer:</strong> The information provided on ChemInfoHub is for informational and educational purposes only. It is not intended as a substitute for professional advice, diagnosis, or treatment. Always seek the advice of qualified professionals for any questions you may have regarding a chemical substance or its handling. ChemInfoHub and its contributors assume no liability for any damages or loss arising from the use of information on this site.</p>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </main>
      <footer className="py-6 text-center text-sm text-slate-600 dark:text-slate-400 border-t bg-background/95 mt-auto">
        © {new Date().getFullYear()} ChemInfoHub. All rights reserved.
      </footer>
    </div>
  );
};

export default GlossaryAndInfoPage;