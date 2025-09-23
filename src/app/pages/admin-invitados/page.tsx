"use client";

import React, { useState } from "react";
import Papa from "papaparse";

export default function CsvToJson() {
    const [jsonData, setJsonData] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        Papa.parse(file, {
            header: true, // Usa la primera fila como cabecera
            skipEmptyLines: true,
            complete: (results: any) => {
                if (results.errors.length) {
                    setError("Hubo un problema procesando el CSV.");
                    console.error(results.errors);
                } else {
                    setJsonData(results.data as any[]);
                    setError(null);
                }
            },
        });
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
            <h1 className="text-2xl font-bold mb-4">Convertir CSV a JSON</h1>

            <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="mb-6"
            />

            {error && (
                <p className="text-red-500 font-semibold mb-4">{error}</p>
            )}

            {jsonData.length > 0 && (
                <div className="w-full max-w-3xl">
                    <h2 className="text-lg font-semibold mb-2">JSON generado:</h2>
                    <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap">
            {JSON.stringify(jsonData, null, 2)}
          </pre>
                </div>
            )}
        </div>
    );
}
