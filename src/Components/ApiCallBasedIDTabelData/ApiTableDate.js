import { useEffect, useState } from "react";

function ApiTableDate() {
    const [items, setItems] = useState([]);
    const [details, setDetails] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(response => response.json())
            .then(json => setItems(json))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (items.length > 0) {
            const fetchDetails = async () => {
                const detailPromises = items.map(item =>
                    fetch(`https://jsonplaceholder.typicode.com/users/${item.userId}`)
                        .then(response => response.json())
                );
                const detailsData = await Promise.all(detailPromises);
                setDetails(detailsData);
            };
            fetchDetails();
        }
    }, [items]);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Body</th>
                            <th>User Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={item.id}>
                                <td>{item.title}</td>
                                <td>{item.body}</td>
                                <td>{details[index]?.name}</td>
                                <td>{details[index]?.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ApiTableDate;