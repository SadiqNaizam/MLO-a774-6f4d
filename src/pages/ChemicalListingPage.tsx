import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/layout/Sidebar";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import ChemicalInfoCard from '@/components/ChemicalInfoCard';
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext, PaginationEllipsis } from "@/components/ui/pagination";
import { Filter, ListChecks, SortAsc, Search } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface Chemical {
  id: string;
  name: string;
  formula?: string;
  casNumber?: string;
  molecularWeight?: string | number;
  tags?: string[];
}

const mockChemicals: Chemical[] = [
  { id: '1', name: 'Acetone', formula: 'C3H6O', casNumber: '67-64-1', molecularWeight: '58.08', tags: ['Solvent', 'Flammable'] },
  { id: '2', name: 'Ethanol', formula: 'C2H5OH', casNumber: '64-17-5', molecularWeight: '46.07', tags: ['Solvent', 'Alcohol', 'Flammable'] },
  { id: '3', name: 'Sodium Chloride', formula: 'NaCl', casNumber: '7647-14-5', molecularWeight: '58.44', tags: ['Salt', 'Solid'] },
  { id: '4', name: 'Sulfuric Acid', formula: 'H2SO4', casNumber: '7664-93-9', molecularWeight: '98.08', tags: ['Acid', 'Corrosive', 'Liquid'] },
  { id: '5', name: 'Benzene', formula: 'C6H6', casNumber: '71-43-2', molecularWeight: '78.11', tags: ['Organic', 'Carcinogen', 'Flammable'] },
  { id: '6', name: 'Ammonia', formula: 'NH3', casNumber: '7664-41-7', molecularWeight: '17.03', tags: ['Gas', 'Corrosive', 'Toxic'] },
];

const ITEMS_PER_PAGE = 10;

const ChemicalListingPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [displayedChemicals, setDisplayedChemicals] = useState<Chemical[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('name-asc');
  
  // Filters - example
  const [filterFlammable, setFilterFlammable] = useState(false);
  const [filterToxic, setFilterToxic] = useState(false);

  useEffect(() => {
    console.log('ChemicalListingPage loaded');
    const queryParams = new URLSearchParams(location.search);
    const initialSearch = queryParams.get('search') || '';
    setSearchTerm(initialSearch);
  }, [location.search]);

  useEffect(() => {
    let filtered = mockChemicals.filter(chem => 
      chem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chem.casNumber?.includes(searchTerm) ||
      chem.formula?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterFlammable) {
      filtered = filtered.filter(chem => chem.tags?.includes('Flammable'));
    }
    if (filterToxic) {
      filtered = filtered.filter(chem => chem.tags?.includes('Toxic'));
    }
    
    // Sorting
    filtered.sort((a, b) => {
      if (sortOption === 'name-asc') return a.name.localeCompare(b.name);
      if (sortOption === 'name-desc') return b.name.localeCompare(a.name);
      if (sortOption === 'mw-asc') return Number(a.molecularWeight || 0) - Number(b.molecularWeight || 0);
      if (sortOption === 'mw-desc') return Number(b.molecularWeight || 0) - Number(a.molecularWeight || 0);
      return 0;
    });

    setDisplayedChemicals(filtered);
    setCurrentPage(1); // Reset to first page on search/filter change
  }, [searchTerm, filterFlammable, filterToxic, sortOption]);

  const totalPages = Math.ceil(displayedChemicals.length / ITEMS_PER_PAGE);
  const paginatedChemicals = displayedChemicals.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleViewDetails = (id: string | number) => {
    navigate(`/chemical-detail/${id}`);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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
              <BreadcrumbPage>Chemical Listing</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col md:flex-row gap-8">
          <Sidebar title="Filter & Sort Options" className="md:sticky md:top-20 self-start">
            <div className="space-y-4">
              <div>
                <Label htmlFor="search-refine" className="text-sm font-medium">Refine Search</Label>
                <div className="relative mt-1">
                    <Input 
                        id="search-refine"
                        type="search" 
                        placeholder="Search within results..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                    />
                    <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2 flex items-center"><Filter className="h-4 w-4 mr-2" />Filter by Tags</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="filter-flammable" checked={filterFlammable} onCheckedChange={(checked) => setFilterFlammable(!!checked)} />
                    <Label htmlFor="filter-flammable" className="text-sm font-normal">Flammable</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="filter-toxic" checked={filterToxic} onCheckedChange={(checked) => setFilterToxic(!!checked)} />
                    <Label htmlFor="filter-toxic" className="text-sm font-normal">Toxic</Label>
                  </div>
                  {/* Add more checkboxes for other tags/categories */}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2 flex items-center"><SortAsc className="h-4 w-4 mr-2" />Sort By</h3>
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sort option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                    <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                    <SelectItem value="mw-asc">Molecular Weight (Low to High)</SelectItem>
                    <SelectItem value="mw-desc">Molecular Weight (High to Low)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full mt-4" onClick={() => { /* Could apply all filters at once */ }}>
                <ListChecks className="mr-2 h-4 w-4" /> Apply Filters
              </Button>
            </div>
          </Sidebar>

          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-6">Chemicals Found ({displayedChemicals.length})</h1>
            {paginatedChemicals.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedChemicals.map(chem => (
                  <ChemicalInfoCard
                    key={chem.id}
                    id={chem.id}
                    name={chem.name}
                    formula={chem.formula}
                    casNumber={chem.casNumber}
                    molecularWeight={chem.molecularWeight}
                    tags={chem.tags}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400 py-10">
                No chemicals found matching your criteria.
              </p>
            )}

            {totalPages > 1 && (
              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => {
                     // Basic pagination display logic, can be improved for many pages
                    if (totalPages <= 5 || (i < 2 || i > totalPages - 3) || Math.abs(i + 1 - currentPage) <= 1) {
                       return (
                        <PaginationItem key={i + 1}>
                            <PaginationLink 
                                href="#" 
                                isActive={currentPage === i + 1}
                                onClick={(e) => { e.preventDefault(); handlePageChange(i + 1); }}
                            >
                            {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                       );
                    } else if (i === 2 && currentPage > 3) {
                        return <PaginationItem key="ellipsis-start"><PaginationEllipsis /></PaginationItem>;
                    } else if (i === totalPages - 3 && currentPage < totalPages - 2) {
                        return <PaginationItem key="ellipsis-end"><PaginationEllipsis /></PaginationItem>;
                    }
                    return null;
                  })}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </div>
      </main>
       <footer className="py-6 text-center text-sm text-slate-600 dark:text-slate-400 border-t bg-background/95 mt-auto">
        © {new Date().getFullYear()} ChemInfoHub. All rights reserved.
      </footer>
    </div>
  );
};

export default ChemicalListingPage;