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
            this.listeners = [];
            MemberInfo.instance = this;
        }

        return MemberInfo.instance;
    }

    updateMemberInfo(newInfo) {
        Object.assign(this, newInfo);
        this.notifyListeners();

        localStorage.setItem('memberInfo', JSON.stringify(this.getMemberInfo()));
    }

    getMemberInfo() {
        return {
            name: this._name,
            email: this.email,
            memberid: this.memberid,
            balancegameticket: this.balancegameticket,
            generation: this.generation.includes('_') ? this.generation.split('_')[1] : this.generation,
            admin: this.admin.length > 1 ? true : false,
            login: this.login
        };
    }

    set name(newName) {
        this._name = newName;
        this.notifyListeners();
    }

    subscribe(listener) {
        this.listeners.push(listener);
    }

    unsubscribe(listener) {
        this.listeners = this.listeners.filter(l => l !== listener);
    }

    notifyListeners() {
        if (this.listeners) {
            this.listeners.forEach(listener => listener(this.getMemberInfo()));
        }
    }
}

const instance = new MemberInfo();

export default instance;
