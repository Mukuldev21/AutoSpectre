import { BasePage } from './BasePage';

export class AppPage extends BasePage {
  async userName() {
    return this.getElement('user-name', [
  "input[name=\"user-name\"]",
  "#user-name",
  "input[placeholder=\"Username\"]",
  "input[type=\"text\"]"
]);
  }
  async password() {
    return this.getElement('password', [
  "input[name=\"password\"]",
  "#password",
  "input[placeholder=\"Password\"]",
  "input[type=\"password\"]"
]);
  }
  async loginButton() {
    return this.getElement('login-button', [
  "input[name=\"login-button\"]",
  "#login-button",
  "input[placeholder=\"\"]",
  "input[type=\"submit\"]"
]);
  }
}