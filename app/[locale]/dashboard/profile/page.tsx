"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { useParams } from "next/navigation"
import { useTranslation } from "@/lib/i18n"
import enDashboard from "@/locales/en/dashboard.json"
import trDashboard from "@/locales/tr/dashboard.json"

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

export default function ProfilePage() {
  const params = useParams()
  const locale = (params?.locale as string) || 'tr'
  const validLocale = (locale === 'en' || locale === 'tr') ? locale : 'tr'
  const t = validLocale === 'en' ? enDashboard : trDashboard
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})
    setSubmitStatus(null)

    // TODO: Implement form validation and API call
    // Placeholder validation
    const formData = new FormData(e.currentTarget)
    const newErrors: Record<string, string> = {}

    // Validate required fields
    const firstName = (formData.get('profile-firstName') as string)?.trim()
    if (!firstName) {
      newErrors.firstName = t.profile.errors?.required || 'This field is required'
    }

    const lastName = (formData.get('profile-lastName') as string)?.trim()
    if (!lastName) {
      newErrors.lastName = t.profile.errors?.required || 'This field is required'
    }

    const email = (formData.get('profile-email') as string)?.trim()
    if (!email) {
      newErrors.email = t.profile.errors?.required || 'This field is required'
    } else if (!email.includes('@') || !email.includes('.')) {
      newErrors.email = t.profile.errors?.invalidEmail || 'Please enter a valid email address'
    }

    const phone = (formData.get('profile-phone') as string)?.trim()
    if (!phone) {
      newErrors.phone = t.profile.errors?.required || 'This field is required'
    }

    const address = (formData.get('profile-address') as string)?.trim()
    if (!address) {
      newErrors.address = t.profile.errors?.required || 'This field is required'
    }

    const city = (formData.get('profile-city') as string)?.trim()
    if (!city) {
      newErrors.city = t.profile.errors?.required || 'This field is required'
    }

    const state = (formData.get('profile-state') as string)?.trim()
    if (!state) {
      newErrors.state = t.profile.errors?.required || 'This field is required'
    }

    const zip = (formData.get('profile-zip') as string)?.trim()
    if (!zip) {
      newErrors.zip = t.profile.errors?.required || 'This field is required'
    }

    const country = (formData.get('profile-country') as string)?.trim()
    if (!country) {
      newErrors.country = t.profile.errors?.required || 'This field is required'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsSubmitting(false)
      setSubmitStatus('error')
      // Focus first error field
      const firstErrorField = document.querySelector('[aria-invalid="true"]') as HTMLElement
      if (firstErrorField) {
        firstErrorField.focus()
      }
      return
    }

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
    }, 1000)
  }

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

      {/* Status messages */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {submitStatus === 'success' && <span>{t.profile.messages?.saveSuccess || 'Profile saved successfully'}</span>}
        {submitStatus === 'error' && <span role="alert">{t.profile.messages?.saveError || 'Error saving profile. Please check the form.'}</span>}
        {isSubmitting && <span>{t.profile.messages?.saving || 'Saving...'}</span>}
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="max-w-2xl space-y-6" noValidate>
        {/* Personal Information */}
        <section className="rounded-lg border bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-6">
            {t.profile.personalInformation}
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="profile-firstName" className="block text-sm font-medium text-foreground mb-2">
                  {t.profile.firstName}
                </label>
                <input
                  id="profile-firstName"
                  name="profile-firstName"
                  type="text"
                  defaultValue={placeholderProfile.firstName}
                  className={`w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${errors.firstName ? 'border-destructive' : 'border-input'}`}
                  aria-invalid={!!errors.firstName}
                  aria-describedby={errors.firstName ? 'profile-firstName-error' : undefined}
                  required
                />
                {errors.firstName && (
                  <p id="profile-firstName-error" className="text-sm text-destructive mt-1.5" role="alert">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="profile-lastName" className="block text-sm font-medium text-foreground mb-2">
                  {t.profile.lastName}
                </label>
                <input
                  id="profile-lastName"
                  name="profile-lastName"
                  type="text"
                  defaultValue={placeholderProfile.lastName}
                  className={`w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${errors.lastName ? 'border-destructive' : 'border-input'}`}
                  aria-invalid={!!errors.lastName}
                  aria-describedby={errors.lastName ? 'profile-lastName-error' : undefined}
                  required
                />
                {errors.lastName && (
                  <p id="profile-lastName-error" className="text-sm text-destructive mt-1.5" role="alert">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="profile-email" className="block text-sm font-medium text-foreground mb-2">
                {t.profile.emailAddress}
              </label>
              <input
                id="profile-email"
                name="profile-email"
                type="email"
                defaultValue={placeholderProfile.email}
                className={`w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${errors.email ? 'border-destructive' : 'border-input'}`}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'profile-email-error' : undefined}
                required
              />
              {errors.email && (
                <p id="profile-email-error" className="text-sm text-destructive mt-1.5" role="alert">
                  {errors.email}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="profile-phone" className="block text-sm font-medium text-foreground mb-2">
                {t.profile.phoneNumber}
              </label>
              <input
                id="profile-phone"
                name="profile-phone"
                type="tel"
                defaultValue={placeholderProfile.phone}
                className={`w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${errors.phone ? 'border-destructive' : 'border-input'}`}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'profile-phone-error' : undefined}
                required
              />
              {errors.phone && (
                <p id="profile-phone-error" className="text-sm text-destructive mt-1.5" role="alert">
                  {errors.phone}
                </p>
              )}
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
              <label htmlFor="profile-company" className="block text-sm font-medium text-foreground mb-2">
                {t.profile.companyName}
              </label>
              <input
                id="profile-company"
                name="profile-company"
                type="text"
                defaultValue={placeholderProfile.company}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
            <div>
              <label htmlFor="profile-address" className="block text-sm font-medium text-foreground mb-2">
                {t.profile.address}
              </label>
              <input
                id="profile-address"
                name="profile-address"
                type="text"
                defaultValue={placeholderProfile.address}
                className={`w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${errors.address ? 'border-destructive' : 'border-input'}`}
                aria-invalid={!!errors.address}
                aria-describedby={errors.address ? 'profile-address-error' : undefined}
                required
              />
              {errors.address && (
                <p id="profile-address-error" className="text-sm text-destructive mt-1.5" role="alert">
                  {errors.address}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="profile-city" className="block text-sm font-medium text-foreground mb-2">
                  {t.profile.city}
                </label>
                <input
                  id="profile-city"
                  name="profile-city"
                  type="text"
                  defaultValue={placeholderProfile.city}
                  className={`w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${errors.city ? 'border-destructive' : 'border-input'}`}
                  aria-invalid={!!errors.city}
                  aria-describedby={errors.city ? 'profile-city-error' : undefined}
                  required
                />
                {errors.city && (
                  <p id="profile-city-error" className="text-sm text-destructive mt-1.5" role="alert">
                    {errors.city}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="profile-state" className="block text-sm font-medium text-foreground mb-2">
                  {t.profile.state}
                </label>
                <input
                  id="profile-state"
                  name="profile-state"
                  type="text"
                  defaultValue={placeholderProfile.state}
                  className={`w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${errors.state ? 'border-destructive' : 'border-input'}`}
                  aria-invalid={!!errors.state}
                  aria-describedby={errors.state ? 'profile-state-error' : undefined}
                  required
                />
                {errors.state && (
                  <p id="profile-state-error" className="text-sm text-destructive mt-1.5" role="alert">
                    {errors.state}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="profile-zip" className="block text-sm font-medium text-foreground mb-2">
                  {t.profile.zipCode}
                </label>
                <input
                  id="profile-zip"
                  name="profile-zip"
                  type="text"
                  defaultValue={placeholderProfile.zip}
                  className={`w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${errors.zip ? 'border-destructive' : 'border-input'}`}
                  aria-invalid={!!errors.zip}
                  aria-describedby={errors.zip ? 'profile-zip-error' : undefined}
                  required
                />
                {errors.zip && (
                  <p id="profile-zip-error" className="text-sm text-destructive mt-1.5" role="alert">
                    {errors.zip}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="profile-country" className="block text-sm font-medium text-foreground mb-2">
                {t.profile.country}
              </label>
              <input
                id="profile-country"
                name="profile-country"
                type="text"
                defaultValue={placeholderProfile.country}
                className={`w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${errors.country ? 'border-destructive' : 'border-input'}`}
                aria-invalid={!!errors.country}
                aria-describedby={errors.country ? 'profile-country-error' : undefined}
                required
              />
              {errors.country && (
                <p id="profile-country-error" className="text-sm text-destructive mt-1.5" role="alert">
                  {errors.country}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (t.profile.messages?.saving || 'Saving...') : t.profile.saveChanges}
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => {
              if (formRef.current) {
                formRef.current.reset()
                setErrors({})
                setSubmitStatus(null)
              }
            }}
          >
            {t.profile.cancel}
          </Button>
        </div>
      </form>
    </>
  )
}
