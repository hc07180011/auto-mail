token="$(cat api_examples/token.txt)"
curl -X POST \
-d "{\"token\": \"${token}\", \"address\": \"hendry0718@gmail.com\", \"password\": \"Henry\"}" \
-H "Content-Type: application/json" \
http://localhost:4000/account/email/create