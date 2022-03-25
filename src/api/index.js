import request from '../utils/request';

const baseURL = process.env.VUE_APP_BACKEND_URL;
const apiVersion = `/api/v1`;
export const apiBase = `${baseURL}`; // ${apiVersion}


export function get_workers(query) {
    return request({
        url: `${apiBase}/workers`,
        method: 'GET',
        params: query
    })
};

export function get_queued_jobs(query) {
    return request({
        url: `${apiBase}/job/queued_jobs`,
        method: 'GET',
        params: query
    })
}



export function get_results(query) {
    return request({
        url: `${apiBase}/job/results`,
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

