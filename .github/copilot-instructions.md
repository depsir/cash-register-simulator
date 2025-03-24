# Copilot Instructions for Cash Register Simulator

## Coding Conventions
1. **Code Style**: Follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) for consistent code formatting.
2. **TypeScript**: Use TypeScript for all files. Ensure proper type annotations and avoid using `any` unless absolutely necessary.
3. **Functional Components**: Use React functional components with hooks instead of class components.
4. **File Structure**: 
   - Place components in `app/components/`.
   - Stories should be in `stories/` with the `.stories.tsx` extension.
5. **Comments**: Use comments sparingly and only when the code is not self-explanatory.

## Technologies
1. **React**: Use React for UI components.
2. **Storybook**: Use Storybook for component documentation and testing.
3. **ESLint & Prettier**: Ensure code passes linting and is formatted using Prettier.
4. **Testing**: Write unit tests using Jest and React Testing Library.

## Best Practices
1. **Reusability**: Write reusable and modular components.
2. **Accessibility**: Follow [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/) guidelines to ensure accessibility.
3. **Error Handling**: Handle errors gracefully in all components.
4. **Performance**: Optimize rendering and avoid unnecessary re-renders.
5. **State Management**: Use React's `useState` and `useReducer` for local state. For global state, consider `Context API` or `Redux` if necessary.

## Specific Guidelines for Copilot
1. **Prop Types**: Always define prop types explicitly in components.
2. **Event Handlers**: Use descriptive names for event handlers (e.g., `onDigitPress` instead of `onDigit`).
3. **Storybook Stories**: Provide meaningful examples in Storybook stories to demonstrate component usage.
4. **Logging**: Use `console.log` only for debugging. Replace with proper logging mechanisms in production.
5. **Imports**: Use absolute imports for files within the project (e.g., `import Component from 'app/components/Component';`).

## Example Component Template
```tsx
import React from 'react';

interface ComponentProps {
    // Define props here
}

const Component: React.FC<ComponentProps> = ({ /* destructure props */ }) => {
    // Component logic here

    return (
        <div>
            {/* JSX here */}
        </div>
    );
};

export default Component;
```

## Example Storybook Story Template
```tsx
import type { Meta, StoryObj } from '@storybook/react';
import Component from '../app/components/Component';

const meta = {
    title: 'Components/Component',
    component: Component,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        // Define default props here
    },
};
```

By following these instructions, Copilot can generate code that aligns with the project's conventions and best practices.
