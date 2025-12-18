import fs from 'fs';
import path from 'path';

const CREDENTIALS_FILE = path.resolve('credentials.json');

interface Credentials {
    user: string;
    pass: string;
}

interface CredentialStore {
    [domain: string]: Credentials;
}

export class CredentialManager {
    static load(): CredentialStore {
        if (!fs.existsSync(CREDENTIALS_FILE)) {
            return {};
        }
        try {
            return JSON.parse(fs.readFileSync(CREDENTIALS_FILE, 'utf-8'));
        } catch (error) {
            console.warn('⚠️ Failed to load credentials file, starting fresh.');
            return {};
        }
    }

    static save(url: string, creds: Credentials) {
        const store = this.load();
        const domain = new URL(url).hostname;
        store[domain] = creds;

        fs.writeFileSync(CREDENTIALS_FILE, JSON.stringify(store, null, 2));
        console.log(`💾 Saved credentials for ${domain}`);
    }

    static get(url: string): Credentials | undefined {
        const store = this.load();
        try {
            const domain = new URL(url).hostname;
            return store[domain];
        } catch (e) {
            return undefined;
        }
    }
}
