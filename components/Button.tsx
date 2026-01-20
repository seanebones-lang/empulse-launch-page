import Link from 'next/link';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { trackButtonClick } from '@/lib/analytics';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  shape?: 'rounded' | 'pill' | 'square';
  href?: string;
  download?: string;
  className?: string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  shape = 'rounded',
  href,
  download,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-primary focus:ring-offset-bg-primary';

  const shapeStyles = {
    rounded: 'rounded-lg',
    pill: 'rounded-full',
    square: 'rounded-none',
  };

  const variantStyles = {
    primary: 'border-2 border-accent-secondary text-accent-secondary hover:text-accent-secondary/90 glow-outline-red',
    secondary: 'border-2 border-accent-primary text-accent-primary hover:text-accent-hover glow-outline-orange',
    outline: 'border-2 border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-white hover:shadow-md',
    ghost: 'text-accent-primary hover:bg-accent-primary/10 hover:text-accent-hover',
    gradient: 'bg-gradient-to-r from-accent-primary to-accent-secondary text-white hover:from-accent-hover hover:to-accent-secondary/90 shadow-lg hover:shadow-xl',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const classes = `${baseStyles} ${shapeStyles[shape]} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    // Use regular anchor tag for downloads
    if (download) {
      return (
        <a href={href} download={download} className={classes}>
          {children}
        </a>
      );
    }
    // Use regular anchor tag for hash links (same-page navigation)
    if (href.startsWith('#')) {
      return (
        <a 
          href={href} 
          className={classes}
          onClick={() => trackButtonClick(String(children), 'button-hash')}
        >
          {children}
        </a>
      );
    }
    // Use regular anchor tag for external URLs
    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return (
        <a 
          href={href} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={classes}
          onClick={() => trackButtonClick(String(children), 'button-external')}
        >
          {children}
        </a>
      );
    }
    // Use Next.js Link for internal navigation
    return (
      <Link 
        href={href} 
        className={classes}
        onClick={() => trackButtonClick(String(children), 'button-internal')}
      >
        {children}
      </Link>
    );
  }

  return (
    <button 
      className={classes} 
      {...props}
      onClick={(e) => {
        trackButtonClick(String(children), 'button-action');
        props.onClick?.(e);
      }}
    >
      {children}
    </button>
  );
}
