import { useMemo, useState } from 'react';
import { INITIAL_LOAN_REQUESTS } from '../data/mockLoanRequests';
import type { LoanRequest, SearchCriteria, StatusState } from '../types/LoanRequest.ts';

const DEFAULT_CRITERIA: SearchCriteria = {
  query: '',
  statusFilter: 'ALL',
  categoryFilter: 'ALL',
};

export const useLoanRequests = () => {
  const [requests] = useState<LoanRequest[]>(INITIAL_LOAN_REQUESTS);
  const [markedForReview, setMarkedForReview] = useState<Set<string>>(new Set());
  const [criteria, setCriteria] = useState<SearchCriteria>(DEFAULT_CRITERIA);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);

  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      const matchesQuery =
        criteria.query === '' ||
        req.resourceName.toLowerCase().includes(criteria.query.toLowerCase()) ||
        req.requester.toLowerCase().includes(criteria.query.toLowerCase());

      const matchesStatus =
        criteria.statusFilter === 'ALL' || req.status === criteria.statusFilter;

      const matchesCategory =
        criteria.categoryFilter === 'ALL' || req.category === criteria.categoryFilter;

      return matchesQuery && matchesStatus && matchesCategory;
    });
  }, [requests, criteria]);

  const handleSearch = (newCriteria: SearchCriteria): void => {
    setIsFiltering(true);
    setCriteria(newCriteria);
    setTimeout(() => {
      setIsFiltering(false);
    }, 250);
  };

  const handleReset = (): void => {
    handleSearch(DEFAULT_CRITERIA);
  };

  const toggleReviewMark = (requestId: string): void => {
    setMarkedForReview((prev) => {
      const next = new Set(prev);
      if (next.has(requestId)) {
        next.delete(requestId);
      } else {
        next.add(requestId);
      }
      return next;
    });
  };

  const statusState: StatusState = {
    isFiltering,
    resultCount: filteredRequests.length,
    hasActiveFilters:
      criteria.query !== '' ||
      criteria.statusFilter !== 'ALL' ||
      criteria.categoryFilter !== 'ALL',
  };

  return {
    filteredRequests,
    markedForReview,
    statusState,
    handleSearch,
    handleReset,
    toggleReviewMark,
  };
};