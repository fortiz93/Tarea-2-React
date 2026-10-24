import React from 'react';
import { LoanRequestCard } from './components/LoanRequestCard/LoanRequestCard';
import { SearchForm } from './components/SearchForm/SearchForm';
import { StatusIndicator } from './components/StatusIndicator/StatusIndicator';
import statusStyles from './components/StatusIndicator/StatusIndicator.module.css';
import { WorkspaceSection } from './components/WorkspaceSection/WorkspaceSection';
import { useLoanRequests } from './hooks/useLoanRequests';
import styles from './App.module.css';

export const App: React.FC = () => {
  const {
    filteredRequests,
    markedForReview,
    statusState,
    handleSearch,
    handleReset,
    toggleReviewMark,
  } = useLoanRequests();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>MediaDesk</h1>
        <p className={styles.subtitle}>
          Gestión y revisión de préstamos de equipo audiovisual
        </p>
      </header>

      <main>
        <WorkspaceSection
          title="Consulta de Solicitudes"
          subtitle="Filtre préstamos por recurso, solicitante o estado actual"
        >
          <SearchForm onSearch={handleSearch} onReset={handleReset} />

          <StatusIndicator state={statusState}>
            {({ isFiltering, resultCount, hasActiveFilters }) => {
              if (isFiltering) {
                return (
                  <div className={`${statusStyles.banner} ${statusStyles.loading}`}>
                    Procesando criterios de búsqueda...
                  </div>
                );
              }
              return (
                <div className={`${statusStyles.banner} ${statusStyles.ready}`}>
                  <span>
                    Se encontraron <strong>{resultCount}</strong> solicitud(es) registrada(s).
                  </span>
                  {hasActiveFilters && (
                    <span className={statusStyles.filterTag}>Filtros aplicados</span>
                  )}
                </div>
              );
            }}
          </StatusIndicator>

          <div className={styles.grid}>
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request, index) => (
                <LoanRequestCard
                  key={request.id}
                  request={request}
                  variant={index % 2 === 0 ? undefined : 'compact'}
                  isMarkedForReview={markedForReview.has(request.id)}
                  onToggleReview={toggleReviewMark}
                />
              ))
            ) : (
              <div className={styles.emptyState}>
                <p>No se encontraron solicitudes que coincidan con la búsqueda.</p>
              </div>
            )}
          </div>
        </WorkspaceSection>

        <WorkspaceSection
          title="Resumen del Sistema"
          subtitle="Estado global de revisión del laboratorio"
        >
          <div className={styles.summaryBox}>
            <p>
              <strong>Marcadas para revisión:</strong> {markedForReview.size} de{' '}
              {filteredRequests.length} visibles.
            </p>
            <p className={styles.summaryNote}>
              Marcar una tarjeta ayuda a priorizar la revisión con el laboratorio antes de la entrega física.
            </p>
          </div>
        </WorkspaceSection>
      </main>
    </div>
  );
};

export default App;