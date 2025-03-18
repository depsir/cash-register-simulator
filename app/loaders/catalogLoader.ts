import {json} from "@remix-run/node";
import { supabase } from "~/lib/supabase.server";
import { PostgrestError } from '@supabase/supabase-js';

export type Product = {
    barcode: string;
    name: string;
    price: number;
    id: string;
}

export type Catalog = Product[];

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 secondo

async function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function retryWithBackoff<T>(
    operation: () => Promise<T>,
    maxRetries: number = MAX_RETRIES
): Promise<T> {
    let lastError: Error | null = null;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(`[Catalog Loader] Attempt ${attempt} of ${maxRetries}`);
            const startTime = Date.now();
            const result = await operation();
            const endTime = Date.now();
            console.log(`[Catalog Loader] Operation completed in ${endTime - startTime}ms`);
            return result;
        } catch (error) {
            lastError = error as Error;
            console.error(`[Catalog Loader] Attempt ${attempt} failed:`, error);
            
            if (attempt < maxRetries) {
                const waitTime = RETRY_DELAY * attempt;
                console.log(`[Catalog Loader] Waiting ${waitTime}ms before retry...`);
                await delay(waitTime);
            }
        }
    }
    
    throw lastError;
}

export const loadCatalog = async () => {
    try {
        console.log('[Catalog Loader] Starting loadCatalog...');
        console.log('[Catalog Loader] Supabase URL:', process.env.SUPABASE_URL);
        
        const { data, error } = await retryWithBackoff(async () => {
            console.log('[Catalog Loader] Executing Supabase query...');
            const result = await supabase
                .from('products')
                .select('id, barcode, name, price')
                .order('name')
                .limit(100);
            
            if (result.error) {
                console.error('[Catalog Loader] Supabase query error:', {
                    code: result.error.code,
                    message: result.error.message,
                    details: result.error.details,
                    hint: result.error.hint
                });
                throw result.error;
            }
            
            return result;
        });

        if (error) {
            const supabaseError = error as PostgrestError;
            console.error("[Catalog Loader] Error loading catalog:", {
                code: supabaseError.code,
                message: supabaseError.message,
                details: supabaseError.details,
                hint: supabaseError.hint
            });
            
            // Gestione errori specifici di Supabase
            if (supabaseError.code === 'PGRST116') {
                return json({ 
                    error: "Errore di connessione al database",
                    details: "Impossibile stabilire una connessione con Supabase"
                }, { status: 503 });
            }
            
            if (supabaseError.code === 'PGRST301') {
                return json({ 
                    error: "Timeout della query",
                    details: "La richiesta al database ha impiegato troppo tempo"
                }, { status: 504 });
            }
            
            return json({ 
                error: "Errore nel caricamento del catalogo",
                details: supabaseError.message
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