import {json} from "@remix-run/node";
import { supabase } from "~/lib/supabase.server";

export type Customer = {
    id: string;
    name: string;
    card_number: string;
    points: number;
}

export const loadCustomers = async () => {
    const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('name');

    if (error) {
        console.error("Error loading customers:", error);
        return json([]);
    }

    return json(data || []);
}