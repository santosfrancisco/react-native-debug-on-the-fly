export type Log = {
  time: string;
  content: string;
};
export interface IDOTFContext {
  logs: Log[];
  pushLog: (log: string) => void;
  toggle: () => void;
  clear: () => void;
}
