import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ title = "Filters", children, className }) => {
  console.log("Rendering Sidebar with title:", title);

  return (
    <aside className={`w-full md:w-72 lg:w-80 p-4 border-r border-gray-200 dark:border-gray-700 space-y-4 ${className}`}>
      {title && (
        <>
          <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">{title}</h2>
          <Separator className="my-4" />
        </>
      )}
      <ScrollArea className="h-[calc(100vh-12rem)] pr-3"> {/* Adjust height as needed */}
        <div className="space-y-3">
          {children ? children : <p className="text-sm text-gray-500 dark:text-gray-400">Sidebar content goes here.</p>}
        </div>
      </ScrollArea>
    </aside>
  );
}

export default Sidebar;