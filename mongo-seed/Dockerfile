# Utilização do docker para popular o banco de dados
# proveniente do Stack OverFlow
# https://stackoverflow.com/questions/31210973/how-d
# o-i-seed-a-mongo-database-using-docker-compose
FROM mongo

COPY users.json /users.json
CMD mongoimport --host mongodb --db sharenergy_crud --collection users --drop --type json --file /users.json --jsonArray