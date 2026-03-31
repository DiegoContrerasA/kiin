'use server';

import CONFIG from "@/config";

export const getTRM = async (): Promise<number> => {
    try {
        const response = await fetch(CONFIG.TRM_BASE_URL, {
            next: { revalidate: 3600 * 3 }
        });
        const data = await response.json();
        return data.valor || 0;
    } catch {
        return 0;
    }
};
