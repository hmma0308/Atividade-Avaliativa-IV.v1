curl --request POST \
  --url http://localhost:3000/register \
  --header 'Content-Type: application/json' \
  --data '{
    "username": "testuser",
    "password": "validPassword123",
    "email": "test@example.com"
}'