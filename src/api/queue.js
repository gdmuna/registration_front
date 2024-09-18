import request from '@/utils/request';

const moduleUrl = '/queue';

const queue = {
    // 挂号人列表
    getqueueList(registrationId) {
        return request.get(`${moduleUrl}/list`, { registrationId });
    },
    // 获取单个挂号人
    getqueueDetail(number) {
        return request.get(`${moduleUrl}/detail`, { number });
    },
    createqueue(isHad, name, number, registrationId, isOver, isBegin) {
        return request.post(`${moduleUrl}/create`, { isHad, name, number, registrationId, isOver, isBegin });
    },
    deletequeue(number, registrationId) {
        return request.delete(`${moduleUrl}/delete`, { number, registrationId });
    }
};

export default queue;
