/**
 * @param {String} date - La date d'anniversaire au format ISO (YYYY-MM-DD)
 * @return {Number} L'âge de la personne
 */
export function calculateAge(date: string): number {
  return Math.floor((Date.now() - new Date(date).getTime()) / (3600 * 1000 * 24 * 365.25))
}

/**
 * @param {string} birthdate La date d'anniversaire au format ISO (YYYY-MM-DD)
 * @returns {String} Le jour de l'anniversaire dans l'année
 */
export function formatBirthday(birthdate: string): string {
  return new Date(birthdate).toLocaleDateString('fr-FR', {
    month: 'long',
    day: 'numeric'
  })
}

/**
 * @param {String} string La chaîne de caractère où supprimer des accents
 * @returns {String} La chaîne `string` sans les accents
 */
export function removeAccents(string: string): string {
  return string.normalize('NFD').replace(/\p{Diacritic}/gu, '')
}

/**
 * @param {String} date La chaine de caractère au format ISO (YYYY-MM-DD)
 * @returns {Boolean} `true` si la date correspond à un age >= 18 ans. `false` dans le cas contraire
 */
export function isMajor(date: string): boolean {
  return new Date(date).getTime() < Date.now() - 18 * 365.25 * 24 * 3600 * 1000
}

/**
 * @param {String} value La chaine de caractère d'un numéro de téléphone Français valide
 * @returns {Boolean} `true` si le numéro est valide en France. `false` dans le cas contraire
 */
export function isValidPhone(value: string): boolean {
  return /^0[0-9][.-\s]?[0-9]{2}[.-\s]?[0-9]{2}[.-\s]?[0-9]{2}[.-\s]?[0-9]{2}$/i.test(value)
}

/**
 * @param {String} value L'adresse email
 * @returns {Boolean} `true` si l'adresse est valide. `false` dans le cas contraire
 */
export function isValidEmail(value: string): boolean {
  // eslint-disable-next-line no-control-regex
  return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i.test(
    value
  )
}
