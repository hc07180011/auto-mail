token="$(cat api_examples/token.txt)"
email="$(cat api_examples/email.txt)"
curl -X POST \
-d "{\"token\": \"${token}\", \"emailId\": \"${email}\", \"subject\": \"Hello world\", \"text\": \"fuck you, this is text\"}" \
-d file="@api_examples/content/logo.png" \
-H "Content-Type: application/json" \
http://localhost:4000/content/create