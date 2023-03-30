import * as React from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';
import { DOTFProvider, useDOTF } from 'react-native-debug-on-the-fly';

const Content = () => {
  const { pushLog } = useDOTF();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My app</Text>
      <Button
        title="Send log 1"
        onPress={() =>
          pushLog(
            JSON.stringify(
              { foo: 'bar', bar: 'foo', obj: { foo: 'bar' } },
              null,
              2
            )
          )
        }
      />
      <Button
        title="Send log 2"
        onPress={() => pushLog(`log ${Math.floor(Math.random() * 100)}`)}
      />
    </View>
  );
};

export default function App() {
  return (
    <DOTFProvider enabled>
      <Content />
    </DOTFProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 48,
  },
});
