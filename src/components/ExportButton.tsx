import { Download } from 'lucide-react';
import { Button } from './ui/button';
import { Company } from '../types/company';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface ExportButtonProps {
  companies: Company[];
}

export function ExportButton({ companies }: ExportButtonProps) {
  const exportToCSV = () => {
    const headers = ['Name', 'Industry', 'Location', 'Country', 'Employees', 'Founded', 'Revenue', 'Rating'];
    const rows = companies.map(c => [
      c.name,
      c.industry,
      c.location,
      c.country,
      c.employees.toString(),
      c.founded.toString(),
      c.revenue,
      c.rating.toString(),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `companies-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const exportToJSON = () => {
    const json = JSON.stringify(companies, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `companies-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-white/60 backdrop-blur-sm border-border/50 hover:bg-white/80 transition-all"
        >
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-xl">
        <DropdownMenuItem onClick={exportToCSV} className="cursor-pointer">
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToJSON} className="cursor-pointer">
          Export as JSON
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
