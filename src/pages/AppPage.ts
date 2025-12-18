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
  async openMenuButton() {
    return this.getElement('OpenMenuButton', [
  "text=Open Menu",
  "#react-burger-menu-btn",
  "button"
]);
  }
  async closeMenuButton() {
    return this.getElement('CloseMenuButton', [
  "text=Close Menu",
  "#react-burger-cross-btn",
  "button"
]);
  }
  async addtocartsaucelabsbackpackButton() {
    return this.getElement('addtocartsaucelabsbackpackButton', [
  "text=Add to cart",
  "#add-to-cart-sauce-labs-backpack",
  "button[name=\"add-to-cart-sauce-labs-backpack\"]",
  "button"
]);
  }
  async addtocartsaucelabsbikelightButton() {
    return this.getElement('addtocartsaucelabsbikelightButton', [
  "text=Add to cart",
  "#add-to-cart-sauce-labs-bike-light",
  "button[name=\"add-to-cart-sauce-labs-bike-light\"]",
  "button"
]);
  }
  async addtocartsaucelabsbolttshirtButton() {
    return this.getElement('addtocartsaucelabsbolttshirtButton', [
  "text=Add to cart",
  "#add-to-cart-sauce-labs-bolt-t-shirt",
  "button[name=\"add-to-cart-sauce-labs-bolt-t-shirt\"]",
  "button"
]);
  }
  async addtocartsaucelabsfleecejacketButton() {
    return this.getElement('addtocartsaucelabsfleecejacketButton', [
  "text=Add to cart",
  "#add-to-cart-sauce-labs-fleece-jacket",
  "button[name=\"add-to-cart-sauce-labs-fleece-jacket\"]",
  "button"
]);
  }
  async addtocartsaucelabsonesieButton() {
    return this.getElement('addtocartsaucelabsonesieButton', [
  "text=Add to cart",
  "#add-to-cart-sauce-labs-onesie",
  "button[name=\"add-to-cart-sauce-labs-onesie\"]",
  "button"
]);
  }
  async addtocarttestallthethingstshirtredButton() {
    return this.getElement('addtocarttestallthethingstshirtredButton', [
  "text=Add to cart",
  "#add-to-cart-test.allthethings()-t-shirt-(red)",
  "button[name=\"add-to-cart-test.allthethings()-t-shirt-(red)\"]",
  "button"
]);
  }
  async allItemsLink() {
    return this.getElement('AllItemsLink', [
  "text=All Items",
  "#inventory_sidebar_link",
  "a[href=\"https://www.saucedemo.com/inventory.html#\"]"
]);
  }
  async aboutLink() {
    return this.getElement('AboutLink', [
  "text=About",
  "#about_sidebar_link",
  "a[href=\"https://saucelabs.com/\"]"
]);
  }
  async logoutLink() {
    return this.getElement('LogoutLink', [
  "text=Logout",
  "#logout_sidebar_link",
  "a[href=\"https://www.saucedemo.com/inventory.html#\"]"
]);
  }
  async resetAppStateLink() {
    return this.getElement('ResetAppStateLink', [
  "text=Reset App State",
  "#reset_sidebar_link",
  "a[href=\"https://www.saucedemo.com/inventory.html#\"]"
]);
  }
  async link() {
    return this.getElement('link', [
  "a[href=\"\"]"
]);
  }
  async link() {
    return this.getElement('link', [
  "#item_4_img_link",
  "a[href=\"https://www.saucedemo.com/inventory.html#\"]"
]);
  }
  async sauceLabsBackpackLink() {
    return this.getElement('SauceLabsBackpackLink', [
  "text=Sauce Labs Backpack",
  "#item_4_title_link",
  "a[href=\"https://www.saucedemo.com/inventory.html#\"]"
]);
  }
  async link() {
    return this.getElement('link', [
  "#item_0_img_link",
  "a[href=\"https://www.saucedemo.com/inventory.html#\"]"
]);
  }
  async sauceLabsBikeLightLink() {
    return this.getElement('SauceLabsBikeLightLink', [
  "text=Sauce Labs Bike Light",
  "#item_0_title_link",
  "a[href=\"https://www.saucedemo.com/inventory.html#\"]"
]);
  }
  async link() {
    return this.getElement('link', [
  "#item_1_img_link",
  "a[href=\"https://www.saucedemo.com/inventory.html#\"]"
]);
  }
  async sauceLabsBoltTShirtLink() {
    return this.getElement('SauceLabsBoltTShirtLink', [
  "text=Sauce Labs Bolt T-Shirt",
  "#item_1_title_link",
  "a[href=\"https://www.saucedemo.com/inventory.html#\"]"
]);
  }
  async link() {
    return this.getElement('link', [
  "#item_5_img_link",
  "a[href=\"https://www.saucedemo.com/inventory.html#\"]"
]);
  }
  async sauceLabsFleeceJacketLink() {
    return this.getElement('SauceLabsFleeceJacketLink', [
  "text=Sauce Labs Fleece Jacket",
  "#item_5_title_link",
  "a[href=\"https://www.saucedemo.com/inventory.html#\"]"
]);
  }
  async link() {
    return this.getElement('link', [
  "#item_2_img_link",
  "a[href=\"https://www.saucedemo.com/inventory.html#\"]"
]);
  }
  async sauceLabsOnesieLink() {
    return this.getElement('SauceLabsOnesieLink', [
  "text=Sauce Labs Onesie",
  "#item_2_title_link",
  "a[href=\"https://www.saucedemo.com/inventory.html#\"]"
]);
  }
  async link() {
    return this.getElement('link', [
  "#item_3_img_link",
  "a[href=\"https://www.saucedemo.com/inventory.html#\"]"
]);
  }
  async testallTheThingsTShirtRedLink() {
    return this.getElement('TestallTheThingsTShirtRedLink', [
  "text=Test.allTheThings() T-Shirt (Red)",
  "#item_3_title_link",
  "a[href=\"https://www.saucedemo.com/inventory.html#\"]"
]);
  }
  async twitterLink() {
    return this.getElement('TwitterLink', [
  "text=Twitter",
  "a[href=\"https://twitter.com/saucelabs\"]"
]);
  }
  async facebookLink() {
    return this.getElement('FacebookLink', [
  "text=Facebook",
  "a[href=\"https://www.facebook.com/saucelabs\"]"
]);
  }
  async linkedInLink() {
    return this.getElement('LinkedInLink', [
  "text=LinkedIn",
  "a[href=\"https://www.linkedin.com/company/sauce-labs/\"]"
]);
  }
  async root() {
    return this.getElement('root', [
  "#root"
]);
  }
  async container1() {
    return this.getElement('container_1', [
  ".login_container"
]);
  }
  async loginButtonContainer() {
    return this.getElement('login_button_container', [
  "#login_button_container",
  ".form_column"
]);
  }
  async loginCredentials() {
    return this.getElement('login_credentials', [
  "#login_credentials",
  ".login_credentials"
]);
  }
  async pageWrapper() {
    return this.getElement('page_wrapper', [
  "#page_wrapper",
  ".page_wrapper"
]);
  }
  async contentsWrapper() {
    return this.getElement('contents_wrapper', [
  "#contents_wrapper"
]);
  }
  async headerContainer() {
    return this.getElement('header_container', [
  "#header_container",
  ".header_container"
]);
  }
  async menuButtonContainer() {
    return this.getElement('menu_button_container', [
  "#menu_button_container"
]);
  }
  async shoppingCartContainer() {
    return this.getElement('shopping_cart_container', [
  "#shopping_cart_container",
  ".shopping_cart_container"
]);
  }
  async inventoryContainer() {
    return this.getElement('inventory_container', [
  "#inventory_container"
]);
  }
  async errorMessage() {
    return this.getElement('errorMessage', [
  ".error-message-container",
  "h3[data-test=\"error\"]",
  "[data-test=\"error\"]"
]);
  }
}