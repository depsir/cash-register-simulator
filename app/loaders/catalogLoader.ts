import { json } from "@remix-run/node";
import { supabase } from "~/lib/supabase";

export type Product = {
    barcode: string;
    name: string;
    price: number;
    id: string;
}

export type Catalog = Product[];

export const loadCatalog = async () => {
    try {
        console.log('[Catalog Loader] Starting loadCatalog...');
        
        const { data, error } = await supabase
            .from('products')
            .select('id, barcode, name, price')
            .order('name');

        if (error) {
            console.error("[Catalog Loader] Error loading catalog:", error);
            return json({ 
                error: "Errore nel caricamento del catalogo",
                details: error.message
            }, { status: 500 });
        }

        console.log(`[Catalog Loader] Successfully loaded ${data?.length || 0} products`);
        
        return json(data || [], {
            headers: {
                "Cache-Control": "public, max-age=300", // Cache per 5 minuti
            },
        });
    } catch (error) {
        console.error("[Catalog Loader] Unexpected error in loadCatalog:", error);
        return json({ 
            error: "Errore imprevisto nel caricamento del catalogo",
            details: error instanceof Error ? error.message : "Errore sconosciuto"
        }, { status: 500 });
    }
}