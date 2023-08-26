/**
 * @module library
 */
/**
 * 元：Map(["2024-01-01", "00:00 AM"], ["2024-01-02", "00:00 AM"])
 * 変換後：["2024-01-01", "2024-01-02"]
 */
export const toKeyArray = <K, V>(map: Map<K, V>): K[] => {
  return Array.from(map.keys());
};
