# PRODUCTION-READINESS AUDIT REPORT
## WHMCS-Based Hosting & Domain Platform

**Date:** 2024  
**Platform:** React (Next.js App Router) + Tailwind CSS  
**Backend:** WHMCS (source of truth)  
**Languages:** Turkish (TR), English (EN)  
**Audit Scope:** Full codebase review across I18N, Accessibility, SEO, UX, Architecture, and WHMCS Integration

---

## EXECUTIVE SUMMARY

### Overall Assessment

**Status:** **NOT PRODUCTION-READY** — Critical issues must be resolved before launch.

The platform demonstrates solid architectural foundations (locale routing, translation structure, component organization) but contains **critical production blockers** that will cause user-facing failures, legal/compliance risks, and integration failures with WHMCS.

### Critical Launch Blockers (Must Fix)

1. **Hardcoded HTML lang attribute** — Root layout has `lang="tr"` instead of dynamic locale
2. **Missing form input name attribute** — Profile page city input lacks `name` attribute
3. **Hardcoded string in billing cycle display** — `.toLowerCase()` on translated string breaks i18n
4. **Dead links (`href="#"`)** — Multiple dashboard pages have non-functional links
5. **Console.log in production code** — Service cancellation handler logs to console
6. **Missing error boundaries** — No React error boundaries for graceful failure handling
7. **Incomplete form validation** — Profile form only validates email, missing other required fields
8. **Window.location.reload() usage** — Profile cancel button causes full page reload, loses locale context

---

## 1. I18N & LOCALIZATION

### 1.1 Translation Key Structure

**Status:** ✅ **GOOD**

- Well-organized JSON files per namespace
- Consistent hierarchical key structure
- Both EN and TR files present for all namespaces
- Translation keys follow predictable patterns

**Issues Found:**

#### Issue 1.1.1: Missing Translation Key Validation
- **Severity:** Important
- **Area:** i18n
- **Description:** No automated validation to ensure EN and TR translation files have matching keys. Missing keys will display as raw key strings (e.g., `"profile.errors.invalidEmail"` instead of translated text).
- **Impact:** Users see untranslated keys when translations are missing, breaking user experience.
- **Recommendation:** Add CI/CD check or linting rule to compare key structures between `locales/en/` and `locales/tr/` directories. Consider using a tool like `i18next-parser` or custom script.

#### Issue 1.1.2: No Pluralization Support
- **Severity:** Important
- **Area:** i18n
- **Description:** No pluralization rules implemented. Turkish has different plural rules than English (e.g., "1 invoice" vs "2 invoices" vs Turkish "1 fatura" vs "2 fatura").
- **Impact:** Incorrect pluralization in Turkish, especially for counts (invoices, services, domains).
- **Recommendation:** Implement i18next with pluralization support, or add manual pluralization logic in translation utility. Current workaround in `billing-summary.tsx` (line 53) uses conditional logic but doesn't handle Turkish plural rules correctly.

#### Issue 1.1.3: Hardcoded String in Billing Cycle Display
- **Severity:** Critical
- **Area:** i18n
- **Location:** `app/[locale]/dashboard/services/[id]/page.tsx:139`
- **Description:** 
  ```typescript
  {formatCurrency(placeholderService.price, validLocale)} / {placeholderService.billingCycle.toLowerCase()}
  ```
  `placeholderService.billingCycle` is already a translated string from `t.placeholderData.billingCycles.monthly`, but `.toLowerCase()` is applied, which will break Turkish capitalization and is unnecessary.
- **Impact:** Turkish text may display incorrectly (e.g., "aylık" instead of "Aylık" if translation is capitalized).
- **Recommendation:** Remove `.toLowerCase()` call. If lowercase is required for styling, handle it via CSS `text-transform: lowercase` or ensure translations are already lowercase.

### 1.2 Date, Currency, and Number Formatting

**Status:** ✅ **GOOD** (with minor issues)

- Formatting utilities exist in `lib/format-utils.ts`
- Uses Intl APIs correctly
- Locale-aware formatting implemented
- Safe defaults for invalid input

**Issues Found:**

