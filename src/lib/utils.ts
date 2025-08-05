import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Valida se uma URL é segura para abrir
 * @param url - URL a ser validada
 * @returns true se a URL é segura
 */
export function isValidExternalUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);

    // Verifica se é HTTP ou HTTPS
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return false;
    }

    // Lista de domínios permitidos (opcional)
    const allowedDomains = [
      'eventosbr.com',
      'exemplo.com',
      // Adicione outros domínios confiáveis aqui
    ];

    // Se houver lista de domínios permitidos, verificar
    if (allowedDomains.length > 0) {
      return allowedDomains.some(domain =>
        urlObj.hostname === domain || urlObj.hostname.endsWith(`.${domain}`)
      );
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Abre uma URL externa de forma segura
 * @param url - URL a ser aberta
 * @param fallback - Função a ser executada se a URL não for válida
 */
export function openExternalUrl(url: string, fallback?: () => void): void {
  if (isValidExternalUrl(url)) {
    window.open(url, '_blank', 'noopener,noreferrer');
  } else {
    console.warn('URL não é segura:', url);
    fallback?.();
  }
}
