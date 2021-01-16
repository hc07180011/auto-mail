token="$(cat api_examples/token.txt)"
curl -X POST \
-d "{\"token\": \"${token}\", \"address\": \"henrychao0718@gmail.com\", \"password\": \"Henry00110011\"}" \
-H "Content-Type: application/json" \
http://localhost:4000/account/email/create