import { useState, useEffect, useCallback } from 'react';
import { Company, FilterOptions, PaginationInfo } from './types/company';
import { fetchCompanies, getIndustries, getLocations } from './utils/mockApi';
import { CompanyTable } from './components/CompanyTable';
import { CompanyCard } from './components/CompanyCard';
import { FilterControls } from './components/FilterControls';
import { CompanyDetailsModal } from './components/CompanyDetailsModal';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { ThemeToggle } from './components/ThemeToggle';
import { ExportButton } from './components/ExportButton';
import { InfiniteScroll } from './components/InfiniteScroll';
import { ScrollToTop } from './components/ScrollToTop';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';
import { Skeleton } from './components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Badge } from './components/ui/badge';
import { AlertCircle, Building2, BarChart3, Star, Loader2, TrendingUp } from 'lucide-react';
import { Button } from './components/ui/button';
import { useFavorites } from './hooks/useFavorites';

export default function App() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [allCompanies, setAllCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'card'>('card');
  const [activeTab, setActiveTab] = useState<'directory' | 'analytics' | 'favorites'>('directory');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  const { favorites, toggleFavorite, isFavorite, favoritesCount } = useFavorites();
  
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    industry: 'all',
    location: 'all',
    sortBy: 'name',
    sortOrder: 'asc',
  });

  const industries = getIndustries();
  const locations = getLocations();

  // Fetch all companies for analytics
  useEffect(() => {
    const loadAllCompanies = async () => {
      try {
        const result = await fetchCompanies(
          { search: '', industry: 'all', location: 'all', sortBy: 'name', sortOrder: 'asc' },
          1,
          1000
        );
        setAllCompanies(result.companies);
      } catch (err) {
        console.error('Failed to load all companies:', err);
      }
    };

    loadAllCompanies();
  }, []);

  // Fetch initial companies
  useEffect(() => {
    const loadCompanies = async () => {
      setLoading(true);
      setError(null);
      setCurrentPage(1);
      setCompanies([]);
      
      try {
        const result = await fetchCompanies(filters, 1, 20);
        setCompanies(result.companies);
        setHasMore(result.pagination.currentPage < result.pagination.totalPages);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadCompanies();
  }, [filters]);

  // Load more companies (infinite scroll)
  const loadMoreCompanies = useCallback(async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    try {
      const nextPage = currentPage + 1;
      const result = await fetchCompanies(filters, nextPage, 20);
      setCompanies(prev => [...prev, ...result.companies]);
      setCurrentPage(nextPage);
      setHasMore(result.pagination.currentPage < result.pagination.totalPages);
    } catch (err) {
      console.error('Failed to load more companies:', err);
    } finally {
      setLoadingMore(false);
    }
  }, [currentPage, filters, hasMore, loadingMore]);

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleSortChange = (sortBy: FilterOptions['sortBy']) => {
    setFilters((prev) => ({
      ...prev,
      sortBy,
      sortOrder:
        prev.sortBy === sortBy && prev.sortOrder === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      industry: 'all',
      location: 'all',
      sortBy: 'name',
      sortOrder: 'asc',
    });
  };

  const handleRetry = () => {
    const loadCompanies = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await fetchCompanies(filters, 1, 20);
        setCompanies(result.companies);
        setCurrentPage(1);
        setHasMore(result.pagination.currentPage < result.pagination.totalPages);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadCompanies();
  };

  const handleViewDetails = (company: Company) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCompany(null);
  };

  // Get favorite companies
  const favoriteCompanies = allCompanies.filter((company) => isFavorite(company.id));

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        {/* Base gradient - Light mode */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-indigo-950 dark:to-purple-950"></div>
        
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-indigo-400/30 to-purple-400/30 dark:from-indigo-600/20 dark:to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-pink-400/30 dark:from-purple-600/20 dark:to-pink-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-pink-400/20 to-orange-400/20 dark:from-pink-600/15 dark:to-orange-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 dark:opacity-30" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(99, 102, 241, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
        
        {/* Image overlay */}
        <div 
          className="absolute inset-0 opacity-5 dark:opacity-10"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-7xl relative z-10">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl blur-lg opacity-60 animate-pulse"></div>
                <div className="relative p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-2xl">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  Global Company Hub
                </h1>
                <p className="text-muted-foreground dark:text-slate-400 mt-1 flex items-center gap-1.5 text-sm">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Discover 105+ leading companies from India & worldwide
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as typeof activeTab)} className="space-y-5">
          <div className="sticky top-3 z-50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/40 dark:border-slate-700/40 rounded-xl p-1.5 shadow-lg shadow-indigo-100/50 dark:shadow-indigo-900/50">
            <TabsList className="bg-transparent border-0 h-auto w-full justify-start gap-1.5">
              <TabsTrigger 
                value="directory" 
                className="gap-1.5 text-sm dark:text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 rounded-lg px-4 py-2"
              >
                <Building2 className="w-3.5 h-3.5" />
                Directory
              </TabsTrigger>
              <TabsTrigger 
                value="analytics" 
                className="gap-1.5 text-sm dark:text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 rounded-lg px-4 py-2"
              >
                <BarChart3 className="w-3.5 h-3.5" />
                Analytics
              </TabsTrigger>
              <TabsTrigger 
                value="favorites" 
                className="gap-1.5 text-sm dark:text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 rounded-lg px-4 py-2"
              >
                <Star className="w-3.5 h-3.5" />
                Favorites
                {favoritesCount > 0 && (
                  <Badge className="ml-1 px-1.5 py-0 text-xs bg-gradient-to-r from-amber-400 to-orange-500 text-white border-0 hover:from-amber-500 hover:to-orange-600 shadow-md">
                    {favoritesCount}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Directory Tab */}
          <TabsContent value="directory" className="space-y-4">
            {/* Filter Controls */}
            <FilterControls
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleResetFilters}
              industries={industries}
              locations={locations}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />

            {/* Error State */}
            {error && (
              <Alert variant="destructive" className="bg-red-50/80 dark:bg-red-950/50 backdrop-blur-sm border-red-200 dark:border-red-900">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle className="dark:text-red-300">Error</AlertTitle>
                <AlertDescription className="flex items-center justify-between dark:text-red-200">
                  <span>{error}</span>
                  <Button variant="outline" size="sm" onClick={handleRetry}>
                    Retry
                  </Button>
                </AlertDescription>
              </Alert>
            )}

            {/* Loading State */}
            {loading && (
              <div className="space-y-4">
                {viewMode === 'table' ? (
                  <div className="border border-border/50 dark:border-slate-700/50 rounded-2xl p-6 space-y-4 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
                    {[...Array(5)].map((_, i) => (
                      <Skeleton key={i} className="h-20 w-full dark:bg-slate-800" />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => (
                      <Skeleton key={i} className="h-64 w-full rounded-2xl dark:bg-slate-800" />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Company Display */}
            {!loading && !error && (
              <>
                {viewMode === 'table' ? (
                  <CompanyTable
                    companies={companies}
                    filters={filters}
                    onSortChange={handleSortChange}
                    isFavorite={isFavorite}
                    onToggleFavorite={toggleFavorite}
                    onViewDetails={handleViewDetails}
                  />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {companies.length === 0 ? (
                      <div className="col-span-full text-center py-12 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-border/50 dark:border-slate-700/50">
                        <div className="flex flex-col items-center gap-4">
                          <div className="p-6 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-full">
                            <Building2 className="w-12 h-12 text-slate-400 dark:text-slate-500" />
                          </div>
                          <div>
                            <h3 className="mb-2 dark:text-slate-200">No companies found</h3>
                            <p className="text-muted-foreground dark:text-slate-400">Try adjusting your filters</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      companies.map((company, index) => (
                        <div
                          key={company.id}
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          <CompanyCard
                            company={company}
                            isFavorite={isFavorite(company.id)}
                            onToggleFavorite={toggleFavorite}
                            onViewDetails={handleViewDetails}
                          />
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Infinite Scroll Trigger */}
                {companies.length > 0 && hasMore && (
                  <div className="flex justify-center pt-6">
                    {loadingMore ? (
                      <div className="flex flex-col items-center gap-3">
                        <div className="relative w-12 h-12">
                          {/* Circular loading spinner */}
                          <div className="absolute inset-0 rounded-full border-4 border-indigo-200 dark:border-indigo-900"></div>
                          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-600 dark:border-t-indigo-400 animate-spin"></div>
                        </div>
                        <span className="text-sm text-muted-foreground dark:text-slate-400">Loading more companies...</span>
                      </div>
                    ) : (
                      <Button
                        onClick={loadMoreCompanies}
                        variant="outline"
                        size="sm"
                        className="bg-white/80 dark:bg-slate-800/80 dark:text-slate-200 backdrop-blur-sm border-indigo-200 dark:border-indigo-800 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 hover:text-white hover:border-0 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        Load More Companies
                      </Button>
                    )}
                  </div>
                )}

                {/* Invisible scroll trigger for automatic loading */}
                {!loadingMore && hasMore && (
                  <InfiniteScroll
                    onLoadMore={loadMoreCompanies}
                    hasMore={hasMore}
                    loading={loadingMore}
                  />
                )}

                {/* End of results */}
                {!hasMore && companies.length > 0 && (
                  <div className="text-center py-8 text-muted-foreground dark:text-slate-400">
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-full border border-border/50 dark:border-slate-700/50">
                      <Star className="w-4 h-4 text-amber-500" />
                      You've reached the end! All companies loaded.
                    </div>
                  </div>
                )}
              </>
            )}
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            {allCompanies.length > 0 ? (
              <AnalyticsDashboard companies={allCompanies} onViewDetails={handleViewDetails} />
            ) : (
              <div className="text-center py-16 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-border/50 dark:border-slate-700/50">
                <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-indigo-600 dark:text-indigo-400" />
                <p className="text-muted-foreground dark:text-slate-400">Loading analytics data...</p>
              </div>
            )}
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites" className="space-y-4">
            {favoriteCompanies.length === 0 ? (
              <div className="text-center py-20 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-border/50 dark:border-slate-700/50">
                <div className="flex flex-col items-center gap-4">
                  <div className="p-6 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-full">
                    <Star className="w-16 h-16 text-amber-600 dark:text-amber-500" />
                  </div>
                  <div>
                    <h3 className="mb-2 dark:text-slate-200">No favorites yet</h3>
                    <p className="text-muted-foreground dark:text-slate-400 max-w-md mx-auto">
                      Start building your collection by clicking the star icon on any company card
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-2xl p-6 border border-border/50 dark:border-slate-700/50">
                  <div>
                    <h3 className="flex items-center gap-2 dark:text-slate-200">
                      <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                      Your Favorite Companies
                    </h3>
                    <p className="text-muted-foreground dark:text-slate-400 mt-1">
                      {favoriteCompanies.length} favorite{favoriteCompanies.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={viewMode === 'table' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('table')}
                      className={viewMode === 'table' ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md' : ''}
                    >
                      Table
                    </Button>
                    <Button
                      variant={viewMode === 'card' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('card')}
                      className={viewMode === 'card' ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md' : ''}
                    >
                      Cards
                    </Button>
                  </div>
                </div>

                {viewMode === 'table' ? (
                  <CompanyTable
                    companies={favoriteCompanies}
                    filters={filters}
                    onSortChange={handleSortChange}
                    isFavorite={isFavorite}
                    onToggleFavorite={toggleFavorite}
                    onViewDetails={handleViewDetails}
                  />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {favoriteCompanies.map((company) => (
                      <CompanyCard
                        key={company.id}
                        company={company}
                        isFavorite={true}
                        onToggleFavorite={toggleFavorite}
                        onViewDetails={handleViewDetails}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>

        {/* Company Details Modal */}
        <CompanyDetailsModal
          company={selectedCompany}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          isFavorite={selectedCompany ? isFavorite(selectedCompany.id) : false}
          onToggleFavorite={toggleFavorite}
        />
      </div>
      
      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}