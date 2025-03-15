export default class {
	public id?: number;

	constructor(
		public email: string,
		public name: string,
		public password: string,
	) {}

	public static fromDb(user: TUserWithPassword) {
		const _user = new this(user.email, user.name, user.password);
		_user.id = user.id;
		return _user;
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
}
