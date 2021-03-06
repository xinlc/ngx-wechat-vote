
// const API_ROOT = 'http://localhost:4200/corsapi'; // 开发跨域 查看对应proxy.conf.json文件 , target 为要访问的地址
const API_ROOT = '';
// const API_ROOT = 'https://xxx'; // 生产

const API_ROOT_DOMAIN = API_ROOT;

class Network {
  static API_ROOT = API_ROOT;

  // vote
  static VOTE_URL = 'api/voters';

  // OSS
  static STS_URL = `${API_ROOT_DOMAIN}/sts`;
  static ALI_OSS_STSTOKEN = `${API_ROOT_DOMAIN}/sts/$userid`;
  static ALI_OSS_ENDPOINT = 'https://oss-cn-qingdao.aliyuncs.com';
  static ALI_OSS_BUCKETNAME = 'your bucktname';
}


export default Network;
