/**
 * Centralized Analytics Tracking Helper
 * 
 * Provides type-safe analytics event tracking via Google Tag Manager dataLayer.
 * Safe for SSR, never throws errors, and includes development-only debugging.
 * 
 * SEO & Accessibility Safety:
 * - ✅ Works on noindex pages (dashboard, etc.) - analytics is independent of robots meta
 * - ✅ No DOM manipulation - only uses window.dataLayer array
 * - ✅ No focus manipulation - never calls focus(), blur(), or modifies tabIndex
 * - ✅ No aria-live regions - does not create or modify aria-live elements
 * - ✅ No visible elements - does not inject any visible DOM nodes
 * - ✅ WCAG 2.1 AA compliant - passive tracking only, no user interaction required
 */

import type {
  AnalyticsEventName,
  AnalyticsEventPayload,
  ProductViewPayload,
  ConfiguratorStartedPayload,
  ConfiguratorCompletedPayload,
  AddToCartPayload,
  CheckoutStartedPayload,
  PurchaseCompletedPayload,
  RenewalCompletedPayload,
  EventCategoryMap,
} from './analytics-events'
import {
  AnalyticsEventName,
  EventCategoryMap,
} from './analytics-events'

/**
 * Google Tag Manager dataLayer type declaration
 */
declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
  }
}

/**
 * Type-safe event payload mapping
 */
type EventPayloadMap = {
  [AnalyticsEventName.PRODUCT_VIEW]: ProductViewPayload
  [AnalyticsEventName.CONFIGURATOR_STARTED]: ConfiguratorStartedPayload
  [AnalyticsEventName.CONFIGURATOR_COMPLETED]: ConfiguratorCompletedPayload
  [AnalyticsEventName.ADD_TO_CART]: AddToCartPayload
  [AnalyticsEventName.CHECKOUT_STARTED]: CheckoutStartedPayload
  [AnalyticsEventName.PURCHASE_COMPLETED]: PurchaseCompletedPayload
  [AnalyticsEventName.RENEWAL_COMPLETED]: RenewalCompletedPayload
}

/**
 * Tracks an analytics event to Google Tag Manager dataLayer
 * 
 * @param event - Event name from AnalyticsEventName
 * @param properties - Event-specific payload properties
 * 
 * @example
 * trackEvent(AnalyticsEventName.PRODUCT_VIEW, {
 *   product_id: '123',
 *   product_type: 'hosting',
 *   price: 9.99,
 *   currency: 'USD'
 * })
 */
export function trackEvent<T extends AnalyticsEventName>(
  event: T,
  properties: EventPayloadMap[T]
): void {
  try {
    // SSR safety check - only run in browser
    // Note: This works on all pages including noindex pages (dashboard)
    if (typeof window === 'undefined') {
      return
    }

    // Initialize dataLayer if it doesn't exist
    // No DOM manipulation - only array operations on window.dataLayer
    if (!window.dataLayer) {
      window.dataLayer = []
    }

    // Get event category
    const category = EventCategoryMap[event] || 'ui'

    // Prepare event data for dataLayer
    // No focus, aria-live, or visible DOM manipulation - data only
    const eventData: Record<string, unknown> = {
      event,
      event_category: category,
      ...properties,
    }

    // Push to dataLayer
    // WCAG 2.1 AA compliant - passive tracking, no accessibility impact
    window.dataLayer.push(eventData)

    // Development-only debug logging
    // Console logging only - no visible UI or accessibility impact
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('[Analytics]', event, eventData)
    }
  } catch (error) {
    // Never throw errors - analytics should never break the app
    // Only log in development if something goes wrong
    // Error handling is silent in production - no user impact
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn('[Analytics] Failed to track event:', event, error)
    }
  }
}

/**
 * Tracks a purchase completion event after WHMCS backend confirmation
 * 
 * ⚠️ CRITICAL: This function MUST ONLY be called after receiving confirmation
 * from the WHMCS backend that the payment has been successfully processed
 * and the order has been created/activated.
 * 
 * DO NOT call this function:
 * - On frontend-only actions
 * - Before payment confirmation
 * - On checkout form submission
 * - On client-side payment processing
 * 
 * This function should ONLY be called:
 * - After WHMCS API confirms order creation
 * - After payment processor confirms successful payment
 * - After order status is verified as 'Active' or equivalent
 * - From a server-side webhook or API callback handler
 * 
 * Currently NOT USED - This is a placeholder for future WHMCS integration.
 * 
 * @param payload - Purchase completion payload with verified order data
 * 
 * @example
 * // Only call after WHMCS confirms:
 * // - Order ID exists in WHMCS
 * // - Payment is confirmed
 * // - Order status is Active
 * trackPurchaseCompleted({
 *   order_id: '12345', // Required: WHMCS order ID
 *   total_amount: 99.99, // Required: Verified from WHMCS
 *   product_type: 'hosting',
 *   product_id: 'linux',
 *   billing_cycle: '12month',
 *   price: 99.99,
 *   currency: 'USD',
 *   locale: 'en',
 *   invoice_id: 'INV-12345',
 *   transaction_id: 'TXN-67890',
 *   payment_method: 'credit_card',
 *   order_status: 'Active',
 * })
 */
export function trackPurchaseCompleted(
  payload: PurchaseCompletedPayload
): void {
  // Same SEO & accessibility guarantees as trackEvent:
  // - Works on noindex pages
  // - No DOM/focus/aria-live manipulation
  // - WCAG 2.1 AA compliant
  trackEvent(AnalyticsEventName.PURCHASE_COMPLETED, payload)
}
