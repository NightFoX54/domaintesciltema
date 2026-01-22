/**
 * TypeScript types for WHMCS API integration
 * 
 * These types are based on current placeholder data structures and expected
 * WHMCS API response formats. They provide type safety and documentation for
 * future WHMCS API integration.
 * 
 * Reference: WHMCS API Documentation
 * - GetClientsProducts: https://developers.whmcs.com/api-reference/getclientsproducts/
 * - GetInvoices: https://developers.whmcs.com/api-reference/getinvoices/
 * - GetClientsDomains: https://developers.whmcs.com/api-reference/getclientsdomains/
 * - GetTickets: https://developers.whmcs.com/api-reference/gettickets/
 * - GetTicket: https://developers.whmcs.com/api-reference/getticket/
 */

/**
 * Service status values from WHMCS
 * Maps to WHMCS product status field
 */
export type ServiceStatus = 'active' | 'suspended' | 'pending' | 'cancelled' | 'expired'

/**
 * Billing cycle values from WHMCS
 * Maps to WHMCS billingcycle field
 */
export type BillingCycle = 'monthly' | 'quarterly' | 'semiannually' | 'annually' | 'biennially' | 'triennially'

/**
 * WHMCS Service/Product
 * 
 * Based on GetClientsProducts API response
 * Reference: https://developers.whmcs.com/api-reference/getclientsproducts/
 * 
 * Key WHMCS fields:
 * - id: Product ID (pid)
 * - serviceid: Service ID
 * - productname: Product name
 * - domain: Associated domain
 * - status: Service status (Active, Suspended, Pending, Cancelled, Terminated, Fraud, etc.)
 * - nextduedate: Next due date (YYYY-MM-DD format)
 * - amount: Recurring amount
 * - billingcycle: Billing cycle (Monthly, Quarterly, etc.)
 * - username: Service username (if applicable)
 * - password: Service password (if applicable)
 * - notes: Admin notes
 * - regdate: Registration date
 * - nextinvoicedate: Next invoice date
 */
export interface WHMCSService {
  /** Service ID from WHMCS (serviceid) */
  id: string
  /** Product/Service name (productname) */
  name: string
  /** Associated domain name (domain) */
  domain?: string
  /** Service status (status) - Active, Suspended, Pending, Cancelled, Terminated, Fraud */
  status: ServiceStatus
  /** Next due date for renewal (nextduedate) - ISO date string from WHMCS */
  renewalDate: Date | string
  /** Service expiration date (expiresdate) - ISO date string from WHMCS */
  expiresDate?: Date | string
  /** Recurring amount (amount) - decimal string from WHMCS */
  price: number | string
  /** Billing cycle (billingcycle) - Monthly, Quarterly, Semiannually, Annually, etc. */
  billingCycle: BillingCycle | string
  /** Additional WHMCS fields that may be available:
   * - username: Service username
   * - password: Service password (should be handled securely)
   * - notes: Admin notes
   * - regdate: Registration date
   * - nextinvoicedate: Next invoice date
   * - producttype: Product type
   * - groupname: Product group name
   */
}

/**
 * Invoice status values from WHMCS
 * Maps to WHMCS invoice status field
 */
export type InvoiceStatus = 'unpaid' | 'paid' | 'overdue' | 'cancelled' | 'refunded' | 'collections'

/**
 * WHMCS Invoice
 * 
 * Based on GetInvoices API response
 * Reference: https://developers.whmcs.com/api-reference/getinvoices/
 * 
 * Key WHMCS fields:
 * - id: Invoice ID
 * - invoicenum: Invoice number (formatted)
 * - date: Invoice date (YYYY-MM-DD format)
 * - duedate: Due date (YYYY-MM-DD format)
 * - total: Invoice total amount
 * - status: Invoice status (Unpaid, Paid, Cancelled, Refunded, Collections, etc.)
 * - subtotal: Subtotal amount
 * - tax: Tax amount
 * - credit: Credit amount
 * - balance: Outstanding balance
 */
export interface WHMCSInvoice {
  /** Invoice ID from WHMCS (id) */
  id: string
  /** Invoice number (invoicenum) - formatted invoice number */
  invoiceNumber: string
  /** Invoice date (date) - ISO date string from WHMCS */
  date: Date | string
  /** Due date (duedate) - ISO date string from WHMCS */
  dueDate: Date | string
  /** Invoice total amount (total) - decimal string from WHMCS */
  amount: number | string
  /** Invoice status (status) - Unpaid, Paid, Cancelled, Refunded, Collections, etc. */
  status: InvoiceStatus
  /** Additional WHMCS fields that may be available:
   * - subtotal: Subtotal amount
   * - tax: Tax amount
   * - credit: Credit amount
   * - balance: Outstanding balance
   * - paymentmethod: Payment method
   * - notes: Invoice notes
   */
}

/**
 * Domain status values from WHMCS
 * Maps to WHMCS domain status field
 */
export type DomainStatus = 'active' | 'expired' | 'pending' | 'cancelled' | 'fraud' | 'transferred'

