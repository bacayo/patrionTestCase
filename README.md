This is a front end test case provided by Patrion.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

- [Live Demo](https://patrion-weather-app.vercel.app/)

## Description

Objective: Build a local weather application that allows users to check the current weather conditions for a specific location.

Requirements:

- User Input:
  The application provide Türkiye map interface where users can select the location for which they want to check the weather.

- Weather Data:
  The application fetch real-time weather data for the specified location.

- Display:
  Display the retrieved weather information, including temperature, humidity, wind speed, and a brief description of the weather conditions.

- Error Handling:
  Handle errors gracefully. For example, if the location is not found, display an appropriate error message.

### List of major dependencies used in the project:

- [shadcn](https://ui.shadcn.com/)
- [react query](https://tanstack.com/query/latest/)
- axios
- class-variance-authority
- clsx
