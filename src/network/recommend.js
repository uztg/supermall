import { request } from './request'

export function recommendRequest(){
    return request({
        url:'recommend'
    })

}