import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';

export default NotificationsScreen = (props) => {
    const [visible, setVisible] = React.useState(false);
    const [name, onNameChange] = React.useState(null);
    const [desc, onDescChange] = React.useState(null);
    const countries = ["Egypt", "Canada", "Australia", "Ireland"];
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white' };

    return (
        <Provider>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <View style={{ width: '100%', height: 600 }}>
                        <TextInput
                            style={styles.input}
                            onChangeText={onNameChange}
                            placeholder="Name*"
                            value={name}
                        />
                        <TextInput
                            multiline={true}
                            numberOfLines={4}
                            style={styles.descInput}
                            onChangeText={onDescChange}
                            placeholder="Descriptions*"
                            value={desc}
                        />
                        <View style={{marginHorizontal:12}}>
                            <SelectDropdown
                            buttonStyle={{ width: '100%', marginLeft: 12, padding: 10 }}
                            data={countries}
                            placeholder={'Select'}
                            lab
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem, index)
                            }}
                        />
                        </View></View>
                </Modal>
            </Portal>
            <Button style={{ marginTop: 30 }} onPress={showModal}>
                Show
            </Button>
        </Provider>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        padding: 10,
    },
    descInput: {
        height: 100,
        margin: 12,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        padding: 5,
        textAlignVertical: 'top'
    }
})