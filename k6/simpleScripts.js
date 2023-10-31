import http from 'k6/http';
import { check, sleep } from 'k6';

//stress test
export const options = {
  
  stages: [
    { duration: '10m', target: 200 }, // traffic ramp-up from 1 to a higher 200 users over 10 minutes.
    { duration: '10s', target: 200 }, // stay at higher 200 users for 30 minutes
    { duration: '5m', target: 0 }, // ramp-down to 0 users
  ],
};

//smoke test
export default function () {
  const res = http.get('https://www.saucedemo.com');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
