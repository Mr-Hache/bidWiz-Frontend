export function validatePassword(password: string): boolean {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])([A-Za-z\d!@#$%^&*]|[^ ]){8,}$/;
    return re.test(password);
}
  
export function validateEmail(email: string): boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}
  
export function validateLanguages(languages: string[]): boolean {
    return languages.length > 0;
}
  
export function validateSubjects(subjects: string[]): boolean {
    return subjects.length > 0;
}

export function validateNotEmpty(input: string): boolean {
    return input.trim() !== '';
}
  
  