/**
 * Analytics Events - Single Source of Truth
 * 
 * This file defines all analytics events for the platform.
 * Events are frontend-first and backend-verifiable where applicable.
 * 
 * Principles:
 * - Event names are NOT localized (English only, stable long-term)
 * - Events must be stable (no renaming)
 * - Frontend-first: Events fire immediately on user action
 * - Backend-verifiable: Critical events must be confirmed by WHMCS
 */

/**
 * Event category classification
 * - ui: User interface interactions (frontend-only)
 * - business: Business-critical events (backend-verifiable)
 */
export type AnalyticsEventCategory = 'ui' | 'business'

/**
 * Base properties shared across all analytics events
 * All properties are optional to allow flexibility
 */
export interface BaseAnalyticsPayload {
  /** Product ID from WHMCS or internal system */
  product_id?: string
  /** Product type classification */
  product_type?: 'hosting' | 'domain' | 'ssl'
  /** Billing cycle for recurring products */
  billing_cycle?: string
  /** Price amount (numeric value) */
  price?: number
  /** Currency code (ISO 4217, e.g., 'USD', 'EUR', 'TRY') */
  currency?: string
  /** Locale identifier (e.g., 'en', 'tr') */
  locale?: string
}

/**
 * Analytics event names
 * These are stable identifiers that should NOT be renamed
 */
export const AnalyticsEventName = {
  PRODUCT_VIEW: 'product_view',
  CONFIGURATOR_STARTED: 'configurator_started',
  CONFIGURATOR_COMPLETED: 'configurator_completed',
  ADD_TO_CART: 'add_to_cart',
  CHECKOUT_STARTED: 'checkout_started',
  PURCHASE_COMPLETED: 'purchase_completed',
  RENEWAL_COMPLETED: 'renewal_completed',
} as const

export type AnalyticsEventName = typeof AnalyticsEventName[keyof typeof AnalyticsEventName]

/**
 * PRODUCT_VIEW
 * Category: ui
 * Frontend-only: Yes
 * 
 * Fires when a user views a product detail page.
 * This is a frontend-only event that tracks user interest.
 */
export interface ProductViewPayload extends BaseAnalyticsPayload {
  /** Product name or title */
  product_name?: string
  /** Product category or group */
  product_category?: string
}

/**
 * CONFIGURATOR_STARTED
 * Category: ui
 * Frontend-only: Yes
 * 
 * Fires when a user begins configuring a product (e.g., hosting plan customization).
 * This is a frontend-only event that tracks engagement.
 */
export interface ConfiguratorStartedPayload extends BaseAnalyticsPayload {
  /** Configuration type or step identifier */
  configurator_type?: string
}

/**
 * CONFIGURATOR_COMPLETED
 * Category: ui
 * Frontend-only: Yes
 * 
 * Fires when a user completes product configuration.
 * This is a frontend-only event that tracks conversion funnel progress.
 */
export interface ConfiguratorCompletedPayload extends BaseAnalyticsPayload {
  /** Configuration type or step identifier */
  configurator_type?: string
  /** Selected configuration options (key-value pairs) */
  configuration_options?: Record<string, string | number | boolean>
}

/**
 * ADD_TO_CART
 * Category: ui
 * Frontend-only: Yes
 * 
 * Fires when a user adds a product to their shopping cart.
 * This is a frontend-only event that tracks cart additions.
 */
export interface AddToCartPayload extends BaseAnalyticsPayload {
  /** Quantity added to cart */
  quantity?: number
  /** Cart total value after this addition */
  cart_total?: number
}

/**
 * CHECKOUT_STARTED
 * Category: business
 * Frontend-only: Yes (but should be tracked for funnel analysis)
 * 
 * Fires when a user initiates the checkout process.
 * This is frontend-only but marks the start of a business-critical flow.
 */
export interface CheckoutStartedPayload extends BaseAnalyticsPayload {
  /** Cart total value at checkout start */
  cart_total?: number
  /** Number of items in cart */
  cart_items_count?: number
}

