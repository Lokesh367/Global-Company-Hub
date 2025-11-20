import { FilterOptions } from '../types/company';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Button } from './ui/button';
import { Search, X, LayoutGrid, Table2 } from 'lucide-react';

interface FilterControlsProps {
  filters: FilterOptions;
  onFilterChange: (filters: Partial<FilterOptions>) => void;
  onReset: () => void;
  industries: string[];
  locations: string[];
  viewMode: 'table' | 'card';
  onViewModeChange: (mode: 'table' | 'card') => void;
}

export function FilterControls({
  filters,
  onFilterChange,
  onReset,
  industries,
  locations,
  viewMode,
  onViewModeChange,
}: FilterControlsProps) {
  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-border/50 dark:border-slate-700/50 rounded-2xl p-4 space-y-4 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
            <Search className="w-3.5 h-3.5 text-white" />
          </div>
          <h2 className="tracking-tight dark:text-slate-100 text-sm">Filters & Search</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'table' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewModeChange('table')}
            className={viewMode === 'table' ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md' : ''}
          >
            <Table2 className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'card' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewModeChange('card')}
            className={viewMode === 'card' ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md' : ''}
          >
            <LayoutGrid className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Search Input */}
        <div className="space-y-1.5">
          <Label htmlFor="search" className="text-xs dark:text-slate-200">Search</Label>
          <div className="relative group">
            <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground dark:text-slate-400 group-focus-within:text-indigo-500 dark:group-focus-within:text-indigo-400 transition-colors" />
            <Input
              id="search"
              placeholder="Search companies..."
              value={filters.search}
              onChange={(e) => onFilterChange({ search: e.target.value })}
              className="pl-8 h-9 text-sm bg-white/50 dark:bg-slate-800/50 dark:text-slate-200 dark:placeholder:text-slate-500 border-border/50 dark:border-slate-700/50 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/50 transition-all"
            />
          </div>
        </div>

        {/* Industry Filter */}
        <div className="space-y-1.5">
          <Label htmlFor="industry" className="text-xs dark:text-slate-200">Industry</Label>
          <Select
            value={filters.industry}
            onValueChange={(value) => onFilterChange({ industry: value })}
          >
            <SelectTrigger id="industry" className="h-9 text-sm bg-white/50 dark:bg-slate-800/50 dark:text-slate-200 border-border/50 dark:border-slate-700/50 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-[300px] dark:bg-slate-800 dark:border-slate-700">
              <SelectItem value="all" className="text-sm">All industries</SelectItem>
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry} className="text-sm dark:text-slate-200 dark:focus:bg-slate-700">
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Location Filter */}
        <div className="space-y-1.5">
          <Label htmlFor="location" className="text-xs dark:text-slate-200">Location</Label>
          <Select
            value={filters.location}
            onValueChange={(value) => onFilterChange({ location: value })}
          >
            <SelectTrigger id="location" className="h-9 text-sm bg-white/50 dark:bg-slate-800/50 dark:text-slate-200 border-border/50 dark:border-slate-700/50 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-[300px] dark:bg-slate-800 dark:border-slate-700">
              <SelectItem value="all" className="text-sm">All locations</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location} className="text-sm dark:text-slate-200 dark:focus:bg-slate-700">
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort Order */}
        <div className="space-y-1.5">
          <Label htmlFor="sortOrder" className="text-xs dark:text-slate-200">Sort Order</Label>
          <Select
            value={filters.sortOrder}
            onValueChange={(value: 'asc' | 'desc') =>
              onFilterChange({ sortOrder: value })
            }
          >
            <SelectTrigger id="sortOrder" className="h-9 text-sm bg-white/50 dark:bg-slate-800/50 dark:text-slate-200 border-border/50 dark:border-slate-700/50 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
              <SelectItem value="asc" className="text-sm dark:text-slate-200 dark:focus:bg-slate-700">Ascending</SelectItem>
              <SelectItem value="desc" className="text-sm dark:text-slate-200 dark:focus:bg-slate-700">Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end pt-1">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onReset}
          className="h-8 text-xs hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-800 transition-colors"
        >
          <X className="w-3 h-3 mr-1.5" />
          Reset Filters
        </Button>
      </div>
    </div>
  );
}