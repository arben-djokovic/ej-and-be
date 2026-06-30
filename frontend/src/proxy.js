// src/proxy.js
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}

export const cities = ['Podgorica', 'Budva', 'Tivat', 'Kotor', 'Bar', 'Herceg Novi', 'Ulcinj', 'Niksic', 'Cetinje', 'Rozaje', 'Mojkovac', 'Andrijevica', 'Savnik', 'Kolasin', 'Zabljak', 'Danilovgrad', 'Pljevlja', 'Plav', 'Bijelo Polje', 'Berane', 'Pluzine', 'Gusinje', 'Tuzi', 'Zeta', 'Petnjica']