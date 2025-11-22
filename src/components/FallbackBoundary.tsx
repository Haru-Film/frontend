import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

import { ErrorBoundary } from "react-error-boundary";

export type FallbackProps = {
  type: "loading" | "error";
  error?: unknown;
  resetErrorBoundary?: (...args: unknown[]) => void;
};

type Props = {
  children?: React.ReactNode;
  Fallback?: (props: FallbackProps) => React.ReactNode;
};

export function FallbackBoundary({ children, Fallback }: Props) {
  return (
    <Suspense fallback={Fallback && <Fallback type="loading" />}>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={
              Fallback
                ? (props) => <Fallback type="error" {...props} />
                : () => <></>
            }
          >
            {children}
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Suspense>
  );
}
