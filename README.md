# Quantum University Management System (QUMS)

QUMS is a secure and user-friendly ERP system designed exclusively for Quantum University students. This project serves as the frontend interface, ensuring seamless access to university services via a proxy connection to the official backend servers.

## Features

- Secure Proxy Connection – Ensures safe communication with Quantum University's official servers.
- User-Friendly Interface – Intuitive and easy-to-navigate UI.
- Comprehensive Student Dashboard – Access academic records, schedules, and more.
- Mobile Responsive Design – Fully optimized for all devices.
- Regular Updates & Maintenance – Continuous improvements and security patches.

## Installation

To set up and run the project locally, follow these steps:

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/qums.git
cd qums
```

### 2. Install Dependencies

#### Proxy Server
```bash
cd proxy
npm install
```

#### Frontend Application
```bash
cd ../frontend
npm install
```

## Usage

Before running the application, ensure you have set up the required environment variables in both the **proxy** and **frontend** directories.

### Start the Development Server

#### Start the Proxy Server
```bash
cd proxy
npm run dev
```

#### Start the Frontend Application
```bash
cd frontend
npm run dev
```

Once both servers are running, access the application at:
`http://127.0.0.1:5173`

## Contributing

We welcome contributions to improve QUMS. To contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`
3. Commit your changes: `git commit -m "Add new feature"`
4. Push to the branch: `git push origin feature-branch`
5. Open a pull request.

## License

This project is licensed under the **MIT License**.

## Contact

For inquiries, support, or collaboration, reach out at: **hi@kaushiksarkar.me**

---

Made by [Your Name]

