// ВАЖНО: замените эту ссылку на ссылку вашего Telegram-бота, когда он будет готов.
// Формат: https://t.me/ИМЯ_БОТА
export const BOOKING_URL = "https://t.me/graphitbarber_bot";

// Добавляет к ссылке метку услуги/мастера (бот сможет её прочитать через /start).
// Если бот пока не нужен такой метке — просто верните base.
export const bookingLink = (tag) => (tag ? `${BOOKING_URL}?start=${tag}` : BOOKING_URL);