#### Issue 1.2.1: Formatting Utilities Not Used Everywhere
- **Severity:** Optional
- **Area:** i18n
- **Description:** All formatting should go through `formatDate`, `formatCurrency`, `formatNumber`. Audit shows these are used consistently in dashboard pages, but verify all public pages also use them.
- **Impact:** Potential inconsistency if any pages use inline formatting.
- **Recommendation:** Add ESLint rule to prevent direct use of `Intl.DateTimeFormat`, `Intl.NumberFormat`, or `date-fns` format functions outside of `lib/format-utils.ts`.

### 1.3 Locale-Aware Routing

**Status:** ✅ **GOOD**

- Middleware correctly handles locale prefixes
- `addLocaleToPath` utility used consistently
- Language switcher preserves query params and path
- `HtmlLangUpdater` component updates HTML lang attribute dynamically

**Issues Found:**

#### Issue 1.3.1: Root Layout Has Hardcoded lang="tr"
- **Severity:** Critical
- **Area:** i18n / SEO
- **Location:** `app/layout.tsx:17`
- **Description:** 
  ```tsx
  <html lang="tr" suppressHydrationWarning>
  ```
  Root layout hardcodes `lang="tr"` instead of using dynamic locale. While `HtmlLangUpdater` component updates this client-side, the initial server-rendered HTML will always be `lang="tr"`, causing SEO and accessibility issues for English users.
- **Impact:** 
  - English pages initially render with `lang="tr"`, breaking HTML lang correctness
  - Screen readers may announce content in wrong language initially
  - SEO crawlers see incorrect language declaration
- **Recommendation:** Remove `lang` attribute from root layout. The `HtmlLangUpdater` component in `[locale]/layout.tsx` already handles this dynamically. Alternatively, if root layout must have lang, derive it from request headers or make it dynamic based on locale route.

### 1.4 Translation Key Completeness

**Status:** ⚠️ **NEEDS VERIFICATION**

- Most user-facing strings are translated
- Fallback to English exists in translation utility
- Some hardcoded fallback strings found in code

**Issues Found:**

#### Issue 1.4.1: Hardcoded Fallback Strings in Profile Page
- **Severity:** Important
- **Area:** i18n
- **Location:** `app/[locale]/dashboard/profile/page.tsx:45, 80-82`
- **Description:** 
  ```typescript
  newErrors.email = t.profile.errors?.invalidEmail || 'Please enter a valid email address'
  // ...
  {t.profile.messages?.saveSuccess || 'Profile saved successfully'}
  {t.profile.messages?.saveError || 'Error saving profile. Please check the form.'}
  {t.profile.messages?.saving || 'Saving...'}
  ```
  Hardcoded English fallback strings exist. If translation keys are missing, English text appears even for Turkish users.
- **Impact:** Turkish users see English text if translation keys are missing.
- **Recommendation:** Ensure all translation keys exist in both `en/dashboard.json` and `tr/dashboard.json`. Remove hardcoded fallbacks or make them locale-aware (fallback to English only if locale is 'en').

---

## 2. ACCESSIBILITY (WCAG 2.1 AA)

### 2.1 Keyboard Navigation

**Status:** ✅ **GOOD** (with minor issues)

- All interactive elements appear keyboard-accessible
- No `tabindex > 0` found
- Focus management exists for modals (Radix UI handles this)
- Site header dropdowns have keyboard support (Enter, Space, ArrowDown, Escape)

**Issues Found:**

#### Issue 2.1.1: Missing Keyboard Handler for Ticket Reply Form
- **Severity:** Optional
- **Area:** a11y
- **Location:** `app/[locale]/dashboard/tickets/[id]/page.tsx:159`
- **Description:** Form has `onSubmit` handler but only prevents default. No explicit keyboard handling (though native form submission works with Enter key).
- **Impact:** Minor — form works with Enter key via native behavior, but could be more explicit.
- **Recommendation:** Ensure form submission works correctly. Current implementation is acceptable but verify it handles Enter key submission properly.

### 2.2 Form Accessibility

**Status:** ⚠️ **MIXED**

- Profile page has good form accessibility (labels, aria-invalid, aria-describedby, role="alert" for errors)
- Ticket reply form has sr-only label
- Some forms may need improvement

**Issues Found:**

#### Issue 2.2.1: Missing name Attribute on City Input
- **Severity:** Critical
- **Area:** a11y / Forms
- **Location:** `app/[locale]/dashboard/profile/page.tsx:188-193`
- **Description:** 
  ```tsx
  <input
    id="profile-city"
    type="text"
    defaultValue={placeholderProfile.city}
    // Missing: name="profile-city"
  ```
  City input field lacks `name` attribute. All other inputs in the form have `name` attributes, and form submission uses `FormData.get()` which requires `name` attributes.
