'use client';

import { usePostAuthSignUp } from '@/Apis/Auth/useAuthService';

export default function SignUpButton() {
  // 회원가입 Post 보내기
  const { mutate } = usePostAuthSignUp({
    email: 'email001@naver.com',
    nickname: 'nickname001',
    password: 'password',
    passwordConfirmation: 'password',
  });

  return (
    <div className="w-64 h-9 p-2 bg-gradient">
      테스트
      <button type="button" onClick={mutate} className="w-64 h-9">
        버튼
      </button>
    </div>
  );
}
