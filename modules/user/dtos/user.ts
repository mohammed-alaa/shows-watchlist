export default class {
	public id?: number;

	constructor(
		public email: string,
		public name: string,
		public password: string,
	) {}

	public static fromDb(user: TUserWithPassword) {
		const _user = new this(user.email, user.name, user.password);
		return _user.setId(user.id);
	}

	public setPassword(password: string) {
		this.password = password;
		return this;
	}

	public getId() {
		return this.id;
	}
	public setId(id: number) {
		this.id = id;
		return this;
	}

	public withoutPassword(): TUser {
		return {
			id: this.getId()!,
			name: this.name,
			email: this.email,
		};
	}
}
