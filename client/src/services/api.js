import i18n from '../i18n';

export const API_URL = import.meta.env.VITE_API_URL;

export function fileUrl(path) {
  return path ? `${API_URL}${path}` : null;
}

export function serverError(status) {
  return new Error(i18n.t('errors.server', { status }));
}
