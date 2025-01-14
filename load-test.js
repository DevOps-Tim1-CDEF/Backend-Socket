import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  stages: [
    { duration: "30s", target: 2500 },
    { duration: "2m", target: 5000 },
    { duration: "3m", target: 5500 },
    { duration: "20s", target: 1500 },
  ],
};

export default function () {
  // Replace with the actual endpoint of your Express application
  let res = http.post("http://localhost:2500/thread"); // e.g., http://localhost:3000/

  // Check if the response status is 200
  check(res, {
    success: (r) => r.status === 200,
  });

  sleep(1); // Sleep for 1 second
}
