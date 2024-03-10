import type { Meta, StoryObj } from '@storybook/react';
import Quizzer from '../src/components/Quizzer';

const meta = {
    title: 'Quizzer',
    component: Quizzer,
    parameters: {
        layout: 'centered'
    }
} satisfies Meta<typeof Quizzer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
}