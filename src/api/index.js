import request from '../utils/request';

const baseURL = process.env.VUE_APP_BACKEND_URL;
const apiVersion = `/api/v1`;
export const apiBase = `${baseURL}`; // ${apiVersion}


// export const login = data => {
//     return request({
//         url: `${baseURL}/index`,
//         method: 'GET',
//         data: data
//     })
// };


export const get_workers = query => {
    return request({
        url: `${apiBase}/get_job_workers`,
        method: 'GET'
    })
};


export function get_results(query) {
    return request({
      url: `${apiBase}/job/all_job_results`,
      method: 'GET',
      params: query
    })
  }
  


export const xxx = data => {
    return request({
        url: `${apiBase}/project/delete`,
        method: 'DELETE',
        data: data
    })
};


export const xxxx = data => {
    return request({
        url: `${apiBase}/task/create`,
        method: 'POST',
        data: data
    })
};