- **Impact:** 
  - Form data for city field will not be submitted
  - Screen readers may have issues identifying the field
  - Form validation cannot reference this field by name
- **Recommendation:** Add `name="profile-city"` to the city input field.

#### Issue 2.2.2: Incomplete Form Validation
- **Severity:** Important
- **Area:** a11y / Forms
- **Location:** `app/[locale]/dashboard/profile/page.tsx:44-46`
- **Description:** Form only validates email field. Other required fields (firstName, lastName, etc.) have `required` HTML attribute but no client-side validation or error messaging.
- **Impact:** 
  - Users may submit incomplete forms
  - No accessible error feedback for fields other than email
  - Inconsistent validation experience
- **Recommendation:** Add validation for all required fields with appropriate error messages and `aria-describedby` associations. Ensure all error messages are translated.

### 2.3 Focus Management

**Status:** ✅ **GOOD**

- Radix UI components (AlertDialog, Dialog) handle focus trapping automatically
- Profile form focuses first error field on validation failure
- Site header dropdowns return focus to trigger button on Escape

**Issues Found:** None critical.

### 2.4 Icon-Only Actions

**Status:** ✅ **GOOD**

- Icon-only buttons have `aria-label` attributes
- External links have descriptive `aria-label` with "opens in new tab" indicators
- Icons have `aria-hidden="true"` where appropriate

**Issues Found:** None.

### 2.5 List Semantics

**Status:** ✅ **GOOD**

- Native `<ul>` and `<li>` elements used correctly
- No redundant `role="list"` attributes (recently cleaned up)
- Lists are properly structured

**Issues Found:** None.

### 2.6 Dynamic User Feedback (aria-live)

**Status:** ✅ **GOOD**

- Profile page has `aria-live="polite" aria-atomic="true"` region for form status
- Toast component has `aria-live="polite"` and `role="status"`
- Error messages use `role="alert"` appropriately

**Issues Found:** None.

### 2.7 Screen Reader Experience

**Status:** ✅ **GOOD**

- Semantic HTML used throughout
- Proper heading hierarchy
- Form labels associated with inputs
- Error messages linked via `aria-describedby`

**Issues Found:** None critical.

---

## 3. SEO (PUBLIC vs DASHBOARD)

### 3.1 Metadata Generation

**Status:** ✅ **GOOD**

- All pages have `generateMetadata()` functions
- `createMetadata` utility used consistently
- Titles and descriptions come from translation files
- Dynamic titles for detail pages (service name, domain name, ticket subject)

**Issues Found:** None.

### 3.2 NOINDEX Enforcement

**Status:** ✅ **GOOD**

- All dashboard pages correctly set `noindex: true, nofollow: true`
- Auth pages (signin, register, forgot-password) are noindex
- Cart and checkout pages are noindex
- Public pages (homepage, domains, hosting, SSL) are indexable

**Issues Found:** None.

### 3.3 hreflang and Canonical URLs

**Status:** ✅ **GOOD**

- `createMetadata` utility generates hreflang alternates correctly
- Canonical URLs include locale prefix
- Both EN and TR versions referenced in alternates
- `x-default` set to Turkish (defaultLocale)

**Issues Found:** None.

### 3.4 HTML Lang Attribute

**Status:** ❌ **CRITICAL ISSUE**

#### Issue 3.4.1: Hardcoded lang in Root Layout
- **Severity:** Critical
- **Area:** SEO / i18n
- **Location:** `app/layout.tsx:17`
- **Description:** Root layout has hardcoded `lang="tr"`. While `HtmlLangUpdater` updates this client-side, initial server render will always be Turkish.
- **Impact:** 
  - SEO crawlers see incorrect language for English pages
  - Screen readers may announce in wrong language initially
  - Breaks HTML lang correctness requirement
- **Recommendation:** Remove `lang` from root layout. The `HtmlLangUpdater` component already handles this dynamically via `useEffect`. Alternatively, make root layout locale-aware if possible.

---

## 4. UX & INFORMATION ARCHITECTURE

### 4.1 Empty States

**Status:** ✅ **GOOD**

