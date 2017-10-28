insert into users (user_name, first_name, last_name, email, img, auth_id)
values ($1, $2, $3, $4, $5, $6)
returning *;