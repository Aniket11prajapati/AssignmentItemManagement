export default function ValidationErrors({ errors }) {
    return (
        Object.keys(errors).length > 0 && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <ul className="list-disc list-inside">
                    {Object.entries(errors).map(([field, messages]) => (
                        <li key={field}>
                            {Array.isArray(messages)
                                ? messages.join(', ')
                                : messages}
                        </li>
                    ))}
                </ul>
            </div>
        )
    );
}