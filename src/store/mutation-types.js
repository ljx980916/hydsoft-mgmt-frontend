export const ACCESS_TOKEN = 'OMS_token'
export let isTest = location.hostname.startsWith('test') || location.hostname.startsWith('localhost')
export const LOGIN_PATH = isTest?'https://test.oms.hydsoft.net:9003/api/login':'https://oms.hydsoft.net:9003/api/login'
export const LOGIN_TOKEN = isTest?'test_omsTokenKey':'production_omsTokenKey'
