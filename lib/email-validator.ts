"use strict";

// Create a module for email validation
class EmailValidator {
  tester: RegExp;

  constructor() {
    // Regular expression for email validation
    this.tester =
      /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  }

  /**
   * Validates an email address.
   * @param {string} email - The email address to validate.
   * @returns {boolean} - Returns true if the email is valid, otherwise false.
   */
  validate(email: string): boolean {
    if (!email) return false;

    var emailParts = email.split("@");

    if (emailParts.length !== 2) return false;

    var account = emailParts[0];
    var address = emailParts[1];

    if (account.length > 64) return false;
    if (address.length > 255) return false;

    var domainParts = address.split(".");

    if (
      domainParts.some(function (part) {
        return part.length > 63;
      })
    )
      return false;

    return this.tester.test(email);
  }
}

// Export the class as a module
export default EmailValidator;
