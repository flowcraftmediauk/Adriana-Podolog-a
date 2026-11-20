import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      message: error.message || 'Ocurrió un error inesperado.',
    };
  }

  componentDidCatch(error: Error) {
    console.error('ErrorBoundary captured error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FFF5EC] text-[#422B30] flex items-center justify-center px-6 py-16">
          <div className="max-w-lg w-full bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-[#F4D5D2] text-center">
            <h1 className="font-serif text-2xl font-semibold text-[#681B36] mb-3">
              No pudimos completar esta acción
            </h1>
            <p className="text-sm text-[#6B4E54] leading-relaxed mb-6">
              Se produjo un inconveniente técnico al procesar la solicitud. Podés recargar la página o escribirnos directamente por WhatsApp.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="px-6 py-2.5 rounded-full bg-[#681B36] text-white text-sm font-medium hover:bg-[#52142A] transition-colors cursor-pointer"
              >
                Recargar página
              </button>
              <button
                type="button"
                onClick={() => this.setState({ hasError: false, message: '' })}
                className="px-6 py-2.5 rounded-full border border-[#D9828B] text-[#681B36] text-sm font-medium hover:bg-[#FFF5EC] transition-colors cursor-pointer"
              >
                Reintentar
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
