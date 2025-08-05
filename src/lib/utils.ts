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

    // Verifica se o hostname não está vazio
    if (!urlObj.hostname) {
      return false;
    }

    // Verifica se não é um IP local ou privado (opcional, para maior segurança)
    const privateIPs = [
      /^127\./, // localhost
      /^10\./, // 10.0.0.0/8
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./, // 172.16.0.0/12
      /^192\.168\./, // 192.168.0.0/16
      /^169\.254\./, // link-local
      /^::1$/, // IPv6 localhost
      /^fc00:/, // IPv6 unique local
      /^fe80:/, // IPv6 link-local
    ];

    const isPrivateIP = privateIPs.some(pattern => pattern.test(urlObj.hostname));
    if (isPrivateIP) {
      return false;
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
