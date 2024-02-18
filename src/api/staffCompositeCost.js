import request from '@/utils/request'

export function importStaffCompositeCost (parameter) {
    return request({
        url : '/staffCompositeCost/importStaffCompositeCost',
        method :'post',
        headers : {
            'Content-Type': 'multipart/form-data',
        },
        data : parameter
    })
}

export function queryImportRecord (parameter) {
    return request({
        url: '/staffCompositeCost/queryImportRecord',
        method: 'get',
        params: parameter
    })
}
