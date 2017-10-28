UPDATE users
SET primary_prn = $2
WHERE id = $1;