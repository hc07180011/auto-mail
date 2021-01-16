token="$(cat api_examples/token.txt)"
email="$(cat api_examples/email.txt)"
curl -X POST \
-d "{\"token\": \"${token}\", \"emailId\": \"${email}\", \"contentId\": \"60032560383476229f527487\"}" \
-H "Content-Type: application/json" \
http://localhost:4000/content/delete