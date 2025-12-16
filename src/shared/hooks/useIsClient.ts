import { useEffect, useState } from "react";

/**
 * Повертає true, коли компонент відрендерився на клієнті.
 * Зручно, щоб уникати блимання SSR → CSR.
 */
export const useIsClient = (): boolean => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};
