import React from 'react';
import {
  FlatList,
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import type { Log } from './types';

type LogsWindowProps = {
  logs: Log[];
  toggle: () => void;
  clear: () => void;
};

const Separator = () => <View style={styles.separator} />;

export const LogsWindow = ({ logs, toggle, clear }: LogsWindowProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={clear}>
          <Image source={require('./assets/trash.png')} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.title}>Logs</Text>
        <TouchableOpacity onPress={toggle}>
          <Image source={require('./assets/close.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
      {logs.length > 0 ? (
        <FlatList
          inverted
          data={logs}
          ItemSeparatorComponent={Separator}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.logTime}>{item.time}</Text>
              <Text style={styles.log}>{item.content}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyLogText}>nothing to show yet</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 24,
    backgroundColor: '#312e38',
    position: 'absolute',
    bottom: 0,
    height: '50%',
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 22,
    color: '#fff',
  },
  icon: {
    width: 24,
    height: 24,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomColor: '#fff',
    borderBottomWidth: 2,
    paddingBottom: 16,
    marginBottom: 8,
  },
  logTime: { color: '#2de308', fontWeight: '600' },
  log: { color: '#dadada' },
  separator: {
    borderBottomColor: '#2de308',
    borderBottomWidth: 1,
    marginVertical: 8,
    borderStyle: 'dotted',
  },
  emptyLogText: { color: '#fff', textAlign: 'center' },
});
