import { Company } from '../types/company';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import {
  Building2,
  MapPin,
  Users,
  Calendar,
  DollarSign,
  Mail,
  Phone,
  Globe,
  Star,
  Award,
} from 'lucide-react';

interface CompanyDetailsModalProps {
  company: Company | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (companyId: string) => void;
}

export function CompanyDetailsModal({
  company,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
}: CompanyDetailsModalProps) {
  if (!company) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-border/50 dark:border-slate-700/50">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500"></div>
        <DialogHeader className="pt-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 flex items-start gap-4">
              {/* Company Logo */}
              <div className="text-6xl">{company.logo}</div>
              <div className="flex-1">
                <DialogTitle className="flex items-center gap-3 text-3xl dark:text-slate-100">
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                    {company.name}
                  </span>
                </DialogTitle>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-700">
                    {company.industry}
                  </Badge>
                  <div className="flex items-center gap-1 px-3 py-1 bg-amber-50 dark:bg-amber-900/30 rounded-full border border-amber-200 dark:border-amber-700">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="text-sm dark:text-amber-200">{company.rating.toFixed(1)} / 5.0</span>
                  </div>
                </div>
                <DialogDescription className="mt-3 text-base dark:text-slate-400">
                  Complete company profile and information
                </DialogDescription>
              </div>
            </div>
            <Button
              variant={isFavorite ? 'default' : 'outline'}
              size="sm"
              onClick={() => onToggleFavorite(company.id)}
              className={`transition-all duration-200 shrink-0 ml-2 ${
                isFavorite
                  ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg hover:shadow-xl hover:scale-105'
                  : 'hover:bg-amber-50 dark:hover:bg-amber-900/30 hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-200 dark:hover:border-amber-700'
              }`}
            >
              <Star className={`w-4 h-4 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
              {isFavorite ? 'Favorited' : 'Add to Favorites'}
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Description */}
          <div className="bg-gradient-to-br from-slate-50 to-indigo-50/30 dark:from-slate-800 dark:to-indigo-900/20 rounded-xl p-5 border border-border/50 dark:border-slate-700/50">
            <h3 className="mb-3 flex items-center gap-2 dark:text-slate-100">
              <div className="w-1 h-5 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full"></div>
              About
            </h3>
            <p className="text-muted-foreground dark:text-slate-400 leading-relaxed">{company.description}</p>
          </div>

          <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />

          {/* Company Details Grid */}
          <div>
            <h3 className="mb-5 flex items-center gap-2 dark:text-slate-100">
              <div className="w-1 h-5 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full"></div>
              Company Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-100 dark:border-blue-900/50 hover:shadow-md transition-shadow">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground dark:text-slate-400">Location</p>
                  <p className="mt-0.5 dark:text-slate-200">{company.location}</p>
                  <p className="text-xs text-muted-foreground dark:text-slate-500 mt-1">{company.country}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-100 dark:border-purple-900/50 hover:shadow-md transition-shadow">
                <div className="p-2 bg-purple-500 rounded-lg">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground dark:text-slate-400">Employees</p>
                  <p className="mt-0.5 dark:text-slate-200">{company.employees.toLocaleString()} employees</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-100 dark:border-green-900/50 hover:shadow-md transition-shadow">
                <div className="p-2 bg-green-500 rounded-lg">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground dark:text-slate-400">Founded</p>
                  <p className="mt-0.5 dark:text-slate-200">{company.founded}</p>
                  <p className="text-sm text-muted-foreground dark:text-slate-500">
                    {new Date().getFullYear() - company.founded} years in business
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-100 dark:border-amber-900/50 hover:shadow-md transition-shadow">
                <div className="p-2 bg-amber-500 rounded-lg">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground dark:text-slate-400">Annual Revenue</p>
                  <p className="mt-0.5 dark:text-slate-200">{company.revenue}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/30 border border-yellow-100 dark:border-yellow-900/50 hover:shadow-md transition-shadow">
                <div className="p-2 bg-yellow-500 rounded-lg">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground dark:text-slate-400">Company Rating</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="dark:text-slate-200">{company.rating.toFixed(1)} out of 5.0</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30 border border-rose-100 dark:border-rose-900/50 hover:shadow-md transition-shadow">
                <div className="p-2 bg-rose-500 rounded-lg">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground dark:text-slate-400">Company Size</p>
                  <p className="mt-0.5 dark:text-slate-200">
                    {company.employees < 100
                      ? 'Small (< 100)'
                      : company.employees < 1000
                      ? 'Medium (100-1K)'
                      : company.employees < 5000
                      ? 'Large (1K-5K)'
                      : 'Enterprise (5K+)'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />

          {/* Contact Information */}
          <div>
            <h3 className="mb-5 flex items-center gap-2 dark:text-slate-100">
              <div className="w-1 h-5 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full"></div>
              Contact Information
            </h3>
            <div className="space-y-3 bg-gradient-to-br from-slate-50 to-indigo-50/30 dark:from-slate-800 dark:to-indigo-900/20 rounded-xl p-5 border border-border/50 dark:border-slate-700/50">
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/60 dark:hover:bg-slate-700/50 transition-colors">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg">
                  <Globe className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <a
                  href={`https://www.${company.name.toLowerCase().replace(/\s+/g, '')}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:underline transition-colors"
                >
                  www.{company.name.toLowerCase().replace(/\s+/g, '')}.com
                </a>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/60 dark:hover:bg-slate-700/50 transition-colors">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                  <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <a
                  href={`mailto:info@${company.name.toLowerCase().replace(/\s+/g, '')}.com`}
                  className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:underline transition-colors"
                >
                  info@{company.name.toLowerCase().replace(/\s+/g, '')}.com
                </a>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/60 dark:hover:bg-slate-700/50 transition-colors">
                <div className="p-2 bg-pink-100 dark:bg-pink-900/50 rounded-lg">
                  <Phone className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                </div>
                <span className="text-muted-foreground dark:text-slate-400">+1 (555) 000-0000</span>
              </div>
            </div>
          </div>

          <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />

          {/* Additional Info */}
          <div>
            <h3 className="mb-5 flex items-center gap-2 dark:text-slate-100">
              <div className="w-1 h-5 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full"></div>
              Industry Insights
            </h3>
            <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/30 dark:via-purple-950/30 dark:to-pink-950/30 rounded-xl p-5 space-y-3 border border-indigo-100 dark:border-indigo-900/50">
              <div className="flex justify-between p-3 rounded-lg bg-white/60 dark:bg-slate-800/50 hover:bg-white/80 dark:hover:bg-slate-700/50 transition-colors">
                <span className="text-muted-foreground dark:text-slate-400">Company Size</span>
                <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-lg">
                  {company.employees < 100
                    ? 'Small'
                    : company.employees < 1000
                    ? 'Medium'
                    : company.employees < 5000
                    ? 'Large'
                    : 'Enterprise'}
                </span>
              </div>
              <div className="flex justify-between p-3 rounded-lg bg-white/60 dark:bg-slate-800/50 hover:bg-white/80 dark:hover:bg-slate-700/50 transition-colors">
                <span className="text-muted-foreground dark:text-slate-400">Industry Sector</span>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-lg">{company.industry}</span>
              </div>
              <div className="flex justify-between p-3 rounded-lg bg-white/60 dark:bg-slate-800/50 hover:bg-white/80 dark:hover:bg-slate-700/50 transition-colors">
                <span className="text-muted-foreground dark:text-slate-400">Years of Experience</span>
                <span className="px-3 py-1 bg-pink-100 dark:bg-pink-900/50 text-pink-700 dark:text-pink-300 rounded-lg">
                  {new Date().getFullYear() - company.founded} years
                </span>
              </div>
              <div className="flex justify-between p-3 rounded-lg bg-white/60 dark:bg-slate-800/50 hover:bg-white/80 dark:hover:bg-slate-700/50 transition-colors">
                <span className="text-muted-foreground dark:text-slate-400">Global Presence</span>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-lg">
                  {company.country}
                </span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}