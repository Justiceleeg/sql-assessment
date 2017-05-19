select v.make, v.model, v.year from vehicles v
join users u on u.id = v.ownerid
Where u.firstname like $1
