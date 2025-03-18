import { ActionFunction, json } from "@remix-run/node";
import { updateCustomerPoints } from "~/actions/customerActions";

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const customerId = formData.get("customerId") as string;
    const newPoints = parseInt(formData.get("newPoints") as string);

    if (!customerId || isNaN(newPoints)) {
        return json({ error: "Dati mancanti o non validi" }, { status: 400 });
    }

    return updateCustomerPoints(customerId, newPoints);
}; 