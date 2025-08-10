import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withLayout(Layout: React.ComponentType<any>) {
  return function <P extends object>(Component: React.ComponentType<P>) {
    return function WrappedComponent(props: P) {
      return (
        <Layout>
          <Component {...props} />
        </Layout>
      );
    };
  };
}
