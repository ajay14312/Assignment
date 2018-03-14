export class SharedService {

    storeToSession(key: string, value: any) {
        if (sessionStorage) {
            sessionStorage.setItem(key, JSON.stringify(value));
        }
    }

    getFromSession(key: string) {
        if (sessionStorage.getItem(key) !== '') {
            return JSON.parse(sessionStorage.getItem(key));
        }

    }

    removeSessionItem(key) {
        sessionStorage.removeItem(key);
    }

    clearSession() {
        sessionStorage.clear();
    }

}
