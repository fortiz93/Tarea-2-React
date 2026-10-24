import React, { useState } from 'react';
import type { EquipmentCategory, LoanStatus, SearchCriteria, SearchFormProps } from '../../types/LoanRequest.ts';
import styles from './SearchForm.module.css';

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch, onReset }) => {
  const [query, setQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<LoanStatus | 'ALL'>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<EquipmentCategory | 'ALL'>('ALL');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setStatusFilter(e.target.value as LoanStatus | 'ALL');
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setCategoryFilter(e.target.value as EquipmentCategory | 'ALL');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // Uso explícito del tipo SearchCriteria
    const criteria: SearchCriteria = {
      query: query.trim(),
      statusFilter,
      categoryFilter,
    };

    onSearch(criteria);
  };

  const handleClear = (): void => {
    setQuery('');
    setStatusFilter('ALL');
    setCategoryFilter('ALL');
    onReset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.group}>
        <label htmlFor="search-input" className={styles.label}>
          Búsqueda
        </label>
        <input
          id="search-input"
          type="text"
          placeholder="Recurso o solicitante..."
          value={query}
          onChange={handleInputChange}
          className={styles.control}
        />
      </div>

      <div className={styles.group}>
        <label htmlFor="status-select" className={styles.label}>
          Estado
        </label>
        <select
          id="status-select"
          value={statusFilter}
          onChange={handleStatusChange}
          className={styles.control}
        >
          <option value="ALL">Todos los estados</option>
          <option value="PENDING">Pendiente</option>
          <option value="APPROVED">Aprobado</option>
          <option value="RETURNED">Devuelto</option>
          <option value="REJECTED">Rechazado</option>
        </select>
      </div>

      <div className={styles.group}>
        <label htmlFor="category-select" className={styles.label}>
          Categoría
        </label>
        <select
          id="category-select"
          value={categoryFilter}
          onChange={handleCategoryChange}
          className={styles.control}
        >
          <option value="ALL">Todas las categorías</option>
          <option value="Video">Video</option>
          <option value="Audio">Audio</option>
          <option value="Iluminación">Iluminación</option>
          <option value="Accesorios">Accesorios</option>
        </select>
      </div>

      <div className={styles.actions}>
        <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
          Buscar
        </button>
        <button
          type="button"
          className={`${styles.btn} ${styles.btnSecondary}`}
          onClick={handleClear}
        >
          Limpiar
        </button>
      </div>
    </form>
  );
};