/**
 * Utility functions for form handling
 */

/**
 * Validates an email address
 * @param email - The email address to validate
 * @returns True if the email is valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validates a phone number
 * @param phone - The phone number to validate
 * @returns True if the phone number is valid, false otherwise
 */
export function isValidPhone(phone: string): boolean {
  // Basic validation - allows various formats
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/
  return phoneRegex.test(phone)
}

/**
 * Formats form data for submission
 * @param formData - The form data to format
 * @returns An object with the formatted form data
 */
export function formatFormData(formData: FormData): Record<string, string> {
  const result: Record<string, string> = {}

  formData.forEach((value, key) => {
    if (typeof value === "string") {
      result[key] = value
    }
  })

  return result
}

/**
 * Validates form data against a schema
 * @param data - The data to validate
 * @param schema - The validation schema
 * @returns An object with validation results
 */
export function validateFormData(
  data: Record<string, string>,
  schema: Record<string, (value: string) => boolean>,
): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {}
  let isValid = true

  Object.entries(schema).forEach(([field, validator]) => {
    if (!validator(data[field])) {
      errors[field] = `Invalid ${field}`
      isValid = false
    }
  })

  return { isValid, errors }
}

