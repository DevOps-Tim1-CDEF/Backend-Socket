import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  stages: [
    { duration: "10s", target: 10000 },
    { duration: "15s", target: 20000 },
    { duration: "20s", target: 30000 },
    { duration: "25s", target: 40000 },
    { duration: "30s", target: 50000 },
    { duration: "35s", target: 60000 },
    { duration: "40s", target: 70000 },
  ],
};

export default function () {
  // Replace with the actual endpoint of your Express application
  let res = http.post("http://localhost:30001/thread"); // e.g., http://localhost:3000/

  // Check if the response status is 200
  check(res, {
    success: (r) => r.status === 200,
  });

  sleep(1); // Sleep for 1 second
}
