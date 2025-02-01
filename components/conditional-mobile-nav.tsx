"use client"

import { usePathname } from "next/navigation"
import { MobileNav } from "./mobile-nav"

export function ConditionalMobileNav() {
  const pathname = usePathname()

  // List of paths where the mobile nav should not be shown
  const excludedPaths = [
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/terms',
    '/privacy',
    '/cookie-policy',
  ]

  const showMobileNav = !excludedPaths.some(path => pathname.startsWith(path))

  return <MobileNav show={showMobileNav} user={undefined} />
}

