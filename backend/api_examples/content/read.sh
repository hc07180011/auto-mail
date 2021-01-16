token="$(cat api_examples/token.txt)"
email="$(cat api_examples/email.txt)"
curl -X POST \
-d "{\"token\": \"${token}\", \"emailId\": \"${email}\"}" \
-H "Content-Type: application/json" \
http://localhost:4000/content/read