/**
 * PURCHASE_COMPLETED
 * Category: business
 * Frontend-only: No - MUST be fired after WHMCS confirmation
 * 
 * Fires when a purchase is successfully completed and verified by WHMCS.
 * This event MUST only fire after receiving confirmation from WHMCS backend.
 * Do NOT fire this event on frontend-only actions.
 * 
 * Verification requirements:
 * - WHMCS order/invoice creation confirmed
 * - Payment processing confirmed (if applicable)
 * - Order status is 'Active' or equivalent
 */
export interface PurchaseCompletedPayload extends BaseAnalyticsPayload {
  /** WHMCS order ID (required for verification) */
  order_id: string
  /** WHMCS invoice ID (if available) */
  invoice_id?: string
  /** Transaction ID from payment processor */
  transaction_id?: string
  /** Total purchase amount (verified from WHMCS) */
  total_amount: number
  /** Payment method used */
  payment_method?: string
  /** Order status from WHMCS */
  order_status?: string
}

/**
 * RENEWAL_COMPLETED
 * Category: business
 * Frontend-only: No - MUST be fired after WHMCS confirmation
 * 
 * Fires when a service renewal is successfully completed and verified by WHMCS.
 * This event MUST only fire after receiving confirmation from WHMCS backend.
 * Do NOT fire this event on frontend-only actions.
 * 
 * Verification requirements:
 * - WHMCS renewal/invoice creation confirmed
 * - Payment processing confirmed (if applicable)
 * - Service status updated in WHMCS
 */
export interface RenewalCompletedPayload extends BaseAnalyticsPayload {
  /** WHMCS service ID (required for verification) */
  service_id: string
  /** WHMCS invoice ID (if available) */
  invoice_id?: string
  /** Transaction ID from payment processor */
  transaction_id?: string
  /** Renewal amount (verified from WHMCS) */
  renewal_amount: number
  /** Payment method used */
  payment_method?: string
  /** Service status from WHMCS after renewal */
  service_status?: string
  /** New expiration/renewal date */
  renewal_date?: string
}

/**
 * Union type of all event payloads
 */
export type AnalyticsEventPayload =
  | ProductViewPayload
  | ConfiguratorStartedPayload
  | ConfiguratorCompletedPayload
  | AddToCartPayload
  | CheckoutStartedPayload
  | PurchaseCompletedPayload
  | RenewalCompletedPayload

/**
 * Complete analytics event structure
 */
export interface AnalyticsEvent {
  /** Event name (stable identifier) */
  event_name: AnalyticsEventName
  /** Event category */
  category: AnalyticsEventCategory
  /** Event-specific payload */
  payload: AnalyticsEventPayload
  /** Timestamp when event occurred (ISO 8601) */
  timestamp?: string
}

/**
 * Event category mapping
 * Maps each event to its category for easy lookup
 */
export const EventCategoryMap: Record<AnalyticsEventName, AnalyticsEventCategory> = {
  [AnalyticsEventName.PRODUCT_VIEW]: 'ui',
  [AnalyticsEventName.CONFIGURATOR_STARTED]: 'ui',
  [AnalyticsEventName.CONFIGURATOR_COMPLETED]: 'ui',
  [AnalyticsEventName.ADD_TO_CART]: 'ui',
  [AnalyticsEventName.CHECKOUT_STARTED]: 'business',
  [AnalyticsEventName.PURCHASE_COMPLETED]: 'business',
  [AnalyticsEventName.RENEWAL_COMPLETED]: 'business',
}

/**
 * Events that require backend verification
 * These events MUST NOT fire until WHMCS confirms the action
 */
export const BackendVerifiedEvents: ReadonlySet<AnalyticsEventName> = new Set([
  AnalyticsEventName.PURCHASE_COMPLETED,
  AnalyticsEventName.RENEWAL_COMPLETED,
])

/**
 * Events that are frontend-only
 * These events fire immediately on user action without backend verification
 */
export const FrontendOnlyEvents: ReadonlySet<AnalyticsEventName> = new Set([
  AnalyticsEventName.PRODUCT_VIEW,
  AnalyticsEventName.CONFIGURATOR_STARTED,
  AnalyticsEventName.CONFIGURATOR_COMPLETED,
  AnalyticsEventName.ADD_TO_CART,
  AnalyticsEventName.CHECKOUT_STARTED,
])
