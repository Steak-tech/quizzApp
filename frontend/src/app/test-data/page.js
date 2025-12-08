'use client';

import { useState, useEffect } from 'react';

export default function TestDataPage() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [themes, setThemes] = useState([]);
    const [selectedTheme, setSelectedTheme] = useState('general'); // thème par défaut
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCSV = async () => {
            try {
                const response = await fetch('/mes_notes.csv');
                const text = await response.text();
                const rows = text.split('\n').filter(row => row.trim());
                
                // ⬅️ SWITCH VIRGULE → POINT-VIRGULE
                const headers = rows[0].split(';');

                const parsedData = rows.slice(1).map(row => {
                    const values = row.split(';');
                    return headers.reduce((obj, header, idx) => {
                        obj[header.trim()] = values[idx]?.trim();
                        return obj;
                    }, {});
                });

                setData(parsedData);

                // 🧠 extraction de tous les thèmes individuels
                const allThemes = parsedData.flatMap(q =>
                    q.theme.split(',').map(t => t.trim().toLowerCase())
                );

                const uniqueThemes = [...new Set(allThemes)].sort();
                setThemes(uniqueThemes);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCSV();
    }, []);

    // 🎯 Filtrage sur thème présent dans la liste
    useEffect(() => {
        const filtered = data.filter(q =>
            q.theme
                .toLowerCase()
                .split(',')
                .map(t => t.trim())
                .includes(selectedTheme.toLowerCase())
        );

        setFilteredData(filtered);
    }, [data, selectedTheme]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Mes Questions</h1>

            {/* ⬇️ Sélecteur de thème */}
            <select
                className="border border-gray-400 p-2 mb-4"
                value={selectedTheme}
                onChange={e => setSelectedTheme(e.target.value)}
            >
                {themes.map((theme, idx) => (
                    <option key={idx} value={theme}>
                        {theme}
                    </option>
                ))}
            </select>

            <table className="border-collapse border border-gray-400 w-full">
                <tbody>
                    {filteredData.map((row, idx) => (
                        <tr key={idx} className="border border-gray-400">
                            {Object.values(row).map((val, i) => (
                                <td key={i} className="border border-gray-400 p-2">{val}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
