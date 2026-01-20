'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, MessageSquare, Plus, Search, Filter, Clock } from 'lucide-react'
import { useTranslation } from '@/lib/i18n'
import { useLocale } from '@/hooks/use-locale'
import { addLocaleToPath } from '@/lib/locale-utils'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Card, CardContent, CardHeader, CardTitle, CardAction } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

// WHMCS data types (conceptual)
type TicketStatus = 'open' | 'answered' | 'closed' | 'customerReply'
type TicketPriority = 'low' | 'medium' | 'high'

interface Ticket {
  id: string
  number: string
  subject: string
  status: TicketStatus
  priority: TicketPriority
  department: string
  lastReply: string
  lastReplyTime: string
}

export default function TicketsPage() {
  const { t } = useTranslation('tickets')
  const locale = useLocale()
  const getPath = (path: string) => addLocaleToPath(path, locale)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')

  // Placeholder data - in real app, this comes from WHMCS
  // WHMCS API: GetTickets
  const placeholderTickets: Ticket[] = [
    {
      id: '1',
      number: '12345',
      subject: 'Domain transfer question',
      status: 'open',
      priority: 'medium',
      department: 'Technical Support',
      lastReply: 'Support Team',
      lastReplyTime: '2 hours ago',
    },
    {
      id: '2',
      number: '12344',
      subject: 'SSL certificate installation help',
      status: 'answered',
      priority: 'high',
      department: 'Technical Support',
      lastReply: 'You',
      lastReplyTime: '1 day ago',
    },
    {
      id: '3',
      number: '12343',
      subject: 'Billing inquiry',
      status: 'closed',
      priority: 'low',
      department: 'Billing',
      lastReply: 'Support Team',
      lastReplyTime: '3 days ago',
    },
  ]

  const statusVariants = {
    open: { variant: 'default' as const, className: 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400 border-blue-200 dark:border-blue-800' },
    answered: { variant: 'secondary' as const, className: 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400 border-green-200 dark:border-green-800' },
    closed: { variant: 'outline' as const, className: '' },
    customerReply: { variant: 'secondary' as const, className: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400 border-amber-200 dark:border-amber-800' },
  }

  const priorityVariants = {
    low: { variant: 'secondary' as const, className: '' },
    medium: { variant: 'default' as const, className: '' },
    high: { variant: 'destructive' as const, className: '' },
  }

  const filteredTickets = placeholderTickets.filter((ticket) => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.number.includes(searchQuery)
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  const getStatusLabel = (status: TicketStatus) => {
    return t(`overview.status${status.charAt(0).toUpperCase() + status.slice(1)}`)
  }

  const getPriorityLabel = (priority: TicketPriority) => {
    return t(`overview.priority${priority.charAt(0).toUpperCase() + priority.slice(1)}`)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container mx-auto px-4 lg:px-6 py-8 lg:py-12">
          {/* Page Header */}
          <div className="mb-8">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="mb-4"
            >
              <Link href={getPath('/dashboard')}>
                <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
                {t('title')}
              </Link>
            </Button>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-semibold text-foreground mb-2">
                  {t('overview.title')}
                </h1>
                <p className="text-muted-foreground">
                  {t('title')}
                </p>
              </div>
              <Button asChild>
                <Link href={getPath('/dashboard/tickets/new')}>
                  <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
                  {t('overview.openNew')}
                </Link>
              </Button>
            </div>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <Input
                    placeholder={t('overview.search')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <Filter className="h-4 w-4 mr-2" aria-hidden="true" />
                    <SelectValue placeholder={t('overview.status')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('overview.statusAll')}</SelectItem>
                    <SelectItem value="open">{t('overview.statusOpen')}</SelectItem>
                    <SelectItem value="answered">{t('overview.statusAnswered')}</SelectItem>
                    <SelectItem value="closed">{t('overview.statusClosed')}</SelectItem>
                    <SelectItem value="customerReply">{t('overview.statusCustomerReply')}</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder={t('overview.priority')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('overview.priorityAll')}</SelectItem>
                    <SelectItem value="low">{t('overview.priorityLow')}</SelectItem>
                    <SelectItem value="medium">{t('overview.priorityMedium')}</SelectItem>
                    <SelectItem value="high">{t('overview.priorityHigh')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Tickets List */}
          {filteredTickets.length === 0 ? (
            <Card>
              <CardContent className="py-12">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" aria-hidden="true" />
                  <p className="text-muted-foreground mb-2">{t('overview.empty')}</p>
                  <p className="text-sm text-muted-foreground mb-4">{t('overview.emptyDescription')}</p>
                  <Button asChild>
                    <Link href={getPath('/dashboard/tickets/new')}>
                      <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
                      {t('overview.openNew')}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t('overview.ticketNumber', { number: '' }).replace(' #', '')}</TableHead>
                        <TableHead>{t('overview.subject')}</TableHead>
                        <TableHead>{t('overview.status')}</TableHead>
                        <TableHead>{t('overview.priority')}</TableHead>
                        <TableHead>{t('overview.lastReply')}</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTickets.map((ticket) => {
                        const statusConfig = statusVariants[ticket.status]
                        const priorityConfig = priorityVariants[ticket.priority]

                        return (
                          <TableRow key={ticket.id}>
                            <TableCell className="font-medium">
                              {t('overview.ticketNumber', { number: ticket.number })}
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">{ticket.subject}</div>
                              <div className="text-xs text-muted-foreground">{ticket.department}</div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={statusConfig.variant} className={statusConfig.className}>
                                {getStatusLabel(ticket.status)}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant={priorityConfig.variant} className={priorityConfig.className}>
                                {getPriorityLabel(ticket.priority)}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2 text-sm">
                                <Clock className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
                                <span className="text-muted-foreground">{ticket.lastReplyTime}</span>
                              </div>
                              <div className="text-xs text-muted-foreground mt-0.5">
                                {ticket.lastReply}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button asChild variant="outline" size="sm">
                                <Link href={getPath(`/dashboard/tickets/${ticket.id}`)}>
                                  {t('overview.view')}
                                </Link>
                              </Button>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
