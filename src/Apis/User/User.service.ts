/* eslint-disable class-methods-use-this */

import { apiRequestor, apiRequestorToken } from '../requestor';
import { PatchUserProps, UserId } from './User.type';

class UserService {
  getUserMe() {
    return apiRequestorToken.get(`/users/me`);
  }

  patchUserMe(payload: PatchUserProps) {
    return apiRequestorToken.patch(`/users/me`, payload);
  }

  getUserRanking() {
    return apiRequestor.get(`/users/ranking`);
  }

  getUserInfo(userID: UserId) {
    return apiRequestor.get(`/users/${userID}`);
  }

  getUserCreatedProduct(userID: UserId) {
    return apiRequestor.get(`/users/${userID}/created-products`);
  }

  getUserReviewedProduct(userID: UserId) {
    return apiRequestor.get(`/users/${userID}/reviewed-products`);
  }

  getUserFavoriteProduct(userID: UserId) {
    return apiRequestor.get(`/users/${userID}/favorite-products`);
  }

  getUserFollowees(userID: UserId) {
    return apiRequestor.get(`/users/${userID}/followees`);
  }

  getUserFollowers(userID: UserId) {
    return apiRequestor.get(`/users/${userID}/followers`);
  }
}

export default new UserService();
