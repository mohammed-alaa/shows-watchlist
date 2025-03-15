interface TUser {
	id: number;
	name: string;
	email: string;
}

interface TUserWithPassword extends TUser {
	password: string;
}
