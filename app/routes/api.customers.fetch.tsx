import { ActionFunction, json } from "@remix-run/node";
import { fetchCustomerByCard } from "~/actions/customerActions";
import { normalizeCardNumber } from "~/utils/utils";

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const cardNumber = formData.get("cardNumber") as string;

    if (!cardNumber) {
        return json({ error: "Numero carta mancante" }, { status: 400 });
    }

    // Normalizziamo anche qui e non solo nella pagina: cosi' vale per ogni
    // chiamante, qualunque forma abbia il valore letto dallo scanner.
    return fetchCustomerByCard(normalizeCardNumber(cardNumber));
}; 