import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Camera, Upload, Image as ImageIcon, Heart } from 'lucide-react';
import { FeatureCard } from './FeatureCard';

describe('FeatureCard', () => {
  it('renders title and description', () => {
    render(
      <FeatureCard
        icon={Camera}
        title="Photo Upload"
        description="Upload your photos easily"
        iconColor="text-blue-600"
      />
    );

    expect(screen.getByText('Photo Upload')).toBeInTheDocument();
    expect(screen.getByText('Upload your photos easily')).toBeInTheDocument();
  });

  it('renders with different icon', () => {
    const { container } = render(
      <FeatureCard
        icon={Upload}
        title="Quick Upload"
        description="Fast photo uploads"
        iconColor="text-green-600"
      />
    );

    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(screen.getByText('Quick Upload')).toBeInTheDocument();
  });

  it('applies blue icon color class', () => {
    const { container } = render(
      <FeatureCard
        icon={Camera}
        title="Test"
        description="Test description"
        iconColor="text-blue-600"
      />
    );

    const icon = container.querySelector('svg');
    expect(icon).toHaveClass('icon-blue');
  });

  it('applies green icon color class', () => {
    const { container } = render(
      <FeatureCard
        icon={ImageIcon}
        title="Test"
        description="Test description"
        iconColor="text-green-600"
      />
    );

    const icon = container.querySelector('svg');
    expect(icon).toHaveClass('icon-green');
  });

  it('applies purple icon color class', () => {
    const { container } = render(
      <FeatureCard
        icon={Heart}
        title="Test"
        description="Test description"
        iconColor="text-purple-600"
      />
    );

    const icon = container.querySelector('svg');
    expect(icon).toHaveClass('icon-purple');
  });

  it('applies orange icon color class', () => {
    const { container } = render(
      <FeatureCard
        icon={Upload}
        title="Test"
        description="Test description"
        iconColor="text-orange-600"
      />
    );

    const icon = container.querySelector('svg');
    expect(icon).toHaveClass('icon-orange');
  });

  it('applies red icon color class', () => {
    const { container } = render(
      <FeatureCard
        icon={Camera}
        title="Test"
        description="Test description"
        iconColor="text-red-600"
      />
    );

    const icon = container.querySelector('svg');
    expect(icon).toHaveClass('icon-red');
  });

  it('uses custom icon color when not matching predefined colors', () => {
    const { container } = render(
      <FeatureCard
        icon={Camera}
        title="Test"
        description="Test description"
        iconColor="text-yellow-500"
      />
    );

    const icon = container.querySelector('svg');
    expect(icon).toHaveClass('text-yellow-500');
  });

  it('renders with card-feature class', () => {
    const { container } = render(
      <FeatureCard
        icon={Camera}
        title="Test Card"
        description="Testing card style"
        iconColor="text-blue-600"
      />
    );

    const card = container.firstChild;
    expect(card).toHaveClass('card-feature');
  });

  it('applies correct heading styles', () => {
    render(
      <FeatureCard
        icon={Camera}
        title="Styled Heading"
        description="Description text"
        iconColor="text-blue-600"
      />
    );

    const heading = screen.getByText('Styled Heading');
    expect(heading.tagName).toBe('H3');
    expect(heading).toHaveClass('text-xl', 'font-semibold', 'mb-2');
  });

  it('applies correct description styles', () => {
    render(
      <FeatureCard
        icon={Camera}
        title="Title"
        description="Styled Description"
        iconColor="text-blue-600"
      />
    );

    const description = screen.getByText('Styled Description');
    expect(description.tagName).toBe('P');
    expect(description).toHaveClass('text-slate-600', 'dark:text-slate-300');
  });

  it('handles multiline descriptions', () => {
    const longDescription = 'This is a very long description that spans multiple lines and should be rendered correctly within the card component';

    render(
      <FeatureCard
        icon={Camera}
        title="Test"
        description={longDescription}
        iconColor="text-blue-600"
      />
    );

    expect(screen.getByText(longDescription)).toBeInTheDocument();
  });
});
