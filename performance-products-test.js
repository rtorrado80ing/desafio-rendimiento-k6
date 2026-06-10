import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

const products = new SharedArray('products', function () {
  return papaparse.parse(open('./data/products.csv'), { header: true }).data;
});

export const options = {
  scenarios: {
    products_ramp_test: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '100s', target: 100 }, // sube 1 usuario por segundo hasta 100
        { duration: '25m', target: 100 },  // mantiene 100 usuarios durante 25 minutos
        { duration: '100s', target: 0 },   // baja 1 usuario por segundo hasta 0
      ],
      gracefulRampDown: '30s',
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<500'],
    checks: ['rate>0.99'],
  },
};

export default function () {
  const product = products[Math.floor(Math.random() * products.length)];
  const url = `https://fakestoreapi.com/products/${product.id}`;

  const randomDelay = Math.floor(Math.random() * (9 - 4 + 1)) + 4;
  sleep(randomDelay);

  const response = http.get(url, {
    tags: {
      service: 'FakeStoreAPI',
      endpoint: 'GET /products/{ID}',
    },
  });

  check(response, {
    'status code is 200': (r) => r.status === 200,
    'response time is below 500ms': (r) => r.timings.duration < 500,
    'response has product id': (r) => JSON.parse(r.body).id !== undefined,
    'response has title': (r) => JSON.parse(r.body).title !== undefined,
    'response has price': (r) => JSON.parse(r.body).price !== undefined,
  });
}
