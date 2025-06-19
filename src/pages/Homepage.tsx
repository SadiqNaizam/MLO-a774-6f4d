import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Search, BookOpen, Grid } from 'lucide-react';

const Homepage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  console.log('Homepage loaded');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/chemical-listing?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-sky-100 dark:from-slate-900 dark:to-sky-900">
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

      <main className="flex-grow container mx-auto px-4 py-12 flex flex-col items-center justify-center">
        <Card className="w-full max-w-2xl shadow-xl mb-12 bg-white dark:bg-slate-800">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-sky-700 dark:text-sky-400">Welcome to ChemInfoHub</CardTitle>
            <CardDescription className="text-lg text-slate-600 dark:text-slate-300 pt-2">
              Your comprehensive resource for chemical information and safety data.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 items-center">
              <Label htmlFor="chemical-search" className="sr-only">Search for a chemical</Label>
              <Input
                id="chemical-search"
                type="search"
                placeholder="Enter chemical name, CAS number, or formula (e.g., Acetone)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow text-base p-3"
              />
              <Button type="submit" size="lg" className="w-full sm:w-auto bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:dark:bg-sky-600">
                <Search className="mr-2 h-5 w-5" /> Search
              </Button>
            </form>
          </CardContent>
        </Card>

        <section className="grid md:grid-cols-3 gap-6 w-full max-w-4xl text-center">
          <Card className="hover:shadow-lg transition-shadow bg-white dark:bg-slate-800">
            <CardHeader>
              <Grid className="mx-auto h-12 w-12 text-sky-600 dark:text-sky-400 mb-2" />
              <CardTitle>Browse Chemicals</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500 dark:text-slate-400">Explore our extensive database of chemical compounds.</p>
              <Button variant="outline" className="mt-4" onClick={() => navigate('/chemical-listing')}>
                Start Browsing
              </Button>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow bg-white dark:bg-slate-800">
            <CardHeader>
              <img src="https://cdn-icons-png.flaticon.com/512/2282/2282044.png" alt="Periodic Table Icon" className="mx-auto h-12 w-12 mb-2"/>
              <CardTitle>Interactive Periodic Table</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500 dark:text-slate-400">Discover elements and their properties interactively.</p>
              <Button variant="outline" className="mt-4" onClick={() => navigate('/periodic-table')}>
                View Table
              </Button>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow bg-white dark:bg-slate-800">
            <CardHeader>
              <BookOpen className="mx-auto h-12 w-12 text-sky-600 dark:text-sky-400 mb-2" />
              <CardTitle>Glossary & Safety</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500 dark:text-slate-400">Understand chemical terms and general safety guidelines.</p>
              <Button variant="outline" className="mt-4" onClick={() => navigate('/glossary-info')}>
                Learn More
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="py-6 text-center text-sm text-slate-600 dark:text-slate-400 border-t bg-background/95">
        © {new Date().getFullYear()} ChemInfoHub. All rights reserved.
      </footer>
    </div>
  );
};

export default Homepage;