export interface Company {
  id: string;
  name: string;
  industry: string;
  location: string;
  employees: number;
  founded: number;
  revenue: string;
  description: string;
  logo: string;
  rating: number;
  country: string;
}

export interface FilterOptions {
  search: string;
  industry: string;
  location: string;
  sortBy: 'name' | 'location' | 'industry' | 'employees' | 'founded';
  sortOrder: 'asc' | 'desc';
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}