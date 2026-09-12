export const formatNumber = (number: number) => {
    return number.toFixed(2)
};

export const compute = (price: number, quantity: number) => {
    return (((price * 100) * (quantity * 100)) / 10000)
}

export const CUSTOMER_CARD_PREFIX = "CRS-CUSTOMER-";

/**
 * Riporta un numero di tessera alla forma canonica CRS-CUSTOMER-NNN.
 *
 * Il lettore barcode e' un keyboard wedge: se il suo layout di tastiera non
 * coincide con quello del sistema, il trattino arriva come un altro carattere
 * (su layout italiano diventa un apostrofo). Senza questa normalizzazione un
 * cliente registrato con il layout sbagliato non viene piu' trovato da nessuna
 * scansione successiva.
 *
 * Accetta anche il solo numero, digitato a mano dal tastierino.
 */
export const normalizeCardNumber = (cardNumber: string) => {
    const raw = (cardNumber || "").trim().toUpperCase();

    if (/^[0-9]+$/.test(raw)) {
        return `${CUSTOMER_CARD_PREFIX}${raw.padStart(3, "0")}`;
    }

    // Un solo carattere qualsiasi al posto di ognuno dei due trattini.
    const match = raw.match(/^CRS.?CUSTOMER.?([0-9]+)$/);
    if (match) {
        return `${CUSTOMER_CARD_PREFIX}${match[1].padStart(3, "0")}`;
    }

    return raw;
}
