import { useTranslation } from 'react-i18next';
import FormCard from '../../../../../components/FormCard/FormCard';
import Input from '../../../../../components/Input/Input';
import Button from '../../../../../components/Button/Button';

function SecurityTab() {
  const { t } = useTranslation();

  return (
    <FormCard title={t('account.security.title')}>
      <Input type="password" placeholder={t('account.security.current')} />
      <Input type="password" placeholder={t('account.security.new')} />
      <Input type="password" placeholder={t('account.security.confirm')} />
      <Button>{t('account.security.save')}</Button>
    </FormCard>
  );
}

export default SecurityTab;
