token="$(cat api_examples/token.txt)"
curl -X POST \
-d "{\"token\": \"${token}\", \"emailId\": \"600301c9a8c2a4d353b51723\"}" \
-H "Content-Type: application/json" \
http://localhost:4000/account/email/delete