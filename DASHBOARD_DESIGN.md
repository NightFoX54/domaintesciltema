# Dashboard Design Documentation

## Design Philosophy

This dashboard is designed to be **calm, clear, and trustworthy** - the opposite of typical hosting dashboards that overwhelm users with information, urgency, and complexity.

### Key Principles

1. **Reduce Stress, Not Create It**
   - Users often log in when something is wrong or they're worried
   - The dashboard should immediately show: "Everything is okay" or "Here's what needs attention"
   - No fear-based language, no urgency unless truly urgent

2. **Clarity Over Completeness**
   - Show what matters most first
   - Hide complexity until needed
   - Use plain language, no jargon

3. **Progressive Disclosure**
   - Overview first (dashboard)
   - Details on demand (individual pages)
   - Actions are clear and accessible

## Dashboard Structure

### Main Dashboard (`/dashboard`)

**First 10 seconds experience:**
1. Greeting based on time of day (calm, human)
2. Overall status card (green = all good, yellow = attention needed, red = action required)
3. Quick actions (most common tasks)
4. Services and domains side-by-side (what you own)
5. Billing and tickets summary (what needs attention)

**Sections:**

1. **Header with Greeting**
   - Time-aware greeting (Good morning/afternoon/evening)
   - Subtitle: "Here's everything you need to know at a glance"

2. **Overall Status Card**
   - Single card showing system health
   - Green: Everything looks good
   - Yellow: Needs attention (expiring soon, etc.)
   - Red: Action required (suspended, overdue)

3. **Quick Actions**
   - Most common tasks users need
   - Open ticket, view invoices, add domain, renew service, upgrade plan

4. **Services & Domains Grid**
   - Two-column layout on desktop
   - Shows active services and domains
   - Each card shows: name, status, renewal/expiry date
   - Visual indicators for expiring soon

5. **Billing & Tickets Summary**
   - Account balance, next invoice
   - Recent tickets (if any)
   - Clear call-to-action if action needed

### Services Page (`/dashboard/services`)

- List view of all services
- Each service card shows:
  - Service name and domain
  - Status badge
  - Renewal/expiry date
  - Manage button
- Service detail page shows:
  - Full service information
  - Actions (renew, upgrade, cancel)
  - Quick links (control panel, support)

### Domains Page (`/dashboard/domains`)

- List view of all domains
- Each domain card shows:
  - Domain name
  - Status badge
  - Expiry date
  - Auto-renew indicator
  - Renew button if expiring soon
- Domain detail page shows:
  - Registration and expiry dates
  - Auto-renew status
  - Actions (enable auto-renew, renew, manage DNS, transfer)

### Billing Page (`/dashboard/billing`)

- Summary cards: balance, next invoice, unpaid count
- Invoice list with:
  - Invoice number and date
  - Due date (highlighted if overdue)
  - Amount
  - Status badge
  - Download and pay buttons

### Tickets Page (`/dashboard/tickets`)

- List of all support tickets
- Each ticket shows:
  - Subject
  - Status badge
  - Ticket number
  - Created and last reply dates
- Create ticket button prominent
- Ticket detail page shows:
  - Full conversation thread
  - Reply form

### Profile Page (`/dashboard/profile`)

- Personal information form
- Address information form
- Save/Cancel actions

## Component System

### Layout Components

- **DashboardLayout**: Wraps all dashboard pages with sidebar navigation
- **DashboardNav**: Sidebar navigation with active state indicators
- **DashboardHeader**: Time-aware greeting component

### Status Components

- **StatusCard**: Large status indicator (healthy/warning/critical)
- **ServiceCard**: Individual service display card
- **DomainCard**: Individual domain display card

### Summary Components

- **BillingSummary**: Account balance and invoice summary
- **TicketsSummary**: Recent tickets list
- **QuickActions**: Grid of common action buttons

## Data Structure (WHMCS Integration Points)

All placeholder data is clearly marked with comments indicating:
- Which WHMCS API endpoint to use
- What data structure is expected
- What is conditional/optional

### Example Integration Points:

```typescript
// Services: WHMCS GetClientProducts API
// Domains: WHMCS GetClientsDomains API
// Invoices: WHMCS GetInvoices API
// Tickets: WHMCS GetTickets API
// Profile: WHMCS GetClientsDetails API
```

## Accessibility Features

- Semantic HTML throughout
- Proper heading hierarchy (h1 → h2 → h3)
- ARIA labels on interactive elements
- Keyboard navigation support
- Screen reader friendly
- Focus indicators on all interactive elements

## Internationalization

- All text via translation keys
- Locale-aware routing (`/en/dashboard`, `/tr/dashboard`)
- Locale-aware internal links
- Date formatting respects locale
- Currency formatting (to be implemented)

## Color & Status System

- **Green**: Healthy, active, paid, all good
- **Yellow/Amber**: Warning, expiring soon, needs attention
- **Red**: Critical, suspended, overdue, expired
- **Gray**: Neutral, inactive, cancelled

## Responsive Design

- Mobile-first approach
- Sidebar collapses on mobile (consider drawer)
- Grid layouts adapt to screen size
- Touch-friendly button sizes
- Readable text at all sizes

## What Makes This Different

1. **No Information Overload**: Traditional dashboards show everything at once. This shows what matters.

2. **Status-First Design**: The first thing you see is whether everything is okay.

3. **Calm Language**: "Everything looks good" instead of "All systems operational"

4. **Progressive Disclosure**: Details are hidden until you need them.

5. **Action-Oriented**: Quick actions are prominent, not buried in menus.

6. **Visual Hierarchy**: Important information is large and clear. Less important is smaller and muted.

7. **No Sales Language**: No upsells, no marketing, just what the user needs.

## Future Enhancements

- Real-time status updates
- Notification system
- Search functionality
- Filters and sorting
- Export capabilities
- Mobile app considerations
