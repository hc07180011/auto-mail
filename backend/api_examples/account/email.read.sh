token="$(cat api_examples/token.txt)"
curl -X POST \
-d "{\"token\": \"${token}\"}" \
-H "Content-Type: application/json" \
http://localhost:4000/account/email/read