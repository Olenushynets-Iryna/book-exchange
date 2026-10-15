import FormCard from '../../../../../components/FormCard/FormCard';
import Input from '../../../../../components/Input/Input';
import Button from '../../../../../components/Button/Button';

function SecurityTab() {
  return (
    <FormCard title="Change password">
      <Input type="password" placeholder="Current password" />
      <Input type="password" placeholder="New password" />
      <Input type="password" placeholder="Confirm password" />
      <Button>Save</Button>
    </FormCard>
  );
}

export default SecurityTab;
