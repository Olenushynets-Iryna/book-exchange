import FormCard from '../../../../../components/FormCard/FormCard';
import styles from './NotificationsTab.module.css';

const options = [
  { id: 'order', text: 'Get notified about a new order', checked: true },
  {
    id: 'fundraiser',
    text: 'Get notified about a new fundraiser',
    checked: false,
  },
];

function NotificationsTab() {
  return (
    <FormCard title="Notification">
      {options.map((option) => (
        <label key={option.id} className={styles.row}>
          <span>{option.text}</span>
          <input
            className={styles.toggle}
            type="checkbox"
            defaultChecked={option.checked}
          />
        </label>
      ))}
    </FormCard>
  );
}

export default NotificationsTab;
