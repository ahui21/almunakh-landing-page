"use client"

import * as React from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Download, Filter, RefreshCcw, Trash2, Calendar } from "lucide-react"

interface AnalyticsEvent {
  event: string
  category: string
  label: string
  value?: string | number
  timestamp: number
  userId?: string
  userType?: 'anonymous' | 'authenticated'
  sessionId: string
  page: string
  isOwnDevice: boolean
}

const EVENT_TYPES = ['click', 'pageview', 'error', 'scroll', 'timing'] as EventType[]
type EventType = 'click' | 'pageview' | 'error' | 'scroll' | 'timing'

const COLORS = ['#2D7DD2', '#069D27', '#DF2935', '#FDCA40', '#6366f1']

type SortConfig = {
  key: keyof AnalyticsEvent
  direction: 'asc' | 'desc'
}

type FilterState = {
  text: string
  userType: string
}

export default function AnalyticsDashboard() {
  const [events, setEvents] = React.useState<AnalyticsEvent[]>([])
  const [filterText, setFilterText] = React.useState("")
  const [filterUserType, setFilterUserType] = React.useState<string>("")
  const [sortConfig, setSortConfig] = React.useState<{
    key: keyof AnalyticsEvent
    direction: 'asc' | 'desc'
  }>({ key: 'timestamp', direction: 'desc' })
  const [selectedTypes, setSelectedTypes] = React.useState<EventType[]>(EVENT_TYPES)
  const [dateRange, setDateRange] = React.useState({
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
    end: new Date()
  })
  const [includeOwnDevice, setIncludeOwnDevice] = React.useState(false)

  // Load events
  const loadEvents = React.useCallback(() => {
    try {
      const storedEvents = JSON.parse(localStorage.getItem('tracking_events') || '[]')
      setEvents(storedEvents)
    } catch (error) {
      console.error('Error loading events:', error)
    }
  }, [])

  React.useEffect(() => {
    loadEvents()
  }, [loadEvents])

  // Event stats
  const stats = React.useMemo(() => {
    return {
      total: events.length,
      clicks: events.filter(e => e.event === 'click').length,
      pageviews: events.filter(e => e.event === 'pageview').length,
      errors: events.filter(e => e.event === 'error').length,
      scrollDepth: Math.max(...events
        .filter(e => e.event === 'scroll')
        .map(e => parseInt(e.label.replace('Scroll Depth ', '').replace('%', '')) || 0)
      )
    }
  }, [events])

  // Chart data
  const chartData = React.useMemo(() => {
    const data: { [key: string]: { date: string, count: number } } = {}
    
    events
      .filter(event => {
        const eventDate = new Date(event.timestamp)
        return eventDate >= dateRange.start && eventDate <= dateRange.end
      })
      .forEach(event => {
        const date = new Date(event.timestamp).toLocaleDateString()
        if (!data[date]) {
          data[date] = { date, count: 0 }
        }
        data[date].count++
      })

    return Object.values(data).sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    )
  }, [events, dateRange])

  // Event type distribution
  const pieData = React.useMemo(() => {
    const data: { name: string, value: number }[] = []
    
    EVENT_TYPES.forEach(type => {
      const count = events.filter(e => e.event === type).length
      if (count > 0) {
        data.push({ name: type, value: count })
      }
    })

    return data
  }, [events])

  // Filtered events with date range and type filtering
  const filteredEvents = React.useMemo(() => {
    return events.filter(event => {
      // Text filter
      const matchesText = filterText === "" || Object.values(event).some(value => 
        value?.toString().toLowerCase().includes(filterText.toLowerCase())
      )

      // User type filter
      const matchesUserType = filterUserType === "" || event.userType === filterUserType

      // Other filters
      const matchesType = selectedTypes.includes(event.event as EventType)
      const eventDate = new Date(event.timestamp)
      const matchesDate = eventDate >= dateRange.start && eventDate <= dateRange.end
      const matchesDevice = includeOwnDevice || !event.isOwnDevice

      return matchesText && matchesUserType && matchesType && matchesDate && matchesDevice
    })
  }, [events, filterText, filterUserType, selectedTypes, dateRange, includeOwnDevice])

  // Sorting
  const sortedEvents = React.useMemo(() => {
    return [...filteredEvents].sort((a, b) => {
      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]

      // Handle undefined values
      if (aValue === undefined && bValue === undefined) return 0
      if (aValue === undefined) return 1
      if (bValue === undefined) return -1

      if (sortConfig.direction === 'asc') {
        return aValue > bValue ? 1 : -1
      }
      return aValue < bValue ? 1 : -1
    })
  }, [filteredEvents, sortConfig])

  // Clear events
  const clearEvents = () => {
    if (window.confirm('Are you sure you want to clear all events?')) {
      localStorage.setItem('tracking_events', '[]')
      loadEvents()
    }
  }

  // Export events
  const exportEvents = () => {
    const dataStr = JSON.stringify(events, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    const exportFileDefaultName = `analytics-export-${new Date().toISOString()}.json`

    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const handleSort = (key: keyof AnalyticsEvent) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  // Add user stats
  const userStats = React.useMemo(() => {
    const uniqueUsers = new Set(events.map(e => e.userId || e.sessionId)).size
    const authenticatedUsers = new Set(events.filter(e => e.userId).map(e => e.userId)).size
    const anonymousUsers = uniqueUsers - authenticatedUsers

    return {
      total: uniqueUsers,
      authenticated: authenticatedUsers,
      anonymous: anonymousUsers
    }
  }, [events])

  // Calculate section time stats
  const sectionTimeStats = React.useMemo(() => {
    // Define all possible sections
    const ALL_SECTIONS = ['hero', 'benefits', 'features', 'case-studies', 'cta']
    
    // Initialize data for all sections
    const sectionData: { 
      [key: string]: { 
        times: number[],
        uniqueSessions: Set<string>
      } 
    } = {}
    
    // Initialize all sections with empty data
    ALL_SECTIONS.forEach(section => {
      sectionData[section] = {
        times: [],
        uniqueSessions: new Set()
      }
    })

    const MIN_VIEW_TIME = 0.2 // Minimum time in seconds to count as a view

    events
      .filter(e => e.event === 'section_view' && (includeOwnDevice || !e.isOwnDevice))
      .forEach(e => {
        const section = e.label.replace('Time in ', '')
        const duration = e.value as number || 0
        const sessionId = e.sessionId

        // Only add time if this is a new session and duration meets minimum
        if (duration >= MIN_VIEW_TIME) {
          if (!sectionData[section]?.uniqueSessions.has(sessionId)) {
            sectionData[section].times.push(duration)
            sectionData[section].uniqueSessions.add(sessionId)
          }
        }
      })

    return Object.entries(sectionData).map(([section, data]) => {
      const totalTime = data.times.reduce((sum, time) => sum + time, 0)
      const uniqueViews = data.uniqueSessions.size

      return {
        section: section.charAt(0).toUpperCase() + section.slice(1),
        totalTime: Math.round(totalTime),
        averageTime: uniqueViews > 0 ? Math.round(totalTime / uniqueViews) : 0,
        views: uniqueViews
      }
    }).sort((a, b) => ALL_SECTIONS.indexOf(a.section.toLowerCase()) - ALL_SECTIONS.indexOf(b.section.toLowerCase())) // Keep sections in order
  }, [events, includeOwnDevice])

  return (
    <div className="container pt-20 pb-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        <div className="flex gap-2">
          <Button 
            variant="default" 
            size="sm"
            onClick={() => loadEvents()}
          >
            <RefreshCcw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button 
            variant="secondary" 
            size="sm"
            onClick={exportEvents}
          >
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button 
            variant="destructive" 
            size="sm"
            onClick={clearEvents}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Data
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Total Events</div>
          <div className="text-2xl font-bold">{stats.total}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Clicks</div>
          <div className="text-2xl font-bold">{stats.clicks}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Page Views</div>
          <div className="text-2xl font-bold">{stats.pageviews}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Errors</div>
          <div className="text-2xl font-bold">{stats.errors}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Max Scroll Depth</div>
          <div className="text-2xl font-bold">{stats.scrollDepth}%</div>
        </div>
      </div>

      {/* Add User Stats Section */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Total Unique Users</div>
          <div className="text-2xl font-bold">{userStats.total}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Authenticated Users</div>
          <div className="text-2xl font-bold">{userStats.authenticated}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Anonymous Users</div>
          <div className="text-2xl font-bold">{userStats.anonymous}</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Event Timeline</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#2D7DD2" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Event Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Date Range and Event Type Filters */}
      <div className="flex gap-4 mb-8">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Date Range</label>
          <div className="flex gap-2 items-center">
            <Input
              type="date"
              value={dateRange.start.toISOString().split('T')[0]}
              onChange={(e) => setDateRange(prev => ({
                ...prev,
                start: new Date(e.target.value)
              }))}
            />
            <span>to</span>
            <Input
              type="date"
              value={dateRange.end.toISOString().split('T')[0]}
              onChange={(e) => setDateRange(prev => ({
                ...prev,
                end: new Date(e.target.value)
              }))}
            />
          </div>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Event Types</label>
          <div className="flex flex-wrap gap-2">
            {EVENT_TYPES.map(type => (
              <Button
                key={type}
                variant={selectedTypes.includes(type) ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTypes(prev => 
                  prev.includes(type) 
                    ? prev.filter(t => t !== type)
                    : [...prev, type]
                )}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Add User Filter */}
      <div className="flex gap-4 mb-8">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">User Type</label>
          <select 
            className="w-full rounded-md border border-input p-2"
            value={filterUserType}
            onChange={(e) => setFilterUserType(e.target.value)}
          >
            <option value="">All Users</option>
            <option value="authenticated">Authenticated Only</option>
            <option value="anonymous">Anonymous Only</option>
          </select>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Filter className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Filter events..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Add to filters section */}
      <div className="flex gap-4 mb-8">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="includeOwnDevice"
            checked={includeOwnDevice}
            onChange={(e) => setIncludeOwnDevice(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300"
          />
          <label htmlFor="includeOwnDevice" className="text-sm font-medium">
            Include My Device
          </label>
        </div>
      </div>

      {/* Add Section Time Analysis */}
      <div className="bg-white p-4 rounded-lg shadow mb-8">
        <h3 className="text-lg font-semibold mb-4">Section Engagement</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sectionTimeStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="section" />
              <YAxis label={{ value: 'Time (seconds)', angle: -90, position: 'insideLeft' }} />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload
                    return (
                      <div className="bg-white p-4 rounded shadow-lg border">
                        <p className="font-bold">{data.section}</p>
                        <p>Total Time: {data.totalTime}s</p>
                        <p>Average Time: {data.averageTime}s</p>
                        <p>Views: {data.views}</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar dataKey="totalTime" fill="#2D7DD2">
                {sectionTimeStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Section Time Table */}
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Section</TableHead>
                <TableHead>Total Time</TableHead>
                <TableHead>Average Time</TableHead>
                <TableHead>Views</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sectionTimeStats.map((stat) => (
                <TableRow key={stat.section}>
                  <TableCell>{stat.section}</TableCell>
                  <TableCell>{stat.totalTime}s</TableCell>
                  <TableCell>{stat.averageTime}s</TableCell>
                  <TableCell>{stat.views}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('timestamp')}
              >
                Time
                {sortConfig.key === 'timestamp' && (
                  <span className="ml-2">
                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('event')}
              >
                Event
                {sortConfig.key === 'event' && (
                  <span className="ml-2">
                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort('category')}
              >
                Category
                {sortConfig.key === 'category' && (
                  <span className="ml-2">
                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </TableHead>
              <TableHead>Label</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>User Type</TableHead>
              <TableHead>Session ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedEvents.map((event, i) => (
              <TableRow key={i}>
                <TableCell>
                  {new Date(event.timestamp).toLocaleString()}
                </TableCell>
                <TableCell>{event.event}</TableCell>
                <TableCell>{event.category}</TableCell>
                <TableCell>{event.label}</TableCell>
                <TableCell>{event.value}</TableCell>
                <TableCell>{event.userType}</TableCell>
                <TableCell 
                  className="cursor-help" 
                  title={event.sessionId || 'N/A'}
                >
                  {event.sessionId ? event.sessionId.slice(0, 32) + '...' : 'N/A'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="text-sm text-gray-500 mt-4">
        Showing {sortedEvents.length} of {events.length} events
      </div>
    </div>
  )
} 