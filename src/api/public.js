import request_freeauth from '@/utils/request_freeauth';
import request from '@/utils/request';

const moduleUrl = '/public';

const publicApi = {
    // 挂号人列表
    getqueueList(registrationId) {
        return request_freeauth.get(`${moduleUrl}/list`, { registrationId });
    },
    createqueue(isHad, name, number, registrationId, isOver, isBegin) {
        return request.post(`${moduleUrl}/create`, { isHad, name, number, registrationId, isOver, isBegin });
    },
    // 获取单个挂号体
    getRegistrationDetail(registrationId) {
        return request_freeauth.get(`${moduleUrl}/detail`, { registrationId });
    }
};

export default publicApi;
