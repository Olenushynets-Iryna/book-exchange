import i18n from '../i18n';
export const API_URL = 'http://localhost:3001';

export function serverError(status) {
  return new Error(i18n.t('errors.server', { status }));
}
