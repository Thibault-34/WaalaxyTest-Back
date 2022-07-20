import request from 'supertest';

import dbo from '../../services/database.service';
import Server from '../../services/server.service';
import { ActionCredit, User, ActionDetail } from '../../models';
import actionCreditRouter from './index';

import { ActionCreditGenerator, ActionDetailGenerator } from '../../../test/utils/generate';

describe('Route /action-credit', () => {
  beforeAll(async () => {
    await dbo.connect();

    Server.init({ withRoutes: false })
      .configure(express => {
        express?.use(actionCreditRouter);
      })
      .run();
  });
  afterAll(async () => {
    await dbo.disconnect();
    Server.instance?.close();
  });

  afterEach(async () => {
    await ActionCredit.deleteMany({});
  });

  describe('GET /:user_id', () => {
    it(`should return an empty array`, async () => {
      const userIdMock = new User()._id.toString();
      const response = await request(Server.instance).get(`/${userIdMock}`);
      expect(response.body).toEqual([]);
    });

    it('should return an action credit list', async () => {
      const actionDetailData = new ActionDetailGenerator().generateOne();
      const actionCreditData = new ActionCreditGenerator().generateOne({
        action_detail: actionDetailData._id,
      });
      await new ActionDetail(actionDetailData).save();
      await new ActionCredit(actionCreditData).save();
      const response = await request(Server.instance).get(`/${actionCreditData.user}`);
      expect(response.body.length).toEqual(1);
      expect(response.body[0]).toEqual({ ...actionCreditData, action_detail: actionDetailData });
    });

    it('should return an action credit list filtered with given user_id', async () => {
      const actionCreditDatas = new ActionCreditGenerator().generateMany(2);
      const actionDetailDatas = actionCreditDatas.map(actionCreditData => {
        return new ActionDetailGenerator().generateOne({ _id: actionCreditData.action_detail });
      });
      await ActionDetail.insertMany(actionDetailDatas);
      await ActionCredit.insertMany(actionCreditDatas);
      const response = await request(Server.instance).get(`/${actionCreditDatas[1].user}`);
      expect((await ActionCredit.find()).length).toEqual(2);
      expect(response.body.length).toEqual(1);
      expect(response.body[0]).toEqual({
        ...actionCreditDatas[1],
        action_detail: actionDetailDatas[1],
      });
    });

    it('should return a 404 error', async () => {
      const response = await request(Server.instance).get(`/fakeId`);
      expect(response.body.message).toEqual('Not found');
    });
  });
});
