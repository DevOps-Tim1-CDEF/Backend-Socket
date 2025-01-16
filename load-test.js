import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  stages: [
    { duration: "45s", target: 10 },
    // { duration: "2m", target: 500 },
  ],
};

export default function () {
  // Replace with the actual endpoint of your Express application
  let res = http.get("http://localhost:2500/"); // e.g., http://localhost:3000/

  // Check if the response status is 200
  check(res, {
    success: (r) => r.status === 200,
  });

  sleep(1); // Sleep for 1 second
}
