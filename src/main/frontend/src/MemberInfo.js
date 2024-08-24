class MemberInfo {
    constructor() {
        if (!MemberInfo.instance) {
            this.name = "홍길동";
            this.email = "hgd@gmail.com"
            this.memberid = 1;
            this.balancegameticket = 1;
            this.generation = "1020";
            this.admin = false;
            this.login = false;
            MemberInfo.instance = this;
        }

        return MemberInfo.instance;
    }

    updateMemberInfo(newInfo) {
        Object.assign(this, newInfo);
    }

    getMemberInfo() {
        console.log(this.admin);
        return {
            name: this.name,
            email: this.email,
            memberid: this.memberid,
            balancegameticket: this.balancegameticket,
            generation: this.generation.includes('_') ? this.generation.split('_')[1] : this.generation,
            admin: this.admin.length > 1 ? true : false,
            login: this.login
        };
    }
}

const instance = new MemberInfo();

export default instance;
