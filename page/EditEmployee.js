import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';

import Mytext from '../components/Mytext';
import Mytextinput from '../components/Mytextinput';
import Mybutton from '../components/Mybutton';
import { DatabaseConnection } from '../database/Database';

const db = DatabaseConnection.getConnection();

const EditEmployee = ({ navigation }) => {
  let [inputEmployeesId, setInputEmployeesId] = useState('');
  let [employeesName, setEmployeesName] = useState('');
  let [employeesContact, setEmployeesContact] = useState('');
  let [employeesAddress, setEmployeesAddress] = useState('');
  let [employeesPosition, setEmployeesPosition] = useState('');
  let [employeesSalary, setEmployeesSalary] = useState('');

  let updateAllStates = (name, contact, address, position, salary) => {
    setEmployeesName(name);
    setEmployeesContact(contact);
    setEmployeesAddress(address);
    setEmployeesPosition(position);
    setEmployeesSalary(salary);
  };

  let searchEmployees = () => {
    console.log(inputEmployeesId);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_employees where employees_id = ?',
        [inputEmployeesId],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            updateAllStates(
              res.employees_name,
              res.employees_contact,
              res.employees_address,
              res.employees_position,
              res.employees_salary
            );
          } else {
            alert('Employee not found!');
            updateAllStates('', '', '', '', '');
          }
        }
      );
    });
  };
  let updateEmployees = () => {
    console.log(inputEmployeesId, employeesName, employeesContact, employeesAddress, employeesPosition, employeesSalary);

    if (!inputEmployeesId) {
      alert('Please enter the Employeeid!');
      return;
    }
    if (!employeesName) {
      alert('Please enter your Name!');
      return;
    }
    if (!employeesContact) {
      alert('Please enter your Telephone !');
      return;
    }
    if (!employeesAddress) {
      alert('Please insert your Address !');
      return;
    }
    if (!employeesPosition) {
      alert('Please insert your Position !');
      return;
    }
    if (!employeesSalary) {
      alert('Please insert your Salary !');
      return;
    }
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE table_employees set employees_name=?, employees_contact=? , employees_address=?, employees_position=?, employees_salary=? where employees_id=?',
        [employeesName, employeesContact, employeesAddress, employeesPosition, employeesSalary, inputEmployeesId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Employee successfully updated !!',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Employee'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Error updating employee');
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
              <Mytext text="Employee Filter" />
              <Mytextinput
                placeholder="Enter Employeeid"
                style={{ padding: 10 }}
                onChangeText={
                  (inputEmployeesId) => setInputEmployeesId(inputEmployeesId)
                }
              />
              <Mybutton
                title="SearchEmployee"
                customClick={searchEmployees}
              />
              <Mytextinput
                placeholder="Enter Name"
                value={employeesName}
                style={{ padding: 10 }}
                onChangeText={
                  (employeesName) => setEmployeesName(employeesName)
                }
              />
              <Mytextinput
                placeholder="Enter Telephone"
                value={'' + employeesContact}
                onChangeText={
                  (employeesContact) => setEmployeesContact(employeesContact)
                }
                maxLength={10}
                style={{ padding: 10 }}
                keyboardType="numeric"
              />
              <Mytextinput
                value={employeesAddress}
                placeholder="Enter Address"
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
              <Mybutton
                title="Update Employee"
                customClick={updateEmployees}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditEmployee;