export type LoanStatus = 'PENDING' | 'APPROVED' | 'RETURNED' | 'REJECTED';

export type EquipmentCategory = 'Audio' | 'Video' | 'Iluminación' | 'Accesorios';

export type CardVariant = 'detailed' | 'compact';

export interface LoanRequest {
  id: string;
  resourceName: string;
  category: EquipmentCategory;
  requester: string;
  requestDate: string;
  returnDate: string | null; // Explícito para ausencia de fecha
  status: LoanStatus;
}

export interface SearchCriteria {
  query: string;
  statusFilter: LoanStatus | 'ALL';
  categoryFilter: EquipmentCategory | 'ALL';
}

export interface StatusState {
  isFiltering: boolean;
  resultCount: number;
  hasActiveFilters: boolean;
}

export interface WorkspaceSectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

export interface StatusIndicatorProps {
  state: StatusState;
  children: (state: StatusState) => React.ReactNode;
}

export interface LoanRequestCardProps {
  request: LoanRequest;
  variant?: CardVariant;
  isMarkedForReview?: boolean;
  onToggleReview: (requestId: string) => void;
}

export interface SearchFormProps {
  onSearch: (criteria: SearchCriteria) => void;
  onReset: () => void;
}