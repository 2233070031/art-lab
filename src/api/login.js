import request from './request'

export const login = (data) => {
  return request({
    url: 'https://lianghj.top:8888/api/private/v1/login',
    method: 'POST',
    data
  })
}
