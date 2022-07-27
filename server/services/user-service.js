import bcrypt from 'bcrypt';
import { userModel } from '../db/index.js';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import qs from 'qs';

class UserService {
  // 본 파일의 맨 아래에서, new UserService(userModel) 하면, 이 함수의 인자로 전달됨
  constructor(userModel) {
    this.userModel = userModel;
  }

  // 회원가입
  async addUser(userInfo) {
    // 객체 destructuring
    const { name, email, password, phoneNumber } = userInfo;

    // 이메일 중복 확인
    const user = await this.userModel.findByEmail(email);
    if (user) {
      throw new Error(
        '이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.',
      );
    }

    // 이메일 중복은 이제 아니므로, 회원가입을 진행함

    // 우선 비밀번호 해쉬화(암호화)
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserInfo = {
      email,
      password: hashedPassword,
      phoneNumber,
      name,
    };

    // db에 저장
    const createdNewUser = await this.userModel.create(newUserInfo);

    return createdNewUser;
  }

  // 카카오 Oauth 회원가입
  async addUserWithKakao(authorizationCode) {
    const tokenResponse = await axios({
      method: 'POST',
      url: 'https://kauth.kakao.com/oauth/token',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify({
        grant_type: 'authorization_code',
        client_id: process.env.KAKAO_REST_API_KEY,
        redirect_uri: process.env.KAKAO_REDIRECT_URI,
        code: authorizationCode,
      }),
    });

    const accessToken = tokenResponse.data.access_token;

    const userResponse = await axios({
      method: 'GET',
      url: 'https://kapi.kakao.com/v2/user/me',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const authData = {
      ...tokenResponse.data,
      ...userResponse.data,
    };

    const {
      profile: { nickname },
      email,
    } = authData.kakao_account;

    if (!email) {
      throw new Error('회원가입을 위해서는 이메일과 이름이 필요합니다');
    }

    // 카카오 로그인 했던 적이 있는지 확인
    let user = await this.userModel.findByEmail(email);

    // db에 저장
    if (!user) {
      // 비밀번호는 임시로 설정
      const password = 'kakao';
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUserInfo = {
        email,
        name: nickname,
        password: hashedPassword,
        isOAuth: true,
      };

      user = await this.userModel.create(newUserInfo);
    }

    const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
    const token = jwt.sign(
      {
        userId: user._id,
        name: user.name,
        role: user.role,
        isOAuth: user.isOAuth,
      },
      secretKey,
    );

    return token;
  }

  // 로그인
  async getUserToken(loginInfo) {
    // 객체 destructuring
    const { email, password } = loginInfo;

    // 우선 해당 이메일의 사용자 정보가  db에 존재하는지 확인
    const user = await this.userModel.findByEmail(email);
    if (!user) {
      throw new Error(
        '해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.',
      );
    }

    // 이제 이메일은 문제 없는 경우이므로, 비밀번호를 확인함

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password; // db에 저장되어 있는 암호화된 비밀번호

    // 매개변수의 순서 중요 (1번째는 프론트가 보내온 비밀번호, 2번쨰는 db에 있떤 암호화된 비밀번호)
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash,
    );

    if (!isPasswordCorrect) {
      throw new Error(
        '비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.',
      );
    }
    //작성
    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        isOAuth: user.isOAuth,
        name: user.name,
      },
      secretKey,
    );
    const isAdmin = user.role === 'admin';

