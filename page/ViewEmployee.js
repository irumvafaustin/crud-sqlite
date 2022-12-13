import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView, StyleSheet, Alert } from 'react-native';
import { DatabaseConnection } from '../database/Database';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const db = DatabaseConnection.getConnection();

const ViewEmployee = ({navigation}) => {
  let [flatListItems, setFlatListItems] = useState([]);
 let comfirmDelete =(id)=>{
  Alert.alert(
    'Success',
    'Employee Successfully Deleted !',
    [
      {
        text: 'Yes',
        onPress: () => deleteEmployees(id),
      },{
        text: 'No',
        onPress: () => navigation.navigate('Employee'),
      },
    ],
    { cancelable: false }
  );
 }
  let deleteEmployees = (employees_id) => {
    
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM  table_employees where employees_id=?',
        [employees_id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Employee Successfully Deleted !',
              [
                {
                  text: 'Yes',
                  onPress: () => navigation.navigate('Employee'),
                },
              ],
              { cancelable: false }
            );
          } 
        }
      );
    });
  };
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_employees',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems(temp);
        }
      );
    });
  });

  let listItemView = (item) => {
    return (

          
        
              <View 
                key={item.employees_id}
                style={{ backgroundColor: '#EEE', marginTop: 10, padding: 20, borderRadius: 5 }}>
           
                   <Text style={styles.textheader}>Employeeid :</Text>
                   <Text style={styles.textbottom}>{item.employees_id}</Text>
           
                   <Text style={styles.textheader}>Name :</Text>
                   <Text style={styles.textbottom}>{item.employees_name}</Text>
           
                   <Text style={styles.textheader}>Contact :</Text>
                   <Text style={styles.textbottom}>{item.employees_contact}</Text>
           
                   <Text style={styles.textheader}>Address :</Text>
                   <Text style={styles.textbottom}>{item.employees_address}</Text>
                   <Text style={styles.textheader}>Position :</Text>
                   <Text style={styles.textbottom}>{item.employees_position}</Text>
           
                  <Text style={styles.textheader}>Salary :</Text>
                    <Text style={styles.textbottom}>{item.employees_salary}</Text>
                <View style={styles.line}/>
              
                <View >
                <AntDesign name="edit" size={24} color="#27A8A9" style={styles.iconedit}
                onPress={() => navigation.navigate('Update',{employees_id:item.employees_id,employeesName:item.employeesName,employeesContact:item.employeesContact,employeesAddress:item.employeesAddress, employeesPosition:item.employeesPosition, employeesSalary:item.employeesSalary})}  />
                <MaterialCommunityIcons name="delete-alert" size={28} color="#5C200B" style={styles.icondelete}
                onPress={()=>comfirmDelete(item.employees_id)}  />
             
           

          </View>
          
          </View>
          
          

    
  )};

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text style={{height:40, fontSize:25, marginLeft:50}} onPress={() => navigation.navigate('Register')}>Add</Text>
          <Ionicons name="add" size={40} color="blue" style={styles.iconsadd}  
         onPress={() => navigation.navigate('Register')}
        />
          </View>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
      
        <View style={{ flex: 1 }}>
          <FlatList
            style={{ marginTop: 30 }}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            data={flatListItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textheader: {
    color: '#111',
    fontSize: 20,
    fontWeight: '700',
  },
  textbottom: {
    color: '#111',
    fontSize: 20,
    marginLeft:120,
    marginTop:-27,
  }, 
  iconsadd:{
    marginTop:-45,
    marginLeft:10
  },
  iconedit:{
    flexDirection:'row',
    position:'absolute',
    right:2,
    marginRight:40,
    marginTop:-180
    
  },
  icondelete:{
    flexDirection:'row',
    position:'absolute',
    right:2,
    marginRight:1,
    marginTop:-180
    
    
  },
});

export default ViewEmployee;