curl --request POST \
  --url http://localhost:3000/register \
  --header 'Content-Type: application/json' \
  --data '{
    "username": "testuser2",
    "password": "validPassword123",
    "email": "test@example.com"
}'