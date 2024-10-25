
# Instructions to Run the Application Locally

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/LucasGiani/frontend-patient-data-managment-challenge.git
   cd /frontend-patient-data-managment-challenge
   ```

2. **Install Dependencies:**
   Make sure you have [Node.js](https://nodejs.org/) installed. Then, install the required packages using npm or yarn:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the Application:**
   Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Access the Application:**
   Open your browser and go to `http://localhost:5173` (or the port specified in the terminal).

# Documentation of Design Decisions and Libraries/Tools Used

## Design Decisions:
- **Component Structure:**
  The application is organized into components, each responsible for a specific part of the UI. The main components include `PatientList`, `PatientCard`, `ManagePatientModal`, and `PatientForm`. This separation allows for better maintainability and scalability of the application. I could have created reusable components for the inputs in the PatientForm, passing the necessary props such as label, name, field type, and error message to display. However, since there were only a few fields, I opted to implement them directly in the form, even though it resulted in repeating some style code.

- **State Management:**
  Local state management is handled using React's `useState` and `useEffect` hooks. The patients' data is fetched from an external API and stored in the state. The decision to use local state rather than an external library (like Zustand) was made to keep the application lightweight and simple. If there had been many components or different pages where the same state was necessary, I would have opted for Zustand or React's Context API.

- **Form Handling:**
  The `PatientForm` component is designed to handle both adding and editing patient data. It accepts a `patient` prop, which can be `null` for creating a new patient or contain data for editing an existing one. Form validation is implemented using react-hook-form to ensure the accuracy of the input data and manage form submission.

- **Color Selection:**
  The chosen color palette of blue and green is associated with health and safety, which aligns with the application's purpose of managing patient data. These colors enhance user experience (UX) and user interface (UI) by providing a calming and trustworthy visual environment.

## Libraries/Tools Used:
- **React:** The main library for building the user interface.
- **TypeScript:** Used for type safety and to improve code quality.
- **Tailwind CSS:** A utility-first CSS framework used for styling the application. It allows for rapid UI development with responsive design.
- **Vite:** A fast development environment that provides a modern tooling experience for React applications.
- **React Hook Form:** A library for managing form state and validation, providing an efficient way to handle form submissions and user input validation.
- **ESLint:** A static code analysis tool used to identify problematic patterns in JavaScript and TypeScript code. It helps ensure code quality and consistency across the project.
- **Prettier:** An opinionated code formatter that enforces a consistent style in the codebase, making it easier to read and maintain.
- **Heroicons:** A set of free, MIT-licensed high-quality SVG icons for you to use in your web projects. These icons enhance the visual appeal and usability of the application.
