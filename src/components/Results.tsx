import React from 'react';
import Card from "@/components/Card";

interface Result {
    id: number;
    original_title: string;
}

interface ResultsProps {
    results: Result[];
}

const Results: React.FC<ResultsProps> = ({results}) => {
    return (
        <div>
            {results.map((result: Result) => (
                <Card key={result.id} result={result}/>
                    ))}
                </div>
            );
            };

            export default Results;