    return { token, isAdmin };
  }
  // 카카오 Oauth 로그인
  async getUserTokenWithKakao(email) {
    if (!email) {
      throw new Error('로그인을 위해서는 이메일 필요합니다');
    }

    // 이메일 db에 존재 여부 확인
    const user = await this.userModel.findByEmail(email);
    if (!user) {
      throw new Error(
        '해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.',
      );
    }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || 'secret-key';
    const token = jwt.sign(
      { userId: user._id, role: user.role, isOAuth: user.isOAuth },
      secretKey,
    );

    const isAdmin = user.role === 'admin';

    return { token, isAdmin };
  }
  // 비밀번호 맞는지 여부만 확인
  async checkUserPassword(userId, password) {
    // 이메일 db에 존재 여부 확인
    const user = await this.userModel.findById(userId);

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash,
    );

    if (!isPasswordCorrect) {
      throw new Error(
        '비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.',
      );
    }

    // 비밀번호 일치함. 유저 정보 반환
    return { result: 'success' };
  }

  async changeUserPassword(userId, toUpdate) {
    // 이메일 db에 존재 여부 확인

    let user = await this.userModel.findById(userId);

    if (!user) {
      throw new Error('유저 정보가 존재하지 않습니다.');
    }
    const { password } = toUpdate;

    if (password) {
      const newPasswordHash = await bcrypt.hash(password, 10);
      toUpdate.password = newPasswordHash;
    }

    // 업데이트 진행
    user = await this.userModel.update({
      userId,
      update: toUpdate,
    });
    // 비밀번호 일치함. 유저 정보 반환
    return user;
  }

  // 사용자 목록을 받음.
  async getUsers() {
    const users = await this.userModel.findAll();
    return users;
  }

  // 유저정보 수정, 현재 비밀번호가 있어야 수정 가능함.
  async setUser(userInfoRequired, toUpdate) {
    // 객체 destructuring
    const { userId, currentPassword } = userInfoRequired;

    // 우선 해당 id의 유저가 db에 있는지 확인
    let user = await this.userModel.findById(userId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      throw new Error('가입 내역이 없습니다. 다시 한 번 확인해 주세요.');
    }

    // 이제, 정보 수정을 위해 사용자가 입력한 비밀번호가 올바른 값인지 확인해야 함

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      correctPasswordHash,
    );

    if (!isPasswordCorrect) {
      throw new Error(
        '현재 비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.',
      );
    }

    // 이제 드디어 업데이트 시작

    // 비밀번호도 변경하는 경우에는, 회원가입 때처럼 해쉬화 해주어야 함.
    const { password } = toUpdate;

    if (password) {
      const newPasswordHash = await bcrypt.hash(password, 10);
      toUpdate.password = newPasswordHash;
    }

    // 업데이트 진행
    user = await this.userModel.update({
      userId,
      update: toUpdate,
    });

    return user;
  }

  // 위 setUser과 달리, 현재 비밀번호 없이도, 권한을 수정할 수 있음.
  async setRole(userId, role) {
    const updatedUser = await this.userModel.update({
      userId,
      update: { role },
    });

    return updatedUser;
  }
  // 위 setUser과 달리, 현재 비밀번호 없이도, 주소 혹은 번호를 수정할 수 있음.
  async saveUserInfo(userId, UserInfo) {
    const updatedUser = await this.userModel.update({
      userId,
      update: UserInfo,
    });

    return updatedUser;
  }

  async deleteUserData(userId) {
    const { deletedCount } = await this.userModel.delete(userId);

    // 삭제에 실패한 경우, 에러 메시지 반환
    if (deletedCount === 0) {
      throw new Error(`${userId} 사용자 데이터의 삭제에 실패하였습니다.`);
    }

    return { result: 'success' };
  }

  async getUser(userId) {
    // 우선 해당 id의 유저가 db에 있는지 확인
    const user = await this.userModel.findById(userId);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      throw new Error('가입 내역이 없습니다. 다시 한 번 확인해 주세요.');
    }
    return user;
  }

  async getUserMail(email) {
    const checkUserMail = await this.userModel.findByEmail(email);

    return checkUserMail;
  }

  async getUsersByPagination({
    phoneNumber,
    name,
    email,
    offset = 0,
    count = 10,
  }) {
    let search_list = [];

    if (name) {
      search_list.push({ name: { $regex: name } });
    }
    if (email) {
      search_list.push({ email: { $regex: email } });
    }
    if (phoneNumber) {
      search_list.push({ phoneNumber: { $regex: phoneNumber } });
    }
    let query = {};

    if (search_list.length > 0) {
      query = { $and: search_list };
    }

    const users = await this.userModel.findByPagination(query, offset, count);
    const length = await this.userModel.countdocument(query);
    const result = {
      length,
      users,
    };
    return result;
  }
}

const userService = new UserService(userModel);

export { userService };
