import request from '@/utils/request';

const moduleUrl = '/registration';

const registration = {
    // 获取用户有权限访问的挂号体列表
    getRegistrationList() {
        return request.get(`${moduleUrl}/list`);
    },
    // 获取单个挂号体
    getRegistrationDetail(registrationId) {
        return request.get(`${moduleUrl}/detail`, { registrationId });
    },
    createRegistration(data) {
        return request.post(`${moduleUrl}/create`, data);
    },
    deleteRegistration(registrationId) {
        return request.delete(`${moduleUrl}/delete`, { registrationId });
    }
};

export default registration;
