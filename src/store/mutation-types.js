export const ACCESS_TOKEN = 'MGMT_token'
export let isTest = location.hostname.startsWith('test') || location.hostname.startsWith('localhost')
export const LOGIN_PATH = isTest?'https://10.3.3.160:9006/api/login':'https://mgmt.hydsoft.net:9005/api/login'
export const LOGIN_TOKEN = isTest?'test_mgmtTokenKey':'production_mgmtTokenKey'
