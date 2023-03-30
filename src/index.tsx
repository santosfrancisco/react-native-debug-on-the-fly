import React, {
  createContext,
  Fragment,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LogsWindow } from './LogsWindow';
import type { Log } from './types';

interface IDOTFContext {
  logs: Log[];
  pushLog: (log: string) => void;
  clear: () => void;
}

const DOTFContext = createContext<IDOTFContext>({
  logs: [],
  pushLog: () => {},
  clear: () => {},
});

type DOTFProviderProps = {
  children: React.ReactNode;
  enabled: boolean;
};

const to2Digits = (value: number) => (value <= 9 ? '0' + value : value);

export const DOTFProvider = ({ children, enabled }: DOTFProviderProps) => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const pushLog = useCallback(
    (log: string) => {
      if (!enabled) return;
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
    },
    [enabled]
  );

  const toggle = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const clear = () => {
    setLogs([]);
  };

  const memoizedValue = useMemo(
    () => ({ logs, pushLog, clear }),
    [logs, pushLog]
  );
  return (
    <DOTFContext.Provider value={memoizedValue}>
      {children}
      {enabled ? (
        <Fragment>
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
          {isExpanded && (
            <LogsWindow logs={logs} toggle={toggle} clear={clear} />
          )}
        </Fragment>
      ) : null}
    </DOTFContext.Provider>
  );
};

const styles = StyleSheet.create({
  iconButton: { position: 'absolute', right: 24, bottom: 24 },
  iconImage: { width: 32, height: 32 },
});

export const useDOTF = () => useContext(DOTFContext);
