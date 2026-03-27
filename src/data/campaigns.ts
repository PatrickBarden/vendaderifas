import type { Campaign } from '@/types/domain';

export const campaigns: Campaign[] = [
  {
    id: '1',
    code: '#1042',
    title: 'RAM 2500 Laramie + R$ 50 mil no PIX',
    shortDescription: 'Pickup premium com alta procura e bônus em dinheiro.',
    description: 'A lendária RAM 2500 Laramie em versão exclusiva, pronta para uma campanha de alto giro.',
    category: 'pickup',
    ticketPrice: 1.5,
    totalTickets: 100000,
    soldTickets: 84000,
    heroImage: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80',
    ],
    badge: 'Destaque',
    drawDate: '2026-06-15',
  },
  {
    id: '2',
    code: '#1043',
    title: 'Toyota Hilux GR Sport 2024',
    shortDescription: 'A bruta mais desejada do Brasil com grande apelo comercial.',
    description: 'Hilux GR-S 2024 com posicionamento premium e forte aderência ao público automotivo.',
    category: 'pickup',
    ticketPrice: 0.99,
    totalTickets: 100000,
    soldTickets: 42000,
    heroImage: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80',
    gallery: ['https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80'],
    drawDate: '2026-07-28',
  },
  {
    id: '3',
    code: '#1044',
    title: 'R$ 500.000,00 no PIX',
    shortDescription: 'Campanha em dinheiro com alta capacidade de escala.',
    description: 'Prêmio em dinheiro com jornada simples e grande potencial de conversão.',
    category: 'cash',
    ticketPrice: 2.5,
    originalPrice: 3,
    totalTickets: 200000,
    soldTickets: 24000,
    heroImage: 'https://images.unsplash.com/photo-1622185135505-2d795003994a?auto=format&fit=crop&q=80',
    gallery: ['https://images.unsplash.com/photo-1622185135505-2d795003994a?auto=format&fit=crop&q=80'],
    badge: 'VIP',
    drawDate: '2026-08-10',
  },
];

export function getCampaignById(id?: string) {
  return campaigns.find((campaign) => campaign.id === id) ?? campaigns[0];
}
