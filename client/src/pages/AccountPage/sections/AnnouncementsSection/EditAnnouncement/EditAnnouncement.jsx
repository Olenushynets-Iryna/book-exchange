import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import AnnouncementForm from '../AnnouncementForm/AnnouncementForm';
import useBook from '../../../../../hooks/useBook';
import useAuth from '../../../../../hooks/useAuth';

function EditAnnouncement() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { user } = useAuth();
  const { book, isLoading, error } = useBook(id);

  if (isLoading) {
    return <p>{t('common.loading')}</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (book.userId !== user.id) {
    return <p>{t('account.form.notYours')}</p>;
  }

  return <AnnouncementForm book={book} />;
}

export default EditAnnouncement;