- Empty states have helpful copy and single action buttons
- Consistent messaging across dashboard sections
- Empty states are translated

**Issues Found:** None.

### 4.2 Error States

**Status:** ⚠️ **NEEDS IMPROVEMENT**

- Form errors are handled well (profile page)
- No error boundaries for React errors
- No global error handling for API failures

**Issues Found:**

#### Issue 4.2.1: Missing Error Boundaries
- **Severity:** Important
- **Area:** UX / Architecture
- **Description:** No React error boundaries found. If a component throws an error, the entire app crashes with a white screen.
- **Impact:** 
  - Poor user experience on errors
  - No graceful degradation
  - Users see React error overlay in production
- **Recommendation:** Add error boundaries at route level (e.g., in `[locale]/layout.tsx`) and at dashboard layout level. Display user-friendly error messages with translation keys.

### 4.3 Loading States

**Status:** ⚠️ **INCOMPLETE**

- Root `loading.tsx` returns `null` (no loading UI)
- Some pages have client-side loading states (checkout, cart)
- No skeleton loaders used in dashboard pages

**Issues Found:**

#### Issue 4.3.1: Empty Root Loading Component
- **Severity:** Optional
- **Area:** UX
- **Location:** `app/loading.tsx:1-3`
- **Description:** Root loading component returns `null`, providing no loading feedback.
- **Impact:** Users see blank screen during initial page loads.
- **Recommendation:** Add a loading spinner or skeleton UI. Consider using the existing `Spinner` component with translated loading message.

### 4.4 Action Clarity

**Status:** ✅ **GOOD**

- Buttons have clear labels
- Destructive actions use AlertDialog for confirmation
- Actions are translated

**Issues Found:** None.

### 4.5 Navigation and Breadcrumbs

**Status:** ✅ **GOOD**

- Breadcrumb components used on detail pages
- Navigation is clear and consistent
- Dashboard navigation has proper aria-label

**Issues Found:** None.

---

## 5. COMPONENT & ARCHITECTURE HEALTH

### 5.1 Component Responsibility

**Status:** ✅ **GOOD**

- Components are focused and reusable
- No page-level logic in components
- Good separation of concerns

**Issues Found:** None.

### 5.2 Code Quality Issues

**Status:** ⚠️ **NEEDS CLEANUP**

**Issues Found:**

#### Issue 5.2.1: Console.log in Production Code
- **Severity:** Important
- **Area:** Architecture
- **Location:** `app/[locale]/dashboard/services/[id]/page.tsx:73`
- **Description:** 
  ```typescript
  console.log('Cancellation requested for service:', placeholderService.id)
  ```
  Console.log statement left in production code.
- **Impact:** 
  - Pollutes browser console
  - Potential information leakage
  - Unprofessional
- **Recommendation:** Remove console.log. Use proper logging service or remove entirely if not needed. Consider using a logger utility that only logs in development.

#### Issue 5.2.2: Dead Links (href="#")
- **Severity:** Important
- **Area:** UX / Architecture
- **Locations:** 
  - `app/[locale]/dashboard/services/[id]/page.tsx:190` (Control Panel link)
  - `app/[locale]/dashboard/billing/page.tsx:191` (Download invoice link)
  - `app/[locale]/dashboard/domains/[id]/page.tsx:183` (DNS Management link)
- **Description:** Multiple links use `href="#"` which does nothing and causes page scroll to top on click.
- **Impact:** 
  - Broken user experience
  - Users click links expecting functionality
  - Page scrolls to top unexpectedly
- **Recommendation:** 
  - Replace with proper WHMCS URLs when available
  - Or disable links with `aria-disabled="true"` and `onClick={(e) => e.preventDefault()}`
  - Or remove links entirely if functionality not yet implemented
  - Add TODO comments indicating these need WHMCS integration

#### Issue 5.2.3: Window.location.reload() Usage
- **Severity:** Important
- **Area:** UX / Architecture
- **Location:** `app/[locale]/dashboard/profile/page.tsx:240`
- **Description:** 
  ```tsx
  <Button type="button" variant="outline" onClick={() => window.location.reload()}>
  ```
  Cancel button uses `window.location.reload()` which causes full page reload and may lose locale context or cause flicker.
- **Impact:** 
  - Poor UX (full page reload)
  - Potential locale loss if URL changes
  - Loses any unsaved form state unnecessarily
