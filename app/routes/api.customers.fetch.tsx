import { ActionFunction, json } from "@remix-run/node";
import { fetchCustomerByCard } from "~/actions/customerActions";

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const cardNumber = formData.get("cardNumber") as string;

    if (!cardNumber) {
        return json({ error: "Numero carta mancante" }, { status: 400 });
    }

    return fetchCustomerByCard(cardNumber);
}; 