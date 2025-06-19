import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import PeriodicTableTile from '@/components/PeriodicTableTile';
// Tooltip is used by PeriodicTableTile internally, but TooltipProvider might be needed at page level for multiple tooltips.
// For this specific component list, we'll assume PeriodicTableTile manages its own tooltips via its own TooltipProvider.
// If additional tooltips were needed on this page directly, we would import Tooltip, TooltipProvider, etc. here.

const elementsData = [
  // Row 1
  { atomicNumber: 1, symbol: 'H', name: 'Hydrogen', category: 'nonmetal', atomicMass: '1.008' },
  { isPlaceholder: true, span: 16 }, // Span 16 columns
  { atomicNumber: 2, symbol: 'He', name: 'Helium', category: 'noble-gas', atomicMass: '4.0026' },
  // Row 2
  { atomicNumber: 3, symbol: 'Li', name: 'Lithium', category: 'alkali-metal', atomicMass: '6.94' },
  { atomicNumber: 4, symbol: 'Be', name: 'Beryllium', category: 'alkaline-earth-metal', atomicMass: '9.0122' },
  { isPlaceholder: true, span: 10 },
  { atomicNumber: 5, symbol: 'B', name: 'Boron', category: 'metalloid', atomicMass: '10.81' },
  { atomicNumber: 6, symbol: 'C', name: 'Carbon', category: 'nonmetal', atomicMass: '12.011' },
  { atomicNumber: 7, symbol: 'N', name: 'Nitrogen', category: 'nonmetal', atomicMass: '14.007' },
  { atomicNumber: 8, symbol: 'O', name: 'Oxygen', category: 'nonmetal', atomicMass: '15.999' },
  { atomicNumber: 9, symbol: 'F', name: 'Fluorine', category: 'halogen', atomicMass: '18.998' },
  { atomicNumber: 10, symbol: 'Ne', name: 'Neon', category: 'noble-gas', atomicMass: '20.180' },
  // Row 3
  { atomicNumber: 11, symbol: 'Na', name: 'Sodium', category: 'alkali-metal', atomicMass: '22.990' },
  { atomicNumber: 12, symbol: 'Mg', name: 'Magnesium', category: 'alkaline-earth-metal', atomicMass: '24.305' },
  { isPlaceholder: true, span: 10 },
  { atomicNumber: 13, symbol: 'Al', name: 'Aluminum', category: 'post-transition-metal', atomicMass: '26.982' },
  { atomicNumber: 14, symbol: 'Si', name: 'Silicon', category: 'metalloid', atomicMass: '28.085' },
  { atomicNumber: 15, symbol: 'P', name: 'Phosphorus', category: 'nonmetal', atomicMass: '30.974' },
  { atomicNumber: 16, symbol: 'S', name: 'Sulfur', category: 'nonmetal', atomicMass: '32.06' },
  { atomicNumber: 17, symbol: 'Cl', name: 'Chlorine', category: 'halogen', atomicMass: '35.45' },
  { atomicNumber: 18, symbol: 'Ar', name: 'Argon', category: 'noble-gas', atomicMass: '39.948' },
  // Add more elements for a fuller table...
  // For brevity, only a few rows are represented. A full table would have many more.
  // Example for Lanthanides/Actinides placeholder reference
  { isPlaceholder: true, row: 6, col: 3, text: '*Lanthanides', category: 'lanthanide'},
  { isPlaceholder: true, row: 7, col: 3, text: '**Actinides', category: 'actinide'},
];