- **Recommendation:** 
  - Use Next.js router to navigate back or reset form state
  - Or simply reset form fields to original values without reload
  - Example: `router.back()` or reset form state manually

### 5.3 Type Safety

**Status:** ✅ **GOOD**

- TypeScript used throughout
- No `@ts-ignore` or `as any` found in dashboard code
- Types are properly defined

**Issues Found:** None critical.

### 5.4 Maintainability

**Status:** ✅ **GOOD**

- Code is well-organized
- Clear file structure
- Consistent patterns

**Issues Found:** None.

---

## 6. WHMCS INTEGRATION RISKS

### 6.1 Data Assumptions

**Status:** ⚠️ **NEEDS DOCUMENTATION**

- Placeholder data structures exist
- Comments indicate WHMCS API endpoints needed
- No validation of WHMCS response structures

**Issues Found:**

#### Issue 6.1.1: Missing WHMCS Response Type Definitions
- **Severity:** Important
- **Area:** WHMCS
- **Description:** No TypeScript types defined for WHMCS API responses. Placeholder data structures exist but no formal types.
- **Impact:** 
  - Type safety lost when integrating real WHMCS API
  - Potential runtime errors if WHMCS response structure differs
  - Difficult to validate API responses
- **Recommendation:** Create TypeScript interfaces/types for WHMCS API responses (e.g., `WHMCSClientProduct`, `WHMCSInvoice`, `WHMCSDomain`, `WHMCSTicket`). Document expected response structures and edge cases.

#### Issue 6.1.2: Status Value Mapping Incomplete
- **Severity:** Important
- **Area:** WHMCS
- **Description:** Status values are hardcoded as string literals (`'active'`, `'suspended'`, `'pending'`, etc.) but no validation that WHMCS returns these exact values. WHMCS may return different status strings or additional statuses.
- **Impact:** 
  - Status badges may not display correctly
  - Unknown statuses may cause UI errors
  - Status filtering may break
- **Recommendation:** 
  - Create a status mapping utility that normalizes WHMCS status values to UI status values
  - Add fallback handling for unknown statuses
  - Document all possible WHMCS status values

#### Issue 6.1.3: Missing Error Handling for WHMCS API Failures
- **Severity:** Critical
- **Area:** WHMCS
- **Description:** No error handling for WHMCS API failures (network errors, authentication errors, rate limiting, etc.). All API calls are placeholders with `setTimeout` simulations.
- **Impact:** 
  - App will crash on real API failures
  - No user feedback on errors
  - Poor error recovery
- **Recommendation:** 
  - Implement proper error handling for all WHMCS API calls
  - Add retry logic for transient failures
  - Display user-friendly error messages (translated)
  - Log errors for monitoring
  - Handle authentication failures gracefully (redirect to login)

### 6.2 Edge Cases

**Status:** ⚠️ **NEEDS COVERAGE**

**Issues Found:**

#### Issue 6.2.1: No Handling for Empty WHMCS Responses
- **Severity:** Important
- **Area:** WHMCS
- **Description:** Code assumes arrays are never null/undefined, but WHMCS may return null or empty arrays. Some pages check `.length === 0` but don't handle null.
- **Impact:** Potential runtime errors if WHMCS returns null instead of empty array.
- **Recommendation:** Add null checks and default to empty arrays: `const services = whmcsResponse?.products || []`

#### Issue 6.2.2: Missing Locale Preservation in Redirects
- **Severity:** Important
- **Area:** WHMCS / i18n
- **Description:** When redirecting after actions (e.g., after payment, after ticket creation), locale may be lost if redirects don't use `addLocaleToPath`.
- **Impact:** Users redirected to non-localized URLs, breaking i18n.
- **Recommendation:** Ensure all redirects (including WHMCS callback URLs) preserve locale. Use `addLocaleToPath` for all internal redirects.

### 6.3 TODO Comments and Placeholder Code

**Status:** ⚠️ **EXPECTED (Pre-Integration)**

- Multiple TODO comments indicate WHMCS integration needed
- Placeholder data structures are well-documented
- Comments indicate which WHMCS API endpoints to use

**Issues Found:** None (these are expected before WHMCS integration).

---

## LAUNCH BLOCKERS (Must Fix Before Production)

