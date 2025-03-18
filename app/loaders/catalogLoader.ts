import {json} from "@remix-run/node";
import { supabase } from "~/lib/supabase.server";

export type Product = {
    barcode: string;
    name: string;
    price: number;
    id: string;
}

export type Catalog = Product[];

export const loadCatalog = async () => {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name');

    if (error) {
        console.error("Error loading catalog:", error);
        return json([]);
    }

    return json(data || []);
}