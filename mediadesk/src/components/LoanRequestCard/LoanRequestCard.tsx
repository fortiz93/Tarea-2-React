import React from 'react';
import type { LoanRequestCardProps, LoanStatus } from '../../types/LoanRequest.ts';
import styles from './LoanRequestCard.module.css';

const STATUS_CLASSES: Record<LoanStatus, { label: string; className: string }> = {
  PENDING: { label: 'Pendiente', className: styles.badgePending },
  APPROVED: { label: 'Aprobado', className: styles.badgeApproved },
  RETURNED: { label: 'Devuelto', className: styles.badgeReturned },
  REJECTED: { label: 'Rechazado', className: styles.badgeRejected },
};

export const LoanRequestCard: React.FC<LoanRequestCardProps> = ({
  request,
  variant = 'detailed',
  isMarkedForReview = false,
  onToggleReview,
}) => {
  const statusConfig = STATUS_CLASSES[request.status];

  const cardClasses = [
    styles.card,
    variant === 'compact' ? styles.cardCompact : styles.cardDetailed,
    isMarkedForReview ? styles.cardMarked : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses}>
      <div className={styles.header}>
        <div>
          <span className={styles.id}>{request.id}</span>
          <h3 className={styles.title}>{request.resourceName}</h3>
        </div>
        <span className={`${styles.badge} ${statusConfig.className}`}>
          {statusConfig.label}
        </span>
      </div>

      <div className={styles.body}>
        <p><strong>Solicitante:</strong> {request.requester}</p>
        <p><strong>Categoría:</strong> {request.category}</p>

        {variant === 'detailed' && (
          <div className={styles.extra}>
            <p><strong>Fecha Solicitud:</strong> {request.requestDate}</p>
            <p>
              <strong>Fecha Devolución:</strong>{' '}
              {request.returnDate ? (
                <span>{request.returnDate}</span>
              ) : (
                <em className={styles.textMuted}>No confirmada</em>
              )}
            </p>
          </div>
        )}
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={`${styles.btn} ${isMarkedForReview ? styles.btnMarked : styles.btnOutline}`}
          onClick={() => onToggleReview(request.id)}
        >
          {isMarkedForReview ? 'En Revisión' : 'Marcar para Revisión'}
        </button>
      </div>
    </div>
  );
};