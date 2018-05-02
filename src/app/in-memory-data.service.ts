import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const voters = [
      {
        id: '1',
        openId: 'oid1',
        name: 'Leo',
        phone: '15666666666',
        ranking: '1',
        numbers: '20',
        isVoteValid: true,
        photos: [
          'http://t.cn/RuWRYzv?1=1',
          'https://unsplash.it/300/300/?random',
        ],
        hasPassEnroll: true,
      },
      {
        id: '2',
        openId: 'oid2',
        name: 'Leo2',
        phone: '15666666666',
        ranking: '2',
        numbers: '10',
        isVoteValid: false,
        photos: [
          'http://dl.bizhi.sogou.com/images/2012/02/11/25025.jpg?1=1',
        ],
        hasPassEnroll: true,
      },
      {
        id: '3',
        openId: 'oid3',
        name: 'Cynric',
        phone: '15666666666',
        ranking: '3',
        numbers: '8',
        isVoteValid: false,
        photos: [
          'https://unsplash.it/300/300/?random',
        ],
        hasPassEnroll: true,
      }
    ];

    const activity = {
      totalEnroll: '10',
      totalVoteNumbers: '100',
      beginTime: '2018-01-01 00:00',
      endTime: '2018-02-01 00:00',
      limitNumberPerDay: '2'
    };

    return {
      voters,
      activity,
    };
  }
}
