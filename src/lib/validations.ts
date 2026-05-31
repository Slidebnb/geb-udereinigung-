import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Bitte geben Sie Ihren Namen an.').max(100),
  email: z.string().email('Bitte geben Sie eine gültige E-Mail-Adresse an.'),
  phone: z.string().max(40).optional().or(z.literal('')),
  subject: z.string().max(150).optional().or(z.literal('')),
  message: z.string().min(10, 'Ihre Nachricht ist zu kurz.').max(3000),
  // Einwilligung wird clientseitig erzwungen; serverseitig optional
  privacy: z.boolean().optional(),
  // Honeypot
  website: z.string().max(0).optional().or(z.literal('')),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const quoteSchema = z.object({
  service: z.string().min(1, 'Bitte wählen Sie eine Leistung.'),
  area: z.string().max(50).optional().or(z.literal('')),
  frequency: z.string().max(50).optional().or(z.literal('')),
  estimatedMin: z.number().int().optional(),
  estimatedMax: z.number().int().optional(),
  name: z.string().min(2, 'Bitte geben Sie Ihren Namen an.').max(100),
  email: z.string().email('Bitte geben Sie eine gültige E-Mail-Adresse an.'),
  phone: z.string().max(40).optional().or(z.literal('')),
  company: z.string().max(120).optional().or(z.literal('')),
  message: z.string().max(3000).optional().or(z.literal('')),
  // Einwilligung wird clientseitig erzwungen; serverseitig optional
  privacy: z.boolean().optional(),
  website: z.string().max(0).optional().or(z.literal('')),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

export const newsletterSchema = z.object({
  email: z.string().email('Bitte geben Sie eine gültige E-Mail-Adresse an.'),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const blogPostSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/, 'Nur Kleinbuchstaben, Zahlen und Bindestriche.'),
  excerpt: z.string().min(10),
  content: z.string().min(20),
  coverImage: z.string().optional().or(z.literal('')),
  author: z.string().optional().or(z.literal('')),
  category: z.string().optional().or(z.literal('')),
  metaTitle: z.string().optional().or(z.literal('')),
  metaDesc: z.string().optional().or(z.literal('')),
  published: z.boolean().optional(),
});

export const testimonialSchema = z.object({
  name: z.string().min(2),
  role: z.string().optional().or(z.literal('')),
  company: z.string().optional().or(z.literal('')),
  content: z.string().min(5),
  rating: z.number().int().min(1).max(5),
  location: z.string().optional().or(z.literal('')),
  published: z.boolean().optional(),
});
