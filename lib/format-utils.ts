/**
 * Global formatting utilities using Intl APIs
 * All formatting must use these utilities - no inline formatting logic
 */

export type Locale = 'en' | 'tr'

/**
 * Format a date using Intl.DateTimeFormat
 * @param date - Date object, string, or number (timestamp)
 * @param locale - Locale ('en' or 'tr')
 * @param options - Optional Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string | number | null | undefined,
  locale: Locale,
  options?: Intl.DateTimeFormatOptions
): string {
  // Safe defaults for invalid input
  if (!date) {
    return ''
  }

  try {
    const dateObj = typeof date === 'string' || typeof date === 'number' 
      ? new Date(date) 
      : date

    // Check if date is valid
    if (isNaN(dateObj.getTime())) {
      return ''
    }

    // Default options for common date formats
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }

    const formatter = new Intl.DateTimeFormat(
      locale === 'tr' ? 'tr-TR' : 'en-US',
      options || defaultOptions
    )

    return formatter.format(dateObj)
  } catch (error) {
    console.warn('Error formatting date:', error)
    return ''
  }
}

/**
 * Format a date with time using Intl.DateTimeFormat
 * @param date - Date object, string, or number (timestamp)
 * @param locale - Locale ('en' or 'tr')
 * @returns Formatted date and time string
 */
export function formatDateTime(
  date: Date | string | number | null | undefined,
  locale: Locale
): string {
  return formatDate(date, locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

/**
 * Format a currency amount using Intl.NumberFormat
 * @param amount - Number to format
 * @param locale - Locale ('en' or 'tr') - determines currency (USD for en, TRY for tr)
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number | null | undefined,
  locale: Locale
): string {
  // Safe defaults for invalid input
  if (amount === null || amount === undefined || isNaN(amount)) {
    return formatCurrency(0, locale)
  }

  try {
    const currency = locale === 'tr' ? 'TRY' : 'USD'
    
    const formatter = new Intl.NumberFormat(
      locale === 'tr' ? 'tr-TR' : 'en-US',
      {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )

    return formatter.format(amount)
  } catch (error) {
    console.warn('Error formatting currency:', error)
    // Fallback to simple format
    const currencySymbol = locale === 'tr' ? '₺' : '$'
    return `${currencySymbol}${amount.toFixed(2)}`
  }
}

/**
 * Format a number using Intl.NumberFormat
 * @param number - Number to format
 * @param locale - Locale ('en' or 'tr')
 * @param options - Optional Intl.NumberFormatOptions
 * @returns Formatted number string
 */
export function formatNumber(
  number: number | null | undefined,
  locale: Locale,
  options?: Intl.NumberFormatOptions
): string {
  // Safe defaults for invalid input
  if (number === null || number === undefined || isNaN(number)) {
    return '0'
  }

  try {
    const formatter = new Intl.NumberFormat(
      locale === 'tr' ? 'tr-TR' : 'en-US',
      options
    )

    return formatter.format(number)
  } catch (error) {
    console.warn('Error formatting number:', error)
    return String(number)
  }
}

/**
 * Check if a date is expiring soon (within 30 days)
 * @param date - Date object, string, or number (timestamp)
 * @returns true if date is within 30 days from now
 */
export function isExpiringSoon(
  date: Date | string | number | null | undefined
): boolean {
  if (!date) {
    return false
  }

  try {
    const dateObj = typeof date === 'string' || typeof date === 'number'
      ? new Date(date)
      : date

    // Check if date is valid
    if (isNaN(dateObj.getTime())) {
      return false
    }

    const now = new Date()
    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)

    return dateObj < thirtyDaysFromNow
  } catch (error) {
    console.warn('Error checking expiring soon:', error)
    return false
  }
}
