import { View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';

export default function lessons({}) {
    return (
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center', }}>
            <Text>Placeholder for lessons page</Text>
        </View>
    );
  }