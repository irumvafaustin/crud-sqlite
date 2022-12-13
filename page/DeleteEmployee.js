import React, { useState } from 'react';
import { View, Alert, SafeAreaView } from 'react-native';
import Mytextinput from '../components/Mytextinput';
import Mybutton from '../components/Mybutton';
import { DatabaseConnection } from '../database/Database';

const db = DatabaseConnection.getConnection();

const DeleteEmployee = ({ navigation }) => {
  let [inputEmployeesId, setInputEmployeesId] = useState('');

  let deleteEmployees = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM  table_employees where employees_id=?',
        [inputEmployeesId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Employee Successfully Deleted !',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Employee'),
                },
              ],
              { cancelable: false }
            );
          } else {
            alert('Please enter a valid Employee id!');
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Mytextinput
            placeholder="Enter Employeeid"
            onChangeText={
              (inputEmployeeId) => setInputEmployeesId(inputEmployeesId)
            }
            style={{ padding: 10 }}
          />
          <Mybutton title="Delete Employee" customClick={deleteEmployees} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeleteEmployee;
