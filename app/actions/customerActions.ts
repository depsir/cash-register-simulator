import { supabase } from "~/lib/supabase.server";
import { json } from "@remix-run/node";

export async function fetchCustomerByCard(cardNumber: string) {
    const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('card_number', cardNumber)
        .single();

    if (error) {
        console.error("Error:", error);
        return json({ error: "cliente non trovato" }, { status: 404 });
    }

    if (!data) {
        return json({ error: "cliente non trovato" }, { status: 404 });
    }

    return json(data);
}

export async function updateCustomerPoints(customerId: string, newPoints: number) {
    const { data: customer } = await supabase
        .from('customers')
        .select('points')
        .eq('id', customerId)
        .single();

    if (!customer) {
        return json({ error: "cliente non trovato" }, { status: 404 });
    }

    const updatedCustomer = {
        points: (customer.points || 0) + newPoints
    };
    
    const { error } = await supabase
        .from('customers')
        .update(updatedCustomer)
        .eq('id', customerId);
    
    if (error) {
        console.error("Error:", error);
        return json({ error: "errore durante l'aggiornamento dei punti" }, { status: 500 });
    }

    return json(updatedCustomer);
} 