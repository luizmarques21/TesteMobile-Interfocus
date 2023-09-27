import React from 'react';
import {View, StatusBar} from 'react-native';
import styles from './styles';

const StatusBarColor = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, {backgroundColor}]}>
    <StatusBar backgroundColor={backgroundColor} {...props} />
  </View>
);
export default StatusBarColor;
