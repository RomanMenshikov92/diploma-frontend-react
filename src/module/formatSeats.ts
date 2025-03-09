/**
 * Преобразует строку формата "ряд-место" в строку формата "Ряд {row}, место {seat}".
 * Увеличивает значения ряда и места на единицу.
 *
 * @param {string} seatString - Строка формата "ряд-место".
 * @returns {string} - Строка формата "Ряд {row}, место {seat}".
 */
export function formatSeatString(seatString: string): string {
  const [row, seat] = seatString.split('-').map(Number); // Преобразуем строки в числа
  return `Ряд ${row + 1} - место ${seat + 1}`;
}
