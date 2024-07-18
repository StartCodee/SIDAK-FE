'use client';

import * as React from 'react';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';

import { cn } from '@/lib/utils';

const HoverCard = HoverCardPrimitive.Root;

const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardContent = React.forwardRef<
	React.ElementRef<typeof HoverCardPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = 'center', sideOffset = 10, ...props }, ref) =>{
  console.log('HoverCardContent is rendering'); // Log to check rendering

  return (
    <HoverCardPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'z-9999 w-64 rounded-md border bg-white p-4 text-black shadow-md outline-none transition-all duration-150',
        className
      )}
      {...props}
    >
      {props.children}
      <div
        className="absolute bg-white shadow-md w-4 h-4 transform rotate-45 z-40"
        style={{
          bottom: '-0.5rem',
          left: '50%',
          transform: 'translateX(-50%) rotate(45deg)',
        }}
      />
    </HoverCardPrimitive.Content>
  );
});
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardTrigger, HoverCardContent };
