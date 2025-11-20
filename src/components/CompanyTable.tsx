import { Company, FilterOptions } from '../types/company';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Badge } from './ui/badge';
import { ArrowUpDown, ArrowUp, ArrowDown, Star, Eye, Building2 } from 'lucide-react';
import { Button } from './ui/button';

interface CompanyTableProps {
  companies: Company[];
  filters: FilterOptions;
  onSortChange: (sortBy: FilterOptions['sortBy']) => void;
  isFavorite: (companyId: string) => boolean;
  onToggleFavorite: (companyId: string) => void;
  onViewDetails: (company: Company) => void;
}

export function CompanyTable({ companies, filters, onSortChange, isFavorite, onToggleFavorite, onViewDetails }: CompanyTableProps) {
  const getSortIcon = (column: FilterOptions['sortBy']) => {
    if (filters.sortBy !== column) {
      return <ArrowUpDown className="w-4 h-4 ml-2" />;
    }
    return filters.sortOrder === 'asc' ? (
      <ArrowUp className="w-4 h-4 ml-2" />
    ) : (
      <ArrowDown className="w-4 h-4 ml-2" />
    );
  };

  return (
    <div className="border border-border/50 dark:border-slate-700/50 rounded-2xl overflow-x-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-sm animate-slide-in">
      <Table>
        <TableHeader>
          <TableRow className="bg-gradient-to-r from-slate-50 to-slate-100/50 dark:from-slate-800 dark:to-slate-800/50 hover:from-slate-100 hover:to-slate-100 dark:hover:from-slate-700 dark:hover:to-slate-700 border-b-2 border-border/50 dark:border-slate-700/50">
            <TableHead className="w-12 px-2 dark:text-slate-300"></TableHead>
            <TableHead className="dark:text-slate-300 min-w-[140px]">
              <Button
                variant="ghost"
                className="hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 dark:text-slate-300 p-0 transition-colors text-xs"
                onClick={() => onSortChange('name')}
              >
                Company
                {getSortIcon('name')}
              </Button>
            </TableHead>
            <TableHead className="min-w-[100px]">
              <Button
                variant="ghost"
                className="hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 dark:text-slate-300 p-0 transition-colors text-xs"
                onClick={() => onSortChange('industry')}
              >
                Industry
                {getSortIcon('industry')}
              </Button>
            </TableHead>
            <TableHead className="min-w-[90px]">
              <Button
                variant="ghost"
                className="hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 dark:text-slate-300 p-0 transition-colors text-xs"
                onClick={() => onSortChange('location')}
              >
                Location
                {getSortIcon('location')}
              </Button>
            </TableHead>
            <TableHead className="dark:text-slate-300 min-w-[80px] text-xs">Country</TableHead>
            <TableHead className="min-w-[85px]">
              <Button
                variant="ghost"
                className="hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 dark:text-slate-300 p-0 transition-colors text-xs"
                onClick={() => onSortChange('employees')}
              >
                Employees
                {getSortIcon('employees')}
              </Button>
            </TableHead>
            <TableHead className="dark:text-slate-300 w-16 text-xs">Rating</TableHead>
            <TableHead className="w-20 text-center dark:text-slate-300 text-xs">View</TableHead>
            <TableHead className="w-12 dark:text-slate-300"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.length === 0 ? (
            <TableRow>
              <TableCell colSpan={10} className="text-center py-12">
                <div className="flex flex-col items-center gap-3">
                  <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full">
                    <Building2 className="w-8 h-8 text-slate-400 dark:text-slate-500" />
                  </div>
                  <p className="text-muted-foreground dark:text-slate-400">No companies found matching your filters.</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            companies.map((company) => (
              <TableRow key={company.id} className="group hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 dark:hover:from-indigo-900/20 dark:hover:to-purple-900/20 transition-all duration-200">
                <TableCell className="px-2">
                  <div className="text-2xl">{company.logo}</div>
                </TableCell>
                <TableCell className="px-2">
                  <div className="group-hover:text-indigo-600 dark:group-hover:text-indigo-400 dark:text-slate-200 transition-colors text-sm whitespace-nowrap">{company.name}</div>
                </TableCell>
                <TableCell className="px-2">
                  <Badge variant="secondary" className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 text-indigo-700 dark:text-indigo-300 border-0 text-[10px] px-1.5 py-0 whitespace-nowrap">
                    {company.industry}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs dark:text-slate-300 px-2 whitespace-nowrap">{company.location}</TableCell>
                <TableCell className="text-xs dark:text-slate-300 px-2 whitespace-nowrap">{company.country}</TableCell>
                <TableCell className="text-xs dark:text-slate-300 px-2 whitespace-nowrap">{company.employees.toLocaleString()}</TableCell>
                <TableCell className="px-2">
                  <div className="flex items-center gap-0.5">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span className="text-xs dark:text-slate-300">{company.rating.toFixed(1)}</span>
                  </div>
                </TableCell>
                <TableCell className="px-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewDetails(company)}
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 hover:from-indigo-600 hover:to-purple-700 hover:shadow-md transition-all duration-200 h-7 px-2 text-[10px]"
                  >
                    <Eye className="w-3 h-3" />
                  </Button>
                </TableCell>
                <TableCell className="px-1">
                  <Button
                    variant={isFavorite(company.id) ? 'default' : 'ghost'}
                    size="icon"
                    className={`h-7 w-7 transition-all duration-200 ${
                      isFavorite(company.id)
                        ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-md hover:shadow-lg hover:scale-110'
                        : 'hover:bg-amber-50 dark:hover:bg-amber-900/30 hover:text-amber-600 dark:hover:text-amber-400'
                    }`}
                    onClick={() => onToggleFavorite(company.id)}
                  >
                    <Star className={`w-3.5 h-3.5 ${isFavorite(company.id) ? 'fill-current' : ''}`} />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}