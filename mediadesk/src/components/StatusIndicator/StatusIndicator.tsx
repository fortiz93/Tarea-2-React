import React from 'react';
import type { StatusIndicatorProps } from '../../types/LoanRequest.ts';
import styles from './StatusIndicator.module.css';

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ state, children }) => {
  return <div className={styles.wrapper}>{children(state)}</div>;
};