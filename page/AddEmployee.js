import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
} from 'react-native';
import Mytextinput from '../components/Mytextinput';
import Mybutton from '../components/Mybutton';
import { DatabaseConnection } from '../database/Database';

const db = DatabaseConnection.getConnection();

const AddEmployee = ({ navigation }) => {
  let [employeesName, setEmployeesName] = useState('');
  let [employeesContact, setEmployeesContact] = useState('');
  let [employeesAddress, setEmployeesAddress] = useState('');
  let [employeesPosition, setEmployeesPosition] = useState('');
  let [employeesSalary, setEmployeesSalary] = useState('');
  let register_employees = () => {
    console.log(employeesName, employeesContact, employeesAddress, employeesPosition, employeesSalary);

    if (!employeesName) {
      alert('Fill in the employeename');
      return;
    }
    if (!employeesContact) {
      alert('Fill in the contact');
      return;
    }
    if (!employeesAddress) {
      alert('Fill in the address !');
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_employees (employees_name, employees_contact, employees_address, employees_position, employees_salary) VALUES (?,?,?,?,?)',
        [employeesName, employeesContact, employeesAddress, employeesPosition, employeesSalary],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Employee regislation successed !!!',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Employee'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Error trying to register Employee!');
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
              <Mytextinput
                placeholder="Enter a Name"
                onChangeText={
                  (employeesName) => setEmployeesName(employeesName)
                }
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Enter the Telephone"
                onChangeText={
                  (employeesContact) => setEmployeesContact(employeesContact)
                }
                maxLength={10}
                keyboardType="numeric"
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Enter the Address"
                onChangeText={
                  (employeesAddress) => setEmployeesAddress(employeesAddress)
                }
                maxLength={225}
                numberOfLines={3}
                multiline={true}
                style={{ textAlignVertical: 'center' }}
              />
              <Mytextinput
                placeholder="Enter the Position"
                onChangeText={
                  (employeesPosition) => setEmployeesPosition(employeesPosition)
                }
                numberOfLines={3}
                multiline={true}
                style={{ textAlignVertical: 'center' }}
              />
              <Mytextinput
                placeholder="Enter the Salary"
                onChangeText={
                  (employeesSalary) => setEmployeesSalary(employeesSalary)
                }
                maxLength={10}
                keyboardType="numeric"
                style={{ padding: 10 }}
              />
              <Mybutton title="save" customClick={register_employees} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddEmployee;