import { ServiceDetailClient } from './service-detail-client'

export default async function ServiceDetailPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id, locale: localeParam } = await params
  const validLocale = (localeParam === 'en' || localeParam === 'tr') ? localeParam : 'tr'
  
  // Note: In a real app, you'd fetch the service data here using the id
  // WHMCS API: GetClientsProducts, GetClientsDomains
  
  return <ServiceDetailClient serviceId={id} locale={validLocale} />
}
