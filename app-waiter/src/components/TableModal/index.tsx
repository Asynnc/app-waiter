import { useState } from 'react';
import { Modal, Platform, TouchableOpacity } from 'react-native';
import { Button } from '../Button';
import { Close } from '../Icons/Close';
import { Text } from '../Text';
import { Form, Header, Input, ModalBody, Overlay } from './styles';

interface TableModal {
  isVisible: boolean;
  onClose: () => void;
  onSave: (table: string) => void;
}

export function TableModal({ isVisible, onClose, onSave }: TableModal) {

  const [table, setTable] = useState('');

  function handleSave() {
    onSave(table);
    onClose();
  }

  return (
    <Modal
      animationType='fade'
      visible={isVisible}
      transparent
    >
      <Overlay behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
        <ModalBody>
          <Header>
            <Text weight='SemiBold'> Informe a mesa </Text>
            <TouchableOpacity onPress={onClose}>
              <Close color='#666' />
            </TouchableOpacity>
          </Header>
          <Form>
            <Input
              placeholder='Número da mesa'
              placeholderTextColor={'#666'}
              keyboardType='number-pad'
              onChangeText={setTable}
            />

            <Button
              onPress={handleSave}
              isDisabled={table.length === 0}
            >SALVAR</Button>
          </Form>

        </ModalBody>
      </Overlay>
    </Modal>
  );
}
