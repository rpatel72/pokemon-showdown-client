import * as React from 'react';
import { Text, View } from 'react-native';


export default function BattleScreen() {
    return (
      <View style={styles.container}>
        <Text>Battle!</Text>
      </View>
    );
}

const styles = {
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }
  };