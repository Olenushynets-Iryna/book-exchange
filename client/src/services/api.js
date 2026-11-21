import i18n from '../i18n';
export const API_URL = import.meta.env.VITE_API_URL;

export function serverError(status) {
  return new Error(i18n.t('errors.server', { status }));
}
