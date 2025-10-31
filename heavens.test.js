/* eslint-env jest */
const utils = require('./src/utils');
const satellite = require('./src/satellite');
const iridium = require('./src/iridium');

describe('Basic CI pipeline tests', () => {
  test('utils.getTimestamp returns expected seconds for hh:mm:ss', () => {
    expect(utils.getTimestamp('01:02:03')).toBe(3723); // 1 hr, 2 min, 3 sec = 3600 + 120 + 3
  });

  test('utils.md5 returns correct md5 length', () => {
    const res = utils.md5('test');
    expect(res).toHaveLength(32); // MD5 hashes are 32 hex chars
  });

  test('satellite exports getTable function', () => {
    expect(typeof satellite.getTable).toBe('function');
  });

  test('iridium exports getTable function', () => {
    expect(typeof iridium.getTable).toBe('function');
  });
});
