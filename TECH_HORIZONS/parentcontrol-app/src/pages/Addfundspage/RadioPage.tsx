import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonIcon,
  IonToast,
} from '@ionic/react';
import { add } from 'ionicons/icons';

const AddAccountsPage: React.FC = () => {
  const [monitoredAccounts, setMonitoredAccounts] = useState([
    { id: 1, accountType: 'Instagram', accountName: 'example_instagram' },
    // Add more accounts as needed
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [accountType, setAccountType] = useState('');
  const [accountName, setAccountName] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const handleAddAccount = () => {
    setShowAddForm(true);
  };

  const handleConfirmAddAccount = () => {
    // Simple validation, you can add more complex validation as needed
    if (!accountType || !accountName) {
      setShowErrorToast(true);
      return;
    }

    const newAccount = {
      id: monitoredAccounts.length + 1,
      accountType,
      accountName,
    };
    setMonitoredAccounts([...monitoredAccounts, newAccount]);
    setShowAddForm(false);
    setShowSuccessToast(true);

    // Reset form fields
    setAccountType('');
    setAccountName('');
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Monitored Accounts</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {/* List of monitored accounts */}
          {monitoredAccounts.map((account) => (
            <IonItem key={account.id}>
              <IonLabel style={{ fontSize: '16.5px', fontWeight: 'bold', color: '#262626' }}>
                Account Type: {account.accountType}
              </IonLabel>
              <IonLabel style={{ fontSize: '15px', fontWeight: 'bold', color: '#262626' }}>
                Account Name: {account.accountName}
              </IonLabel>
            </IonItem>
          ))}
        </IonList>

        {/* Add Account Form */}
        {showAddForm && (
          <IonList>
            <IonItem>
              <IonLabel position="stacked">ACCOUNT TYPE</IonLabel>
              <IonInput
                placeholder="Enter account type"
                value={accountType}
                onIonChange={(e) => setAccountType(e.detail.value!)}
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">ACCOUNT NAME</IonLabel>
              <IonInput
                placeholder="Enter account name"
                value={accountName}
                onIonChange={(e) => setAccountName(e.detail.value!)}
              />
            </IonItem>

            <IonButton onClick={handleConfirmAddAccount}>Confirm Add Account</IonButton>
          </IonList>
        )}

        {/* Add Account button at the bottom */}
        <IonButton shape="round" onClick={handleAddAccount} expand="full">
          <IonIcon icon={add} />
          Add Monitored Account
        </IonButton>

        {/* Toasts for feedback messages */}
        <IonToast
          isOpen={showSuccessToast}
          onDidDismiss={() => setShowSuccessToast(false)}
          message="Account added successfully!"
          duration={2000}
          color="success"
        />
        <IonToast
          isOpen={showErrorToast}
          onDidDismiss={() => setShowErrorToast(false)}
          message="Please fill in all fields with valid data."
          duration={2000}
          color="danger"
        />
      </IonContent>
    </>
  );
};

export default AddAccountsPage;
