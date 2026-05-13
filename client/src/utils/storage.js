export const storageKeys = {
  auth: "fitmanager_auth",
  membership: "fitmanager_membership",
};

/**
 * טעינת נתון מ-localStorage בפורמט JSON
 */
export const loadStoredJson = (key, fallback = null) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

/**
 * שמירת נתון ל-localStorage בפורמט JSON
 */
export const saveStoredJson = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // התעלמות משגיאות כתיבה
  }
};

/**
 * מחיקת נתון מ-localStorage
 */
export const removeStoredJson = (key) => {
  try {
    localStorage.removeItem(key);
  } catch {
    // התעלמות משגיאות מחיקה
  }
};