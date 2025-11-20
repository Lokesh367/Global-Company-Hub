import { Company } from '../types/company';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Building2, MapPin, Users, Calendar, DollarSign, Star, Eye, Globe } from 'lucide-react';

interface CompanyCardProps {
  company: Company;
  isFavorite: boolean;
  onToggleFavorite: (companyId: string) => void;
  onViewDetails: (company: Company) => void;
}

export function CompanyCard({ company, isFavorite, onToggleFavorite, onViewDetails }: CompanyCardProps) {
  return (
    <Card className="hover:shadow-xl transition-all duration-300 hover:scale-[1.011] bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-border/50 dark:border-slate-700/50 group overflow-hidden animate-slide-in">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <CardHeader className="pb-3 pt-4 px-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2 flex-1 min-w-0">
            {/* Company Logo */}
            <div className="text-3xl shrink-0">{company.logo}</div>
            <div className="flex-1 min-w-0">
              <CardTitle className="flex items-center gap-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors text-sm dark:text-slate-100">
                {company.name}
              </CardTitle>
              <div className="flex items-center gap-1.5 mt-1">
                <Badge variant="outline" className="text-[10px] px-1.5 py-0 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800">
                  {company.industry}
                </Badge>
                <div className="flex items-center gap-0.5">
                  <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                  <span className="text-[10px] dark:text-slate-300">{company.rating.toFixed(1)}</span>
                </div>
              </div>
              <CardDescription className="mt-1.5 line-clamp-2 text-xs dark:text-slate-400">{company.description}</CardDescription>
            </div>
          </div>
          {/* Favorite Button - Now on the right side */}
          <Button
            variant={isFavorite ? 'default' : 'ghost'}
            size="icon"
            className={`h-8 w-8 shrink-0 transition-all duration-200 ${
              isFavorite 
                ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-md hover:shadow-lg hover:scale-110' 
                : 'hover:bg-amber-50 dark:hover:bg-amber-900/30 hover:text-amber-600 dark:hover:text-amber-400'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(company.id);
            }}
          >
            <Star className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 px-4 pb-4">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-1.5 text-muted-foreground dark:text-slate-400 p-1.5 rounded-lg bg-slate-50/50 dark:bg-slate-800/50 group-hover:bg-indigo-50/50 dark:group-hover:bg-indigo-900/30 transition-colors">
            <MapPin className="w-3 h-3 text-indigo-500 dark:text-indigo-400 shrink-0" />
            <span className="text-[10px] truncate">{company.location}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground dark:text-slate-400 p-1.5 rounded-lg bg-slate-50/50 dark:bg-slate-800/50 group-hover:bg-indigo-50/50 dark:group-hover:bg-indigo-900/30 transition-colors">
            <Globe className="w-3 h-3 text-indigo-500 dark:text-indigo-400 shrink-0" />
            <span className="text-[10px] truncate">{company.country}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground dark:text-slate-400 p-1.5 rounded-lg bg-slate-50/50 dark:bg-slate-800/50 group-hover:bg-indigo-50/50 dark:group-hover:bg-indigo-900/30 transition-colors">
            <Users className="w-3 h-3 text-indigo-500 dark:text-indigo-400 shrink-0" />
            <span className="text-[10px]">{company.employees.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground dark:text-slate-400 p-1.5 rounded-lg bg-slate-50/50 dark:bg-slate-800/50 group-hover:bg-indigo-50/50 dark:group-hover:bg-indigo-900/30 transition-colors">
            <Calendar className="w-3 h-3 text-indigo-500 dark:text-indigo-400 shrink-0" />
            <span className="text-[10px]">{company.founded}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground dark:text-slate-400 p-1.5 rounded-lg bg-slate-50/50 dark:bg-slate-800/50 group-hover:bg-indigo-50/50 dark:group-hover:bg-indigo-900/30 transition-colors col-span-2">
            <DollarSign className="w-3 h-3 text-indigo-500 dark:text-indigo-400 shrink-0" />
            <span className="text-[10px] truncate">{company.revenue}</span>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 hover:from-indigo-600 hover:to-purple-700 hover:shadow-lg transition-all duration-200 h-8 text-xs"
          onClick={() => onViewDetails(company)}
        >
          <Eye className="w-3 h-3 mr-1.5" />
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}