import { Crown, HeartHandshake, ShieldCheck, Sparkles, ConciergeBell, Cloud, Award, BookOpen } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export const categoryIcons: Record<string, LucideIcon> = {
  'Leadership':         Crown,
  'Wellness':            HeartHandshake,
  'Compliance':          ShieldCheck,
  'Productivity':        Sparkles,
  'Service Excellence':  ConciergeBell,
  'Cloud':               Cloud,
  'Certification':       Award,
}

export const DefaultCategoryIcon = BookOpen
