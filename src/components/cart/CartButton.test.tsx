import { render, screen, fireEvent } from '@testing-library/react';
import CartButton from './CartButton';
import { useShopify } from '@/lib/context/ShopifyContext';

// Mock the useShopify hook
jest.mock('@/lib/context/ShopifyContext');

describe('CartButton', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('renders without items', () => {
    (useShopify as jest.Mock).mockReturnValue({
      cart: { lines: { edges: [] } },
    });

    render(<CartButton />);
    
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.queryByText('1')).not.toBeInTheDocument();
  });

  it('displays correct item count', () => {
    (useShopify as jest.Mock).mockReturnValue({
      cart: {
        lines: {
          edges: [
            { node: { id: '1' } },
            { node: { id: '2' } },
          ],
        },
      },
    });

    render(<CartButton />);
    
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('opens cart drawer on click', () => {
    (useShopify as jest.Mock).mockReturnValue({
      cart: { lines: { edges: [] } },
    });

    render(<CartButton />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
