import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { cookies, headers } from 'next/headers';

export default getRequestConfig(async () => {
  // Read locale from cookie first (set by language switcher)
  const cookieStore = await cookies();
  let locale = cookieStore.get('NEXT_LOCALE')?.value;

  // If no cookie, try to get from Accept-Language header
  if (!locale) {
    const headersList = await headers();
    const acceptLanguage = headersList.get('accept-language');
    if (acceptLanguage) {
      // Parse Accept-Language header (e.g., "en-US,en;q=0.9,hi;q=0.8")
      const languages = acceptLanguage.split(',').map(lang => {
        const [code] = lang.split(';');
        return code.trim().split('-')[0].toLowerCase();
      });
      
      // Find first supported locale
      locale = languages.find(lang => routing.locales.includes(lang as typeof routing.locales[number])) as string | undefined;
    }
  }

  // Fallback to default locale
  if (!locale || !routing.locales.includes(locale as typeof routing.locales[number])) {
    locale = routing.defaultLocale;
  }

  return {
    locale: locale as typeof routing.defaultLocale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});

