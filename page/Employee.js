import React, { useEffect } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import MyImageButton from '../components/MyImageButton';
import { DatabaseConnection } from '../database/Database';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const db = DatabaseConnection.getConnection();

const Employee = ({ navigation }) => {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_employees'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_employees', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_employees(employees_id INTEGER PRIMARY KEY AUTOINCREMENT, employees_name VARCHAR(20), employees_contact INT(10), employees_address VARCHAR(255), employees_position VARCHAR(255), employees_salary INT(10))',
              []
            );
          }
        }
      );
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>

            <MyImageButton
              title="Register Employee"
              btnColor='#2992C4'
              btnIcon="user"
              customClick={() => navigation.navigate('Register')}
            />
            <MyImageButton
              title="View Employee"
              btnColor='#2992C4'
              btnIcon="view"
              customClick={() => navigation.navigate('View')}
            />
     <View style={styles.add}>
     <Ionicons name="add" size={40} color="blue"  
         onPress={() => navigation.navigate('Register')}
        />
    </View>
            
          </View>
        </View>


      </View>
    </SafeAreaView>
  );
};
const styles=StyleSheet.create({
  add:{
    flex:1,
    marginLeft:300,
    
  }

})

export default Employee;
