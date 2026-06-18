export function generateUniqueEmail() {
    const timestamp = Date.now();
    return `user_${timestamp}@example.com`;
}