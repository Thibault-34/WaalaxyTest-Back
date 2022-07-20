import request from 'supertest';

import dbo from '../../services/database.service';
import Server from '../../services/server.service';
import { Action, ActionDetail, User } from '../../models';
import actionRouter from './index';

import { ActionDetailGenerator, ActionGenerator } from '../../../test/utils/generate';

describe('Route /actions', () => {
  beforeAll(async () => {
    await dbo.connect();

    Server.init({ withRoutes: false })
      .configure(express => {
        express?.use(actionRouter);
      })
      .run();
  });
  afterAll(async () => {
    await dbo.disconnect();
    Server.instance?.close();
  });

  afterEach(async () => {
    await Action.deleteMany({});
  });

  describe('GET /:user_id', () => {
    it(`should return an empty array`, async () => {
      const userIdMock = new User()._id.toString();
      const response = await request(Server.instance).get(`/${userIdMock}`);
      expect(response.body).toEqual([]);
    });

    it('should return an action list', async () => {
      const actionDetailData = new ActionDetailGenerator().generateOne();
      const actionData = new ActionGenerator().generateOne({ action_detail: actionDetailData._id });
      await new ActionDetail(actionDetailData).save();
      await new Action(actionData).save();
      const response = await request(Server.instance).get(`/${actionData.user}`);
      expect(response.body.length).toEqual(1);
      expect(response.body[0]).toEqual({ ...actionData, action_detail: actionDetailData });
    });

    it('should return an action list filtered with given user_id', async () => {
      const actionDatas = new ActionGenerator().generateMany(2);
      const actionDetailDatas = actionDatas.map(actionData => {
        return new ActionDetailGenerator().generateOne({ _id: actionData.action_detail });
      });
      await ActionDetail.insertMany(actionDetailDatas);
      await Action.insertMany(actionDatas);
      const response = await request(Server.instance).get(`/${actionDatas[1].user}`);
      expect((await Action.find()).length).toEqual(2);
      expect(response.body.length).toEqual(1);
      expect(response.body[0]).toEqual({ ...actionDatas[1], action_detail: actionDetailDatas[1] });
    });

    it('should return a 404 error', async () => {
      const response = await request(Server.instance).get(`/fakeId`);
      expect(response.body.message).toEqual('Not found');
    });
  });
});
