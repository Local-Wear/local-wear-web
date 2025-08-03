/**
 * @deprecated Use container.config.ts instead
 * This file is kept for backward compatibility
 */
import { container, initializeContainer } from './container.config';

// Initialize container for backward compatibility
initializeContainer();

export { container };
export { initializeContainer };
