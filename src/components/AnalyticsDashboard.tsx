import { Company } from '../types/company';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Building2, Users, TrendingUp, MapPin, Eye } from 'lucide-react';
import { Button } from './ui/button';

interface AnalyticsDashboardProps {
  companies: Company[];
  onViewDetails: (company: Company) => void;
}

export function AnalyticsDashboard({ companies, onViewDetails }: AnalyticsDashboardProps) {
  // Calculate statistics
  const totalCompanies = companies.length;
  const totalEmployees = companies.reduce((sum, c) => sum + c.employees, 0);
  const avgEmployees = Math.round(totalEmployees / totalCompanies);
  const uniqueIndustries = new Set(companies.map((c) => c.industry)).size;

  // Industry distribution data
  const industryData = Object.entries(
    companies.reduce((acc, company) => {
      acc[company.industry] = (acc[company.industry] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  )
    .map(([name, value]) => ({ 
      name, 
      value,
      companies: companies.filter(c => c.industry === name)
    }))
    .sort((a, b) => b.value - a.value);

  // Location distribution data
  const locationData = Object.entries(
    companies.reduce((acc, company) => {
      acc[company.location] = (acc[company.location] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  )
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 15); // Top 15 locations

  // Employee size distribution
  const employeeSizeData = [
    {
      name: '0-100',
      count: companies.filter((c) => c.employees < 100).length,
    },
    {
      name: '100-500',
      count: companies.filter((c) => c.employees >= 100 && c.employees < 500).length,
    },
    {
      name: '500-1000',
      count: companies.filter((c) => c.employees >= 500 && c.employees < 1000).length,
    },
    {
      name: '1000-5000',
      count: companies.filter((c) => c.employees >= 1000 && c.employees < 5000).length,
    },
    {
      name: '5000+',
      count: companies.filter((c) => c.employees >= 5000).length,
    },
  ].filter((item) => item.count > 0);

  // Colors for pie chart - bright, vibrant colors avoiding black/dark shades
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#14B8A6', '#F97316', '#EC4899'];

  // Custom label component for pie chart - show ALL labels
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 20;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        className="fill-slate-700 dark:fill-slate-300"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        style={{ fontSize: '9px', fontWeight: 500 }}
      >
        {`${name.toLowerCase()} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between pb-2 px-4 pt-4">
            <CardTitle className="text-xs text-blue-100">Total Companies</CardTitle>
            <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
              <Building2 className="h-3.5 w-3.5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-2xl">{totalCompanies}</div>
            <p className="text-[10px] text-blue-100 mt-0.5">Across {uniqueIndustries} industries</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between pb-2 px-4 pt-4">
            <CardTitle className="text-xs text-purple-100">Total Employees</CardTitle>
            <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
              <Users className="h-3.5 w-3.5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-2xl">{totalEmployees.toLocaleString()}</div>
            <p className="text-[10px] text-purple-100 mt-0.5">Combined workforce</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between pb-2 px-4 pt-4">
            <CardTitle className="text-xs text-green-100">Avg Employees</CardTitle>
            <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
              <TrendingUp className="h-3.5 w-3.5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-2xl">{avgEmployees.toLocaleString()}</div>
            <p className="text-[10px] text-green-100 mt-0.5">Per company</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between pb-2 px-4 pt-4">
            <CardTitle className="text-xs text-orange-100">Locations</CardTitle>
            <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
              <MapPin className="h-3.5 w-3.5 text-white" />
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-2xl">{new Set(companies.map((c) => c.location)).size}</div>
            <p className="text-[10px] text-orange-100 mt-0.5">Unique cities</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Industry Distribution Pie Chart */}
        <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-border/50 dark:border-slate-700/50 shadow-sm hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 dark:text-slate-100">
              <div className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full"></div>
              Industry Distribution
            </CardTitle>
            <CardDescription className="dark:text-slate-400">Companies by industry sector</CardDescription>
          </CardHeader>
          <CardContent className="px-4 pb-2">
            <ResponsiveContainer width="100%" height={500}>
              <PieChart>
                <Pie
                  data={industryData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={renderCustomLabel}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {industryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '8px',
                    color: '#1e293b'
                  }}
                  itemStyle={{ color: '#1e293b' }}
                  formatter={(value, name) => [value, name.toString().toLowerCase()]}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={48}
                  formatter={(value) => value.toString().toLowerCase()}
                  wrapperStyle={{ fontSize: '9px', paddingTop: '12px', lineHeight: '1.5' }}
                  iconSize={8}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Employee Size Distribution */}
        <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-border/50 dark:border-slate-700/50 shadow-sm hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 dark:text-slate-100">
              <div className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full"></div>
              Company Size Distribution
            </CardTitle>
            <CardDescription className="dark:text-slate-400">By employee count</CardDescription>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <ResponsiveContainer width="100%" height={500}>
              <BarChart data={employeeSizeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-slate-700" />
                <XAxis dataKey="name" className="dark:fill-slate-300" style={{ fontSize: '11px' }} />
                <YAxis className="dark:fill-slate-300" style={{ fontSize: '11px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '8px', 
                    fontSize: '12px',
                    color: '#1e293b'
                  }}
                  itemStyle={{ color: '#1e293b' }}
                />
                <Bar dataKey="count" fill="url(#colorGradient)" name="Companies" radius={[6, 6, 0, 0]} />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Location Distribution Chart */}
      <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-border/50 dark:border-slate-700/50 shadow-sm hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 dark:text-slate-100">
            <div className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full"></div>
            Top Locations
          </CardTitle>
          <CardDescription className="dark:text-slate-400">Companies by location (Top 15)</CardDescription>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={locationData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-slate-700" />
              <XAxis type="number" className="dark:fill-slate-300" style={{ fontSize: '11px' }} />
              <YAxis dataKey="name" type="category" width={120} className="dark:fill-slate-300" style={{ fontSize: '11px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '8px', 
                  fontSize: '12px',
                  color: '#1e293b'
                }}
                itemStyle={{ color: '#1e293b' }}
              />
              <Bar dataKey="value" fill="url(#locationGradient)" name="Companies" radius={[0, 6, 6, 0]} />
              <defs>
                <linearGradient id="locationGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.8} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Companies by Employees */}
      <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-border/50 dark:border-slate-700/50 shadow-sm hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 dark:text-slate-100">
            <div className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full"></div>
            Top Companies
          </CardTitle>
          <CardDescription className="dark:text-slate-400">Top 10 companies by employee count - hover to view details</CardDescription>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="space-y-2">
            {companies
              .sort((a, b) => b.employees - a.employees)
              .slice(0, 10)
              .map((company, index) => (
                <div key={company.id} className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-slate-50 to-indigo-50/50 dark:from-slate-800 dark:to-indigo-900/20 hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-900/30 dark:hover:to-purple-900/30 transition-all duration-200 group border border-transparent hover:border-indigo-200 dark:hover:border-indigo-700">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md group-hover:shadow-lg transition-shadow text-xs shrink-0">
                      <span>{index + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 dark:text-slate-200 transition-colors truncate">{company.name}</p>
                      <p className="text-xs text-muted-foreground dark:text-slate-500 truncate">{company.industry}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <p className="text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 dark:text-slate-200 transition-colors whitespace-nowrap">{company.employees.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground dark:text-slate-500">employees</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewDetails(company)}
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 hover:from-indigo-600 hover:to-purple-700 hover:shadow-lg transition-all duration-200 h-7 px-2.5 text-xs shrink-0 group-hover:scale-110"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}