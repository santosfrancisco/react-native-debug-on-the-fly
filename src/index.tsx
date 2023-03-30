import React, { createContext, useContext, useMemo, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LogsWindow } from './LogsWindow';
import type { IDOTFContext, Log } from './types';

const DOTFContext = createContext<IDOTFContext>({
  logs: [],
  pushLog: () => {},
  toggle: () => {},
  clear: () => {},
});

const to2Digits = (value: number) => (value <= 9 ? '0' + value : value);

export const DOTFProvider: React.FC = ({ children }) => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const pushLog = (log: string) => {
    const now = new Date();
    const hour = now.getHours();
    const min = now.getMinutes();
    const sec = now.getSeconds();
    const logTime = `${to2Digits(hour)}:${to2Digits(min)}:${to2Digits(sec)}`;
    const logObj = {
      time: logTime,
      content: log,
    };
    setLogs((prevLogs) => [logObj, ...prevLogs]);
  };

  const toggle = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const clear = () => {
    setLogs([]);
  };

  const memoizedValue = useMemo(
    () => ({ logs, pushLog, toggle, clear }),
    [logs]
  );
  return (
    <DOTFContext.Provider value={memoizedValue}>
      {children}
      {isExpanded ? null : (
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setIsExpanded(true)}
        >
          <Image
            source={require('./assets/log.png')}
            style={styles.iconImage}
          />
        </TouchableOpacity>
      )}
      {isExpanded && <LogsWindow logs={logs} toggle={toggle} clear={clear} />}
    </DOTFContext.Provider>
  );
};

const styles = StyleSheet.create({
  iconButton: { position: 'absolute', right: 24, bottom: 24 },
  iconImage: { width: 32, height: 32 },
});

export const useDOTF = () => useContext(DOTFContext);
