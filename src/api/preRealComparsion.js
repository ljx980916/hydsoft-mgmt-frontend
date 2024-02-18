import request from '@/utils/request'

export function getPretrialComparisonList (parameter) {
    return request({
        url: '/PrerenalComparison/getPretrialComparisonList',
        method: 'post',
        data: parameter
    })
}