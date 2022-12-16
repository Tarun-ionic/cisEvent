import React from 'react';
import { View, Text,TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker'
export default AddEventModal = (props) => {
    const [name, onNameChange] = React.useState(null);
    const [desc, onDescChange] = React.useState(null);
    const [pickerValue, setpickerValue] = React.useState('');
    const [date, setDate] = React.useState(new Date())
    const [open, setOpen] = React.useState(false)

    return (
        <View style={{ width: '100%', backgroundColor: '#fff', flex: 1, paddingTop: 20 }}>
            <Text style={styles.textLabel}>Title *</Text>
            <TextInput
                style={styles.input}
                onChangeText={onNameChange}
                placeholder="Name*"
                value={name}
            />
            <Text style={styles.textLabel}>Description *</Text>
            <TextInput
                multiline={true}
                numberOfLines={4}
                style={styles.descInput}
                onChangeText={onDescChange}
                placeholder="Descriptions*"
                value={desc}
            />
            <Text style={styles.textLabel}>Category *</Text>
            <View style={{ borderWidth: 1, marginHorizontal: 10, marginTop: 10, borderRadius: 5 }}>
                <Picker style={styles.pickerStyle}
                    selectedValue={pickerValue}
                    onValueChange={(itemValue, itemPosition) =>
                        console.log(itemValue)}
                >
                    <Picker.Item label="Select Category" value="" />
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                    <Picker.Item label="React Native" value="rn" />
                </Picker>
            </View>
            <TouchableOpacity onPress={()=>{setOpen(true)}}>
            <Text style={styles.textLabel}>Date *</Text></TouchableOpacity>
            <View style={{ borderWidth: 1, marginHorizontal: 10, marginTop: 10, borderRadius: 5 }}>
                <DatePicker
                    modal
                    open={open}
                    date={date}
                    onConfirm={(date) => {
                        setOpen(false)
                        setDate(date)
                    }}
                    onCancel={() => {
                        setOpen(false)
                    }}
                />
            </View>
        </View>

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
    pickerStyle: {
        width: "100%",
        color: '#344953',
        justifyContent: 'center',
    },
    descInput: {
        height: 100,
        margin: 12,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        padding: 5,
        textAlignVertical: 'top'
    },
    textLabel: {
        marginHorizontal: 10
    }
})