update vehicles
set ownerid = null
where id = $2 AND ownerid = $1
