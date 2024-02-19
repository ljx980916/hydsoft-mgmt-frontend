export const ACCESS_TOKEN = 'MGMT_token'
// export let isTest = location.hostname.startsWith('test') || location.hostname.startsWith('localhost')
export let isTest = (location.host == '10.3.3.160:9006')
// export const LOGIN_PATH = isTest?'https://10.3.3.160:9006/api/login':'https://mgmt.hydsoft.net:9005/api/login'
export const LOGIN_PATH = 'http://10.3.3.160:9006/api/login'
// export const LOGIN_TOKEN = isTest?'test_mgmtTokenKey':'production_mgmtTokenKey'
export const LOGIN_TOKEN = 'test_mgmtTokenKey'
