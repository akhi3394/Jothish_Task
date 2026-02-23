import axios from 'axios';

const API_URL = 'https://backend.jotish.in/backend_dev/gettabledata.php';

// Mock data as fallback for CORS or development
const mockData = [
    { id: "1", name: "John Doe", designation: "Lead Engineer", salary: "$120,000", city: "New York" },
    { id: "2", name: "Jane Smith", designation: "UI Designer", salary: "$110,000", city: "Los Angeles" },
    { id: "3", name: "Robert Brown", designation: "Backend Developer", salary: "$105,000", city: "Chicago" },
    { id: "4", name: "Emily White", designation: "Project Manager", salary: "$115,000", city: "Houston" },
    { id: "5", name: "Michael Gray", designation: "QA Analyst", salary: "$95,000", city: "Phoenix" },
    { id: "6", name: "Sarah Connor", designation: "Security Specialist", salary: "$130,000", city: "Philadelphia" },
    { id: "7", name: "David Miller", designation: "DevOps Engineer", salary: "$125,000", city: "San Antonio" },
    { id: "8", name: "Linda Blair", designation: "Data Scientist", salary: "$140,000", city: "San Diego" },
    { id: "9", name: "Kevin Hart", designation: "Mobile Developer", salary: "$100,000", city: "Dallas" },
    { id: "10", name: "Nancy Drew", designation: "Solution Architect", salary: "$150,000", city: "San Jose" },
    { id: "11", name: "Alice Wonderland", designation: "UX Researcher", salary: "$98,000", city: "San Francisco" },
    { id: "12", name: "Bob Builder", designation: "Cloud Engineer", salary: "$122,000", city: "Seattle" },
];

export const getEmployeeData = async () => {
    try {
        const response = await axios.post(API_URL, {
            username: 'test',
            password: '123456'
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 5000
        });

        // The API returns { TABLE_DATA: { data: [[...], [...]] } }
        // We map this to a more usable object structure
        const rawData = response.data?.TABLE_DATA?.data || [];

        return rawData.map((row, index) => ({
            id: (index + 1).toString(),
            name: row[0],
            designation: row[1],
            city: row[2],
            ext: row[3],
            date: row[4],
            salary: row[5]
        }));
    } catch (error) {
        console.warn('API Fetch failed or CORS error. Using mock data fallback.', error.message);
        return mockData;
    }
};