1. **Hardcoded HTML lang attribute** (`app/layout.tsx:17`)
   - Remove `lang="tr"` from root layout or make it dynamic
   - Fix: Remove lang attribute; `HtmlLangUpdater` already handles this

2. **Missing name attribute on city input** (`app/[locale]/dashboard/profile/page.tsx:188`)
   - Add `name="profile-city"` to city input field

3. **Dead links with href="#"** (3 locations)
   - Replace with proper URLs or disable with proper ARIA
   - Locations: services/[id]/page.tsx:190, billing/page.tsx:191, domains/[id]/page.tsx:183

4. **Console.log in production** (`app/[locale]/dashboard/services/[id]/page.tsx:73`)
   - Remove or replace with proper logging

5. **Window.location.reload() usage** (`app/[locale]/dashboard/profile/page.tsx:240`)
   - Replace with Next.js router navigation or form reset

6. **Missing error boundaries**
   - Add React error boundaries at layout level
   - Display user-friendly error messages

7. **Incomplete form validation**
   - Add validation for all required fields in profile form
   - Ensure all error messages are translated

---

## SHORT-TERM IMPROVEMENTS (1-2 Sprints)

1. **Add translation key validation**
   - CI/CD check to ensure EN/TR keys match
   - Linting rule to prevent hardcoded strings

2. **Implement pluralization support**
   - Add i18next or manual pluralization logic
   - Fix Turkish plural rules

3. **Add loading states**
   - Implement skeleton loaders for dashboard pages
   - Add loading UI to root loading.tsx

4. **Improve error handling**
   - Add error boundaries
   - Handle WHMCS API failures gracefully
   - Add retry logic for transient failures

5. **Remove hardcoded fallback strings**
   - Ensure all translation keys exist
   - Remove or make fallbacks locale-aware

6. **Add WHMCS response type definitions**
   - Create TypeScript interfaces for WHMCS API responses
   - Document expected response structures

---

## LONG-TERM IMPROVEMENTS

1. **Comprehensive error monitoring**
   - Integrate error tracking service (Sentry, etc.)
   - Log all WHMCS API errors
   - Monitor user-facing errors

2. **Performance optimization**
   - Implement code splitting for dashboard routes
   - Add image optimization
   - Lazy load heavy components

3. **Testing infrastructure**
   - Add unit tests for formatting utilities
   - Add integration tests for critical flows
   - Add E2E tests for dashboard workflows

4. **Documentation**
   - Document WHMCS integration patterns
   - Create developer guide for adding new pages
   - Document translation key naming conventions

---

## HARD RULES TO LOCK IN (Team-Wide Conventions)

1. **NO hardcoded user-facing strings** — All text must use translation keys
2. **NO direct Intl API usage** — All formatting via `lib/format-utils.ts`
3. **NO href="#" links** — Either proper URLs or disabled with ARIA
4. **NO console.log in production** — Use proper logging or remove
5. **ALL forms must have name attributes** — Required for FormData submission
6. **ALL external links must have rel="noopener noreferrer"** — Security requirement
7. **ALL dashboard pages must be noindex** — Enforced via `createMetadata`
8. **ALL locale-aware navigation** — Use `addLocaleToPath` for all internal links
9. **ALL error messages must be translated** — No hardcoded error text
10. **ALL interactive elements must be keyboard accessible** — No mouse-only interactions

---

## WHAT NOT TO OVER-ENGINEER

1. **Don't add complex state management** — Current useState/useEffect is sufficient
2. **Don't add unnecessary ARIA** — Prefer native HTML semantics
3. **Don't add analytics everywhere** — Focus on critical user actions only
4. **Don't add complex caching** — WHMCS will handle caching
5. **Don't add client-side routing for WHMCS redirects** — Use standard HTTP redirects
6. **Don't add complex form libraries** — Native forms with validation are sufficient
7. **Don't add unnecessary abstractions** — Keep code simple and maintainable

---

## CONCLUSION

The platform has a **solid foundation** but requires **critical fixes** before production launch. The most urgent issues are:

1. Hardcoded HTML lang attribute
2. Missing form input name attribute
3. Dead links
4. Missing error boundaries
5. Incomplete form validation

Once these are resolved, the platform will be significantly closer to production readiness. The architecture is sound, and the remaining work is primarily integration and polish.

**Estimated effort to production-ready:** 2-3 sprints (assuming WHMCS API integration is separate work).
