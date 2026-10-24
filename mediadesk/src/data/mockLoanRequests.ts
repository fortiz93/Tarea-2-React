import type { LoanRequest } from '../types/LoanRequest.ts';

export const INITIAL_LOAN_REQUESTS: LoanRequest[] = [
  {
    id: 'REQ-2026-001',
    resourceName: 'Cámara Cinema Sony FX3',
    category: 'Video',
    requester: 'Ana Martínez',
    requestDate: '2026-10-20',
    returnDate: '2026-10-28',
    status: 'APPROVED',
  },
  {
    id: 'REQ-2026-002',
    resourceName: 'Micrófono de Estudio Shure SM7B',
    category: 'Audio',
    requester: 'Carlos Gómez',
    requestDate: '2026-10-22',
    returnDate: null, // Fecha no confirmada
    status: 'PENDING',
  },
  {
    id: 'REQ-2026-003',
    resourceName: 'Kit de Luces LED Aputure 300d',
    category: 'Iluminación',
    requester: 'Elena Rostova',
    requestDate: '2026-10-10',
    returnDate: '2026-10-15',
    status: 'RETURNED',
  },
  {
    id: 'REQ-2026-004',
    resourceName: 'Trípode Profesional Manfrotto 504HD',
    category: 'Accesorios',
    requester: 'David Ruiz',
    requestDate: '2026-10-18',
    returnDate: null, // Sin fecha confirmada
    status: 'REJECTED',
  },
];