/**
 * WHMCS Domain
 * 
 * Based on GetClientsDomains API response
 * Reference: https://developers.whmcs.com/api-reference/getclientsdomains/
 * 
 * Key WHMCS fields:
 * - id: Domain ID
 * - domain: Domain name
 * - status: Domain status (Active, Expired, Pending, Cancelled, Fraud, Transferred)
 * - expirydate: Expiry date (YYYY-MM-DD format)
 * - nextduedate: Next due date (YYYY-MM-DD format)
 * - registrationdate: Registration date (YYYY-MM-DD format)
 * - registrar: Registrar name
 * - nameservers: Nameservers (comma-separated or array)
 * - dnsmanagement: DNS management enabled (1/0)
 * - emailforwarding: Email forwarding enabled (1/0)
 * - idprotection: ID protection enabled (1/0)
 * - autorenew: Auto-renewal enabled (1/0)
 */
export interface WHMCSDomain {
  /** Domain ID from WHMCS (id) */
  id: string
  /** Domain name (domain) */
  domain: string
  /** Domain status (status) - Active, Expired, Pending, Cancelled, Fraud, Transferred */
  status: DomainStatus
  /** Domain expiry date (expirydate) - ISO date string from WHMCS */
  expiresDate: Date | string
  /** Auto-renewal enabled (autorenew) - boolean or 1/0 from WHMCS */
  autoRenew: boolean | number
  /** Registration date (registrationdate) - ISO date string from WHMCS */
  registrationDate?: Date | string
  /** Additional WHMCS fields that may be available:
   * - nextduedate: Next due date
   * - registrar: Registrar name
   * - nameservers: Nameservers (may be string or array)
   * - dnsmanagement: DNS management enabled (1/0)
   * - emailforwarding: Email forwarding enabled (1/0)
   * - idprotection: ID protection enabled (1/0)
   * - renewalprice: Renewal price
   * - transferprice: Transfer price
   */
}

/**
 * Ticket status values from WHMCS
 * Maps to WHMCS ticket status field
 */
export type TicketStatus = 'open' | 'answered' | 'closed' | 'customer-reply' | 'in-progress'

/**
 * WHMCS Ticket Message
 * 
 * Based on GetTicket API response messages array
 * Reference: https://developers.whmcs.com/api-reference/getticket/
 * 
 * Key WHMCS fields:
 * - id: Message ID
 * - date: Message date (YYYY-MM-DD HH:MM:SS format)
 * - name: Author name
 * - email: Author email
 * - message: Message content
 * - admin: Is admin message (1/0)
 * - attachment: Attachment filename (if any)
 */
export interface WHMCSTicketMessage {
  /** Message ID from WHMCS (id) */
  id: string
  /** Author name (name) */
  author: string
  /** Message date (date) - ISO datetime string from WHMCS */
  date: Date | string
  /** Message content (message) */
  message: string
  /** Additional WHMCS fields that may be available:
   * - email: Author email
   * - admin: Is admin message (1/0)
   * - attachment: Attachment filename
   * - ip: IP address
   */
}

/**
 * WHMCS Ticket
 * 
 * Based on GetTickets and GetTicket API responses
 * Reference: 
 * - https://developers.whmcs.com/api-reference/gettickets/
 * - https://developers.whmcs.com/api-reference/getticket/
 * 
 * Key WHMCS fields:
 * - id: Ticket ID
 * - tid: Ticket number (formatted)
 * - subject: Ticket subject
 * - status: Ticket status (Open, Answered, Closed, Customer-Reply, In-Progress)
 * - date: Ticket creation date (YYYY-MM-DD HH:MM:SS format)
 * - lastreply: Last reply date (YYYY-MM-DD HH:MM:SS format)
 * - deptid: Department ID
 * - priority: Priority (Low, Medium, High)
 * - messages: Array of ticket messages (from GetTicket only)
 */
export interface WHMCSTicket {
  /** Ticket ID from WHMCS (id) */
  id: string
  /** Ticket number (tid) - formatted ticket number */
  ticketNumber: string
  /** Ticket subject (subject) */
  subject: string
  /** Ticket status (status) - Open, Answered, Closed, Customer-Reply, In-Progress */
  status: TicketStatus
  /** Ticket creation date (date) - ISO datetime string from WHMCS */
  created: Date | string
  /** Last reply date (lastreply) - ISO datetime string from WHMCS */
  lastReply: Date | string
  /** Ticket messages (messages) - Only available from GetTicket API, not GetTickets */
  messages?: WHMCSTicketMessage[]
  /** Additional WHMCS fields that may be available:
   * - deptid: Department ID
   * - priority: Priority (Low, Medium, High)
   * - userid: User ID
   * - email: Contact email
   * - name: Contact name
   */
}

/**
 * Helper type for WHMCS API responses
 * WHMCS typically returns data in a 'products', 'invoices', 'domains', or 'tickets' array
 */
export interface WHMCSApiResponse<T> {
  result: string // 'success' or 'error'
  message?: string
  totalresults?: number
  [key: string]: T[] | string | number | undefined // Dynamic key for data array (products, invoices, etc.)
}
