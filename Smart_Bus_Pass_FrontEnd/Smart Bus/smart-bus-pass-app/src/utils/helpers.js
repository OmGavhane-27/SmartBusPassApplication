// src/utils/helpers.js

export function generateUniqueId() {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}
