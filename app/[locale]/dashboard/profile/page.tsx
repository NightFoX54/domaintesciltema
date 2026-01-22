import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { createMetadata } from "@/lib/seo"
import enDashboard from "@/locales/en/dashboard.json"
import trDashboard from "@/locales/tr/dashboard.json"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const validLocale = (locale === 'en' || locale === 'tr') ? locale : 'tr'
  
  return createMetadata(
    { path: '/dashboard/profile' },
    {
      en: {
        title: 'Profile - Dashboard',
        description: 'Manage your account settings',
      },
      tr: {
        title: 'Profil - Kontrol Paneli',
        description: 'Hesap ayarlarınızı yönetin',
      },
    },
    validLocale
  )
}

// PLACEHOLDER DATA - Replace with WHMCS API: GetClientsDetails
const placeholderProfile = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  company: 'Example Inc.',
  address: '123 Main St',
  city: 'New York',
  state: 'NY',
  zip: '10001',
  country: 'United States',
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const validLocale = (locale === 'en' || locale === 'tr') ? locale : 'tr'
  const t = validLocale === 'en' ? enDashboard : trDashboard

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-foreground mb-2">
          {t.profile.title}
        </h1>
        <p className="text-muted-foreground">
          {t.profile.subtitle}
        </p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Personal Information */}
        <section className="rounded-lg border bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-6">
            {t.profile.personalInformation}
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t.profile.firstName}
                </label>
                <input
                  type="text"
                  defaultValue={placeholderProfile.firstName}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t.profile.lastName}
                </label>
                <input
                  type="text"
                  defaultValue={placeholderProfile.lastName}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t.profile.emailAddress}
              </label>
              <input
                type="email"
                defaultValue={placeholderProfile.email}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t.profile.phoneNumber}
              </label>
              <input
                type="tel"
                defaultValue={placeholderProfile.phone}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
          </div>
        </section>

        {/* Address Information */}
        <section className="rounded-lg border bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-6">
            {t.profile.addressInformation}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t.profile.companyName}
              </label>
              <input
                type="text"
                defaultValue={placeholderProfile.company}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t.profile.address}
              </label>
              <input
                type="text"
                defaultValue={placeholderProfile.address}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t.profile.city}
                </label>
                <input
                  type="text"
                  defaultValue={placeholderProfile.city}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t.profile.state}
                </label>
                <input
                  type="text"
                  defaultValue={placeholderProfile.state}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t.profile.zipCode}
                </label>
                <input
                  type="text"
                  defaultValue={placeholderProfile.zip}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t.profile.country}
              </label>
              <input
                type="text"
                defaultValue={placeholderProfile.country}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
          </div>
        </section>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button>{t.profile.saveChanges}</Button>
          <Button variant="outline">{t.profile.cancel}</Button>
        </div>
      </div>
    </>
  )
}