const InteractivePeriodicTablePage: React.FC = () => {
  const navigate = useNavigate();
  console.log('InteractivePeriodicTablePage loaded');

  const handleTileClick = (symbol: string) => {
    // This could navigate to an element detail page or a chemical listing page filtered by this element.
    // For this example, let's navigate to chemical listing page with element as search query.
    const elementName = elementsData.find(el => el.symbol === symbol)?.name;
    if (elementName) {
        navigate(`/chemical-listing?search=${encodeURIComponent(elementName)}`);
    }
    console.log(`Clicked on element: ${symbol}`);
  };

  // Create a grid structure. This is a simplified representation.
  // A real periodic table has a more complex layout.
  const gridCells = [];
  let currentElementIndex = 0;
  for (let i = 0; i < elementsData.length; i++) {
    const el = elementsData[i];
    if (el.isPlaceholder) {
      if (el.span) { // Horizontal span
        gridCells.push(<div key={`placeholder-${i}`} style={{ gridColumn: `span ${el.span}` }} className="hidden md:block" />);
      } else if (el.row && el.col) { // Specific position for Lanthanide/Actinide markers
         // This requires a more complex grid setup to place these accurately.
         // For this example, we'll just list them. A proper CSS grid would handle placement.
         gridCells.push(
            <div key={`placeholder-ref-${i}`} className={`p-2 text-xs text-center ${el.category === 'lanthanide' ? 'bg-yellow-100 dark:bg-yellow-800' : 'bg-amber-100 dark:bg-amber-800'} rounded`}>
                {el.text}
            </div>
         );
      } else {
        gridCells.push(<div key={`placeholder-${i}`} className="hidden md:block" />); // Default empty cell
      }
    } else {
      gridCells.push(
        <PeriodicTableTile
          key={el.symbol}
          atomicNumber={el.atomicNumber!}
          symbol={el.symbol!}
          name={el.name!}
          atomicMass={el.atomicMass}
          category={el.category}
          onClick={handleTileClick}
        />
      );
      currentElementIndex++;
    }
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
              <BreadcrumbPage>Interactive Periodic Table</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-3xl font-bold mb-6 text-center">Interactive Periodic Table of Elements</h1>
        
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-6">
            Click on an element to search for chemicals containing it or view more information. (This is a simplified representation).
        </p>

        <div className="grid grid-cols-18 gap-0.5 p-1 md:p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md overflow-x-auto">
          {/* This layout is highly simplified. A real periodic table uses CSS grid tricks for lanthanides/actinides and group/period layout. */}
          {/* The grid-cols-18 is a common base for periodic tables. */}
          {gridCells}
        </div>
        
        {/* Legend (Optional) */}
        <div className="mt-8 p-4 bg-white dark:bg-slate-800 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">Category Legend:</h3>
            <div className="flex flex-wrap gap-2 text-xs">
                <span className="p-1 px-2 rounded bg-red-200 dark:bg-red-700 dark:text-gray-900">Alkali Metal</span>
                <span className="p-1 px-2 rounded bg-orange-200 dark:bg-orange-700 dark:text-gray-900">Alkaline Earth Metal</span>
                <span className="p-1 px-2 rounded bg-lime-200 dark:bg-lime-700 dark:text-gray-900">Transition Metal</span>
                <span className="p-1 px-2 rounded bg-green-200 dark:bg-green-700 dark:text-gray-900">Post-Transition Metal</span>
                <span className="p-1 px-2 rounded bg-teal-200 dark:bg-teal-700 dark:text-gray-900">Metalloid</span>
                <span className="p-1 px-2 rounded bg-cyan-200 dark:bg-cyan-700 dark:text-gray-900">Nonmetal</span>
                <span className="p-1 px-2 rounded bg-sky-200 dark:bg-sky-700 dark:text-gray-900">Halogen</span>
                <span className="p-1 px-2 rounded bg-blue-200 dark:bg-blue-700 dark:text-gray-900">Noble Gas</span>
                <span className="p-1 px-2 rounded bg-yellow-200 dark:bg-yellow-700 dark:text-gray-900">Lanthanide</span>
                <span className="p-1 px-2 rounded bg-amber-200 dark:bg-amber-700 dark:text-gray-900">Actinide</span>
            </div>
        </div>

      </main>
       <footer className="py-6 text-center text-sm text-slate-600 dark:text-slate-400 border-t bg-background/95 mt-auto">
        © {new Date().getFullYear()} ChemInfoHub. All rights reserved.
      </footer>
    </div>
  );
};

export default InteractivePeriodicTablePage;