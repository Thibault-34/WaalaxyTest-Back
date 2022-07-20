import ActionDetail from '../models/action-detail.model';
import { IActionDetail } from '../types';

export default class ActionController {
  public async getAll(): Promise<IActionDetail[] | null> {
    try {
      return await ActionDetail.find();
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
