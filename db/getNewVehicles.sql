select u.firstname, u.lastname, v.make, v.model, v.year from vehicles v
join users u on u.id = v.ownerid
Where v.year > 2000
ORDER BY v.year DESC
