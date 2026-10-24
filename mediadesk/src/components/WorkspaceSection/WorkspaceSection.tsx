import React from 'react';
import type { WorkspaceSectionProps } from '../../types/LoanRequest.ts';
import styles from './WorkspaceSection.module.css';

export const WorkspaceSection: React.FC<WorkspaceSectionProps> = ({
  title,
  subtitle,
  children,
  action,
}) => {
  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <div>
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </header>
      <div className={styles.content}>{children}</div>
    </section>
  );
};