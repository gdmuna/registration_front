import request from '@/utils/request';

const moduleUrl = '/user';

const user = {
    // 查询某个用户的详细信息
    getUserInfo() {
        return request.get(`${moduleUrl}/userInfo`);
    }
};

export default user;
