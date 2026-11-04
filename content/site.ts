import type { Cta, FooterColumn, NavItem } from '@/lib/types';

export const site = {
  name: 'Cultiver l’IA',
  brand: 'Groupama × Groupe 15',
  brandSub: 'Cultiver l’IA',
  url: 'https://groupama-cultiver-ia.vercel.app',
  description:
    'L’IA et le numérique au service des métiers, des compétences et des sociétaires de Groupama. Comme l’eau nourrit la terre, cultivons l’intelligence.',
  logoAlt: 'Logo Groupama × Groupe 15 : un G vert et bleu avec une feuille, une goutte d’eau et une vague',
  logoIconAlt: 'Groupama × Groupe 15',
};

export const slogans = {
  main: 'Comme l’eau nourrit la terre, cultivons l’intelligence et faisons grandir les talents de demain.',
  secondary:
    'Comme la nature fait grandir ses racines, cultivons ensemble les talents qui feront fleurir l’avenir de Groupama.',
  short: 'Cultivons l’intelligence, faisons fleurir nos talents.',
  promise: ['+ IA', '+ Compétences', '+ Protection des sociétaires'],
};

export const nav: NavItem[] = [
  { label: 'Accueil', href: '/', icon: 'Home' },
  { label: 'Anticiper', href: '/anticiper', icon: 'CloudSun' },
  { label: 'Grandir', href: '/grandir', icon: 'Trees' },
  { label: 'Simplifier', href: '/simplifier', icon: 'Waves' },
  { label: 'Relier', href: '/relier', icon: 'Network' },
  { label: 'Le projet', href: '/projet', icon: 'Target' },
];

export const navUser = {
  label: 'Mon parcours',
  href: '/parcours',
  initials: 'CL',
  name: 'Camille L.',
};

export const navUi = {
  skipLink: 'Aller au contenu principal',
  openMenu: 'Ouvrir le menu',
  closeMenu: 'Fermer le menu',
  mainNavLabel: 'Navigation principale',
  homeLabel: 'Accueil — Groupama × Groupe 15',
};

export const footer = {
  tagline: slogans.short,
  about:
    'Un projet du Groupe 15 pour Groupama : faire de l’IA un outil au service des collaborateurs et des sociétaires.',
  columns: [
    {
      title: 'Explorer',
      links: [
        { label: 'Anticiper', href: '/anticiper' },
        { label: 'Grandir', href: '/grandir' },
        { label: 'Simplifier', href: '/simplifier' },
        { label: 'Relier', href: '/relier' },
        { label: 'Le projet CAP IA', href: '/projet' },
      ],
    },
    {
      title: 'Mon espace',
      links: [
        { label: 'Mon parcours', href: '/parcours' },
        { label: 'Passeport compétences', href: '/parcours#passeport' },
        { label: 'Lab IA', href: '/grandir#lab' },
      ],
    },
    {
      title: 'Confiance',
      links: [
        { label: 'Charte IA responsable', href: '/charte' },
        { label: 'Guide de l’IA', href: '/relier#guide' },
        { label: 'À propos', href: '/a-propos' },
      ],
    },
  ] satisfies FooterColumn[],
  disclaimer:
    'Maquette réalisée par le Groupe 15. Les chiffres, noms, témoignages et concurrents (A, B, C) présentés sont fictifs.',
  copyright: '© 2026 Groupama × Groupe 15',
  legal: [
    { label: 'Charte IA', href: '/charte' },
    { label: 'À propos', href: '/a-propos' },
  ],
};

export const finalCta: Cta[] = [
  { label: 'Cultiver mes compétences', href: '/parcours', variant: 'light', icon: 'Sprout' },
  { label: 'Découvrir les 5 actions', href: '/grandir', variant: 'ghostLight', icon: 'ArrowRight' },
];
