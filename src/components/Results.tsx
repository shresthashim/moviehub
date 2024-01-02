import React from 'react';

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
                <div key={result.id}>
                    {result.original_title}
                </div>
            ))}
        </div>
    );
};

export default Results;
