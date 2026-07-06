import http from 'k6/http';
import { check, sleep } from 'k6';
import { FormData } from 'https://jslib.k6.io/formdata/0.0.2/index.js';

export const options = {
  stages: [
    { duration: '10s', target: 20 },
    { duration: '40s', target: 20 },
    { duration: '10s', target: 0 }, 
  ],
};

const BASE_URL = 'https://api.minisocial-network.id.vn';

// TẠO FILE 5MB Ở INIT CONTEXT
const file5MB = new Uint8Array(5 * 1024 * 1024);
for (let i = 0; i < file5MB.length; i++) {
  file5MB[i] = Math.floor(Math.random() * 256);
}

export default function () {
  // --- BƯỚC 1: Đăng nhập ---
  const loginRes = http.post(`${BASE_URL}/api/auth/login`, JSON.stringify({
    identifier: '141204',
    password: '1412'
  }), {
    headers: { 'Content-Type': 'application/json' },
    timeout: '10s' // Thêm timeout
  });

  check(loginRes, {
    'Login success': (r) => r.status === 200,
  });

  if (loginRes.status !== 200) return;

  const token = loginRes.json('token');
  const authHeaders = {
    'Authorization': `Bearer ${token}`
  };

  sleep(1);

  // --- BƯỚC 2: Xem Feed ---
  const feedRes = http.get(`${BASE_URL}/api/feed?size=10`, {
    headers: authHeaders,
    timeout: '10s' // Thêm timeout
  });

  check(feedRes, {
    'Feed loaded': (r) => r.status === 200,
  });

  sleep(2);

  // --- BƯỚC 3: Đăng bài kèm ảnh 5MB ---
  const fd = new FormData();
  fd.append('content', 'Đây là bài post test K6 với ảnh 5MB sinh tự động!');
  fd.append('visibility', 'PUBLIC');
  fd.append('mediaFiles', http.file(file5MB.buffer, 'loadtest-5mb.jpg', 'image/jpeg'));

  const postRes = http.post(`${BASE_URL}/api/posts`, fd.body(), {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': `multipart/form-data; boundary=${fd.boundary}`
    },
    timeout: '30s' // THÊM TIMEOUT 30 GIÂY CHO UPLOAD FILE
  });

  check(postRes, {
    'Post created success': (r) => r.status === 201 || r.status === 200,
  });

  sleep(1);
}