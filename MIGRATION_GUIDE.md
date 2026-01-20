# URL-Based Locale Routing Migration Guide

## Status
✅ Core infrastructure complete:
- Middleware for locale routing
- Locale-aware layout at `app/[locale]/layout.tsx`
- Root redirect to default locale (tr)
- Updated i18n to accept initialLocale
- Updated SiteHeader and SiteFooter with locale-aware links
- Updated LanguageSwitcher to navigate to locale URLs
- Homepage moved to `app/[locale]/page.tsx`

## Remaining Tasks

### 1. Move All Pages to `app/[locale]/`

For each directory in `app/` (except `[locale]`, `globals.css`, `loading.tsx`):

**Pattern:**
1. Copy entire directory to `app/[locale]/[directory-name]/`
2. For each `page.tsx`:
   - Add `useParams()` to get locale
   - Add `getPath()` helper using `addLocaleToPath()`
   - Update all internal `href="/..."` to `href={getPath("/...")}`
3. For each `layout.tsx`:
   - Update `generateMetadata` to accept `params: Promise<{ locale: string }>`
   - Await params: `const { locale } = await params`
   - Use locale in metadata generation

### 2. Directories to Move:
- [ ] `app/cart/` → `app/[locale]/cart/`
- [ ] `app/checkout/` → `app/[locale]/checkout/`
- [ ] `app/configure/` → `app/[locale]/configure/`
- [ ] `app/contact/` → `app/[locale]/contact/`
- [ ] `app/domains/` → `app/[locale]/domains/` (partially done)
- [ ] `app/forgot-password/` → `app/[locale]/forgot-password/`
- [ ] `app/hosting/` → `app/[locale]/hosting/`
- [ ] `app/migration/` → `app/[locale]/migration/`
- [ ] `app/register/` → `app/[locale]/register/`
- [ ] `app/signin/` → `app/[locale]/signin/`
- [ ] `app/ssl/` → `app/[locale]/ssl/`
- [ ] `app/status/` → `app/[locale]/status/`
- [ ] `app/support/` → `app/[locale]/support/`

### 3. Update All Internal Links

In every page component, replace:
```tsx
// Before
<Link href="/path">Text</Link>

// After
const params = useParams()
const locale = (params?.locale as string) || 'tr'
const getPath = (path: string) => addLocaleToPath(path, locale as 'en' | 'tr')

<Link href={getPath("/path")}>Text</Link>
```

### 4. Update Layout Metadata

For all `layout.tsx` files with metadata:
```tsx
// Before
export const metadata: Metadata = createMetadata(...)

// After
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return createMetadata(...)
}
```

## Testing Checklist
- [ ] Root `/` redirects to `/tr`
- [ ] `/en` and `/tr` both work
- [ ] All pages accessible with locale prefix
- [ ] Language switcher updates URL
- [ ] Internal links preserve locale
- [ ] SEO metadata works for both locales
- [ ] No broken